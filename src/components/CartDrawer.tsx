import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
        <div className="pointer-events-auto w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-800" />
              <h2 className="text-lg font-bold text-stone-900">Seu Carrinho</h2>
              <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)} itens
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-stone-800 font-bold text-base">Seu carrinho está vazio</p>
                <p className="text-stone-500 text-xs max-w-xs mx-auto">
                  Adicione kits prontos de adesivos táteis ou personalize seu próprio modelo no personalizador.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Explorar Loja
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex gap-4 items-start relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-white overflow-hidden border border-stone-200 flex-shrink-0 flex items-center justify-center p-1">
                    {item.customConfig ? (
                      <div
                        className="w-full h-full rounded flex flex-col items-center justify-center text-center p-1"
                        style={{ backgroundColor: item.customConfig.contrast.bgHex }}
                      >
                        <span
                          className="font-bold text-xs"
                          style={{ color: item.customConfig.contrast.symbolHex }}
                        >
                          {item.customConfig.shape.symbol}
                        </span>
                        {item.customConfig.labelText && (
                          <span
                            className="text-[9px] font-bold truncate max-w-full"
                            style={{ color: item.customConfig.contrast.textHex }}
                          >
                            {item.customConfig.labelText}
                          </span>
                        )}
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-1">
                    <h3 className="font-bold text-stone-900 text-sm leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-stone-500 text-xs">
                      {item.description}
                    </p>
                    <div className="text-rose-800 font-bold text-sm pt-1">
                      R$ {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center border border-stone-300 rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout CTA */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Frete</span>
                  <span className="text-emerald-700 font-semibold">Calcular no Checkout</span>
                </div>
                <div className="flex justify-between text-stone-900 font-bold text-base pt-2 border-t border-stone-100">
                  <span>Total</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-2.5 rounded-lg bg-stone-100 border border-stone-200 text-[11px] text-stone-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Pagamento 100% Seguro • Pix ou Cartão de Crédito</span>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-[#b86b77] hover:bg-[#a25965] active:scale-98 text-white font-semibold text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Finalizar Compra</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
