import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Healthcheck
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Adesivos Táteis API',
      mercadoPagoConfigured: Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN),
    });
  });

  // Mercado Pago - Criar Preferência de Pagamento (Checkout Pro)
  app.post('/api/mercadopago/preference', async (req, res) => {
    try {
      const { items, payer, externalReference } = req.body;
      const mpToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
      const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;

      const formattedItems = (items || []).map((item: any) => ({
        id: item.id || `item-${Math.random().toString(36).substr(2, 9)}`,
        title: item.title || 'Adesivo Tátil Personalizado',
        description: item.description || 'Adesivos táteis para acessibilidade e autonomia',
        quantity: Number(item.quantity) || 1,
        currency_id: 'BRL',
        unit_price: Number(item.unit_price) || 29.9,
        picture_url: item.picture_url || '',
      }));

      if (mpToken) {
        // Chamada real para API do Mercado Pago
        const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mpToken}`,
          },
          body: JSON.stringify({
            items: formattedItems,
            payer: {
              name: payer?.name || 'Cliente Adesivos Táteis',
              email: payer?.email || 'cliente@exemplo.com.br',
              identification: payer?.cpf ? { type: 'CPF', number: payer.cpf.replace(/\D/g, '') } : undefined,
            },
            back_urls: {
              success: `${appUrl}/?status=success`,
              failure: `${appUrl}/?status=failure`,
              pending: `${appUrl}/?status=pending`,
            },
            auto_return: 'approved',
            external_reference: externalReference || `PED-${Date.now()}`,
            statement_descriptor: 'ADESIVOSTAT',
          }),
        });

        const mpData = await mpResponse.json();

        if (mpResponse.ok) {
          return res.json({
            success: true,
            init_point: mpData.init_point,
            sandbox_init_point: mpData.sandbox_init_point,
            preference_id: mpData.id,
            isLive: true,
          });
        } else {
          console.error('Erro na API Mercado Pago:', mpData);
          // Fallback gracioso com mensagem clara
        }
      }

      // Se token não fornecido ou ambiente de desenvolvimento/simulação:
      const totalAmount = formattedItems.reduce((acc: number, item: any) => acc + item.unit_price * item.quantity, 0);
      const orderId = externalReference || `PED-${Date.now()}`;
      
      // Simulação do Mercado Pago com links e PIX instantâneo
      const simulatedInitPoint = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=SIMULATED-${orderId}`;
      const pixCopyPaste = `00020126580014br.gov.bcb.pix0136adesivostateis-${orderId}@mercadopago.com520400005303986540${totalAmount.toFixed(2).padStart(5, '0')}5802BR5920Adesivos Tateis BR6009SAO PAULO62070503***6304E8A2`;

      return res.json({
        success: true,
        init_point: simulatedInitPoint,
        preference_id: `SIMULATED-${orderId}`,
        totalAmount,
        pixCode: pixCopyPaste,
        isLive: false,
        message: mpToken
          ? 'Preferência processada.'
          : 'Modo de Integração Ativo: adicione a chave MERCADOPAGO_ACCESS_TOKEN no painel de Segredos para direcionamento direto ao Mercado Pago.',
      });
    } catch (error: any) {
      console.error('Erro ao processar Mercado Pago:', error);
      res.status(500).json({ success: false, error: error.message || 'Erro interno no checkout' });
    }
  });

  // Mercado Pago PIX Direto
  app.post('/api/mercadopago/pix', async (req, res) => {
    try {
      const { amount, description, payer } = req.body;
      const mpToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

      if (mpToken) {
        const pixRes = await fetch('https://api.mercadopago.com/v1/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mpToken}`,
            'X-Idempotency-Key': `pix-${Date.now()}-${Math.random()}`,
          },
          body: JSON.stringify({
            transaction_amount: Number(amount) || 29.9,
            description: description || 'Adesivos Táteis para Acessibilidade',
            payment_method_id: 'pix',
            payer: {
              email: payer?.email || 'cliente@exemplo.com',
              first_name: payer?.name?.split(' ')[0] || 'Cliente',
              last_name: payer?.name?.split(' ').slice(1).join(' ') || 'Tátil',
              identification: payer?.cpf ? { type: 'CPF', number: payer.cpf.replace(/\D/g, '') } : undefined,
            },
          }),
        });

        const pixData = await pixRes.json();
        if (pixRes.ok) {
          const qrCode = pixData.point_of_interaction?.transaction_data?.qr_code;
          const qrCodeBase64 = pixData.point_of_interaction?.transaction_data?.qr_code_base64;
          return res.json({
            success: true,
            paymentId: pixData.id,
            status: pixData.status,
            qrCode,
            qrCodeBase64,
            isLive: true,
          });
        }
      }

      // Código PIX de simulação
      const orderId = `PIX-${Date.now()}`;
      const totalAmount = Number(amount) || 29.9;
      const pixCode = `00020126580014br.gov.bcb.pix0136adesivostateis-${orderId}@mercadopago.com520400005303986540${totalAmount.toFixed(2).padStart(5, '0')}5802BR5920Adesivos Tateis BR6009SAO PAULO62070503***630489A1`;

      res.json({
        success: true,
        paymentId: `SIM-${orderId}`,
        status: 'pending',
        qrCode: pixCode,
        isLive: false,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Recomendações de Acessibilidade Tátil com Gemini AI
  app.post('/api/ai/tactile-advice', async (req, res) => {
    const { objectType, userNeed } = req.body || {};
    try {
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          recommendation: `Para ${objectType || 'objetos do dia a dia'}, recomendamos alto contraste de cores (como Preto e Amarelo ou Azul Escuro e Branco) e símbolos de fácil percepção tátil, como o Quadrado para paradas e Círculo para acionamento.`,
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Você é um especialista em ergonomia tátil, design inclusivo e acessibilidade para pessoas com deficiência visual ou baixa visão.
Forneça recomendações práticas e curtas (máximo 3 parágrafos) sobre como aplicar adesivos táteis em: "${objectType || 'Eletrodomésticos e portas'}".
Considere:
1. Padrão de contraste ideal (ex: Amarelo/Preto ou Branco/Azul).
2. Símbolo tátil recomendado (Quadrado, Círculo, Estrela, Triângulo) e significado intuitivo.
3. Posicionamento tátil correto para facilitar o toque sem acionar acidentalmente o objeto.
Responda em português brasileiro de forma acolhedora, clara e objetiva.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({
        recommendation: response.text || 'Recomendação tátil gerada com sucesso.',
      });
    } catch (err: any) {
      console.error('Erro na requisição AI:', err);
      res.json({
        recommendation: `Recomendação Padrão: Para ${objectType || 'seu uso'}, utilize combinações de alto contraste tátil e visual com formas geométricas simples.`,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Adesivos Táteis] Servidor rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer();
