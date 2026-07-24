import React, { useState } from 'react';
import { ShoppingCart, Sun } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenImageModal?: () => void;
  logoUrl: string;
  onNavClick: (sectionId: string) => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  onAnnounce: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  logoUrl,
  onNavClick,
  isHighContrast,
  onToggleHighContrast,
  onAnnounce,
}) => {
  const [activeTab, setActiveTab] = useState<'shop' | 'customize' | 'about'>('shop');

  const handleTabClick = (tab: 'shop' | 'customize' | 'about', sectionId: string) => {
    setActiveTab(tab);
    onNavClick(sectionId);
    onAnnounce(`Navegando para ${tab}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      {/* Top Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 text-stone-300 font-medium">
          <span>Adesivos Táteis para Acessibilidade</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleHighContrast}
            className="hover:text-yellow-400 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            aria-label="Alternar modo de alto contraste"
          >
            <Sun className="w-3.5 h-3.5 text-yellow-400" />
            {isHighContrast ? 'Contraste Normal' : 'Alto Contraste'}
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo Matching Attached Image */}
        <div 
          onClick={() => handleTabClick('shop', 'hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo Adesivos Táteis"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex items-center gap-2.5">
              {/* Logo Badge matching uploaded logo image */}
              <div className="w-10 h-10 rounded-xl bg-[#eef3f6] border border-[#d8e4ec] p-1.5 flex flex-col justify-between items-center shadow-xs">
                <div className="flex items-center justify-between w-full px-0.5">
                  {/* Star outline icon */}
                  <svg className="w-3 h-3 text-[#0092b3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {/* Teal square */}
                  <div className="w-2.5 h-2.5 rounded-xs bg-[#0092b3]" />
                </div>
                {/* Hand touching icon */}
                <svg className="w-5 h-5 text-[#0070b8]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 11.24V7.5a1.5 1.5 0 0 1 3 0v3.74a3 3 0 0 1 2.92 2.3 3 3 0 0 1 2.92 2.3 3 3 0 0 1 2.16 3.16c0 3.31-2.69 6-6 6H12c-4.42 0-8-3.58-8-8v-3a1.5 1.5 0 0 1 3 0v3.24" />
                </svg>
              </div>
              <span className="font-extrabold text-[#1a3f54] text-lg tracking-wider uppercase">
                ADESIVOS TÁTEIS
              </span>
            </div>
          )}
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <button
            onClick={() => handleTabClick('shop', 'hero')}
            className={`transition-colors py-1 border-b-2 cursor-pointer ${
              activeTab === 'shop'
                ? 'border-[#0070b8] text-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => handleTabClick('customize', 'customizer')}
            className={`transition-colors py-1 border-b-2 cursor-pointer ${
              activeTab === 'customize'
                ? 'border-[#0070b8] text-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Personalizar
          </button>
          <button
            onClick={() => handleTabClick('about', 'sobre')}
            className={`transition-colors py-1 border-b-2 cursor-pointer ${
              activeTab === 'about'
                ? 'border-[#0070b8] text-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Sobre
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-stone-800 hover:text-[#0070b8] hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            aria-label={`Carrinho de compras com ${cartCount} itens`}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#b86b77] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
