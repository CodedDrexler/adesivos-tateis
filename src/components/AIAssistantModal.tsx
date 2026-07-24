import React, { useState } from 'react';
import { X, Sparkles, Send, Loader2, Lightbulb, CheckCircle2 } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialObjectType?: string;
  onAnnounce: (text: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  initialObjectType,
  onAnnounce,
}) => {
  const [objectType, setObjectType] = useState(initialObjectType || 'Micro-ondas e Fogão');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConsult = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/ai/tactile-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objectType }),
      });
      const data = await res.json();
      setResponse(data.recommendation || 'Recomendação gerada com sucesso.');
      onAnnounce('Recomendação de acessibilidade tátil recebida.');
    } catch (err) {
      setResponse(
        'Para identificação tátil eficiente, recomendamos utilizar o contraste Preto & Amarelo Vivo com relevo acentuado e formas simples (Círculo para ligar, Quadrado para parar).'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 p-6 relative space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 text-rose-800 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Especialista IA em Ergonomia Tátil
              </h3>
              <p className="text-xs text-stone-500">
                Consulte o Gemini para saber qual combinação tátil usar em seus objetos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <form onSubmit={handleConsult} className="space-y-3">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
            Qual objeto você deseja marcar com adesivo tátil?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={objectType}
              onChange={(e) => setObjectType(e.target.value)}
              placeholder="Ex: Elevador, Controle Remoto, Remedios, Fechadura"
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-rose-700 bg-stone-50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2.5 bg-[#b86b77] hover:bg-[#a25965] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Consultar</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick suggestions */}
        <div className="flex flex-wrap gap-1.5 text-[11px] text-stone-600">
          <span className="font-bold text-stone-500">Exemplos:</span>
          {['Micro-ondas', 'Controle Remoto', 'Caixa de Remédios', 'Chave de Casa'].map((item) => (
            <button
              key={item}
              onClick={() => {
                setObjectType(item);
              }}
              className="hover:underline text-rose-800 font-medium cursor-pointer"
            >
              {item} •
            </button>
          ))}
        </div>

        {/* Result Area */}
        {response && (
          <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-2 text-xs text-stone-800 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-rose-900">
              <Lightbulb className="w-4 h-4 text-rose-700" />
              <span>Recomendação Personalizada:</span>
            </div>
            <div className="whitespace-pre-line text-stone-700">{response}</div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
