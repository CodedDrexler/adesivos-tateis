import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Copy,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Lock,
} from 'lucide-react';
import { CartItem, CustomerInfo, PaymentState } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
  onAnnounce: (text: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart,
  onAnnounce,
}) => {
  const [step, setStep] = useState<'customer' | 'payment' | 'confirmation'>('customer');
  const [paymentMethod, setPaymentMethod] = useState<'checkout_pro' | 'pix'>('checkout_pro');
  const [copiedPix, setCopiedPix] = useState(false);

  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [paymentState, setPaymentState] = useState<PaymentState>({
    isProcessing: false,
    status: 'idle',
  });

  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.email || !customer.cpf) {
      alert('Por favor, preencha Nome, E-mail e CPF para prosseguir com o pedido.');
      return;
    }
    setStep('payment');
    onAnnounce('Avançou para a etapa de pagamento.');
  };

  const handleProcessPayment = async () => {
    setPaymentState({ isProcessing: true, status: 'idle' });

    try {
      if (paymentMethod === 'checkout_pro') {
        const response = await fetch('/api/mercadopago/preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((i) => ({
              id: i.id,
              title: i.title,
              description: i.description,
              quantity: i.quantity,
              unit_price: i.unitPrice,
              picture_url: i.image,
            })),
            payer: {
              name: customer.name,
              email: customer.email,
              cpf: customer.cpf,
            },
            externalReference: `PED-${Date.now()}`,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setPaymentState({
            isProcessing: false,
            preferenceId: data.preference_id,
            initPoint: data.init_point,
            pixCode: data.pixCode,
            isLive: data.isLive,
            status: 'created',
          });

          if (data.init_point && data.isLive) {
            window.open(data.init_point, '_blank');
          }
          setStep('confirmation');
          onClearCart();
          onAnnounce('Pedido gerado com sucesso!');
        } else {
          throw new Error(data.error || 'Falha ao processar pagamento');
        }
      } else {
        // Método PIX direto
        const response = await fetch('/api/mercadopago/pix', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalAmount,
            description: `Adesivos Táteis - Pedido de ${customer.name}`,
            payer: {
              name: customer.name,
              email: customer.email,
              cpf: customer.cpf,
            },
          }),
        });

        const data = await response.json();

        if (data.success) {
          setPaymentState({
            isProcessing: false,
            pixCode: data.qrCode,
            isLive: data.isLive,
            status: 'created',
          });
          setStep('confirmation');
          onClearCart();
          onAnnounce('Código PIX gerado com sucesso!');
        } else {
          throw new Error(data.error || 'Erro ao gerar código PIX');
        }
      }
    } catch (err: any) {
      setPaymentState({
        isProcessing: false,
        status: 'idle',
        errorMessage: err.message || 'Ocorreu um erro ao processar o pagamento.',
      });
    }
  };

  const handleCopyPix = () => {
    if (paymentState.pixCode) {
      navigator.clipboard.writeText(paymentState.pixCode);
      setCopiedPix(true);
      onAnnounce('Código PIX copiado para a área de transferência.');
      setTimeout(() => setCopiedPix(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden relative my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Checkout Seguro</h2>
              <p className="text-xs text-stone-400">
                Adesivos Táteis • Acessibilidade e Autonomia
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security banner */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-emerald-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            <strong>Ambiente Seguro:</strong> Transação protegida por criptografia ponta a ponta.
          </span>
        </div>

        {/* Body content based on step */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Step 1: Customer Info */}
          {step === 'customer' && (
            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider border-b border-stone-200 pb-2">
                1. Dados de Contato e Entrega
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Ex: Maria Silva"
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-rose-700 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    placeholder="maria@exemplo.com.br"
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-rose-700 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    CPF *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.cpf}
                    onChange={(e) => setCustomer({ ...customer, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-rose-700 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-rose-700 bg-stone-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="sm:col-col-span-1">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    CEP
                  </label>
                  <input
                    type="text"
                    value={customer.zipCode}
                    onChange={(e) => setCustomer({ ...customer, zipCode: e.target.value })}
                    placeholder="00000-000"
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-rose-700 bg-stone-50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Endereço Completo
                  </label>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="Rua, Número, Bairro, Cidade - UF"
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-rose-700 bg-stone-50"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center text-xs">
                <div>
                  <span className="text-stone-500 font-medium">Itens no Pedido:</span>{' '}
                  <span className="font-bold text-stone-900">{items.length} pacote(s)</span>
                </div>
                <div className="text-base font-bold text-stone-900">
                  Total: R$ {totalAmount.toFixed(2).replace('.', ',')}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#b86b77] hover:bg-[#a25965] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Ir para Forma de Pagamento →
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment Selection */}
          {step === 'payment' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider border-b border-stone-200 pb-2">
                2. Escolha a Forma de Pagamento
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Credit Card / Boleto Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('checkout_pro')}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    paymentMethod === 'checkout_pro'
                      ? 'border-sky-600 bg-sky-50/50 ring-2 ring-sky-600/20'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-sky-600" />
                    <span className="font-bold text-sm text-stone-900">
                      Cartão de Crédito ou Boleto
                    </span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Pague em até 12x no cartão de crédito, saldo ou boleto bancário com total segurança.
                  </p>
                </button>

                {/* Direct PIX Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <QrCode className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-sm text-stone-900">
                      PIX Instantâneo
                    </span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Geração imediata de QR Code e código Copia e Cola para pagamento rápido.
                  </p>
                </button>
              </div>

              {paymentState.errorMessage && (
                <div className="p-3 bg-rose-50 text-rose-800 rounded-lg text-xs font-medium border border-rose-200">
                  {paymentState.errorMessage}
                </div>
              )}

              {/* Total & Action */}
              <div className="p-4 bg-stone-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block">Total a Pagar</span>
                  <span className="text-xl font-bold">
                    R$ {totalAmount.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStep('customer')}
                    className="px-3 py-2 text-xs text-stone-300 hover:text-white cursor-pointer"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleProcessPayment}
                    disabled={paymentState.isProcessing}
                    className="px-6 py-3 bg-[#b86b77] hover:bg-[#a25965] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow"
                  >
                    {paymentState.isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processando...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Concluir Pagamento</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation & Payment Payload */}
          {step === 'confirmation' && (
            <div className="text-center py-4 space-y-6">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  Pedido Registrado com Sucesso!
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Enviamos os detalhes do seu pedido de adesivos táteis para <strong>{customer.email}</strong>.
                </p>
              </div>

              {/* Payment Link */}
              {paymentState.initPoint && (
                <div className="p-5 bg-sky-50 border border-sky-200 rounded-xl space-y-3">
                  <h4 className="font-bold text-sky-900 text-sm">
                    Link do Pagamento
                  </h4>
                  <p className="text-xs text-sky-800">
                    Clique no botão abaixo para concluir com Cartão de Crédito ou Saldo no ambiente seguro de pagamento:
                  </p>
                  <a
                    href={paymentState.initPoint}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-lg transition-colors shadow-md cursor-pointer"
                  >
                    <span>Ir para Pagamento Seguro</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* PIX Code display */}
              {paymentState.pixCode && (
                <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-emerald-600" />
                      Código PIX Copia e Cola
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      Aprovação Imediata
                    </span>
                  </div>

                  <div className="p-3 bg-white border border-stone-300 rounded-lg font-mono text-[11px] text-stone-700 break-all select-all">
                    {paymentState.pixCode}
                  </div>

                  <button
                    onClick={handleCopyPix}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedPix ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Código PIX Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar Código PIX</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 cursor-pointer"
                >
                  Concluir e Voltar à Loja
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
