import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { CONTRAST_OPTIONS, TACTILE_SHAPES } from '../data';
import { ContrastOption, TactileShape, CustomStickerConfig } from '../types';

interface TactileCustomizerProps {
  onAddToCart: (customConfig: CustomStickerConfig) => void;
  onOpenAIAdvice: (objectType: string) => void;
  onAnnounce: (text: string) => void;
  customOverlayUrl?: string;
}

export const TactileCustomizer: React.FC<TactileCustomizerProps> = ({
  onAddToCart,
  onAnnounce,
  customOverlayUrl,
}) => {
  const [selectedContrast, setSelectedContrast] = useState<ContrastOption>(CONTRAST_OPTIONS[0]);
  const [selectedShape, setSelectedShape] = useState<TactileShape>(TACTILE_SHAPES[0]);

  const handleContrastSelect = (opt: ContrastOption) => {
    setSelectedContrast(opt);
    onAnnounce(`Contraste selecionado: ${opt.name}`);
  };

  const handleShapeSelect = (shape: TactileShape) => {
    setSelectedShape(shape);
    onAnnounce(`Forma tátil selecionada: ${shape.name}`);
  };

  const handleAddCustomToCart = () => {
    const config: CustomStickerConfig = {
      contrast: selectedContrast,
      shape: selectedShape,
      labelText: '',
      showBraille: false,
      quantityPack: 4,
      customImageUrl: customOverlayUrl,
      surfaceTexture: 'relievo_sharp',
    };
    onAddToCart(config);
    onAnnounce(`Adesivo tátil ${selectedShape.name} adicionado ao carrinho!`);
  };

  return (
    <section id="customizer" className="py-16 bg-stone-50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Crie o seu
          </h2>
          <p className="mt-3 text-stone-600 text-base">
            Selecione o contraste e a forma que melhor se adapta à sua leitura tátil.
          </p>
        </div>

        {/* Customizer Grid (Matching exact screenshot structure) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Preview Box (Matching reference screenshot) */}
          <div className="lg:col-span-6 bg-[#ebe7e1] p-8 sm:p-12 rounded-2xl border border-stone-200 flex flex-col justify-between min-h-[380px] shadow-sm relative">
            
            {/* Central Sticker Preview Card */}
            <div className="my-auto flex items-center justify-center p-4">
              <div
                className="relative rounded-2xl p-8 transition-all duration-300 shadow-xl flex items-center justify-center w-52 h-52 sm:w-60 sm:h-60 border-2"
                style={{
                  backgroundColor: selectedContrast.bgHex,
                  borderColor: selectedContrast.borderHex,
                }}
              >
                {/* Optional Custom Image Overlay */}
                {customOverlayUrl && (
                  <img
                    src={customOverlayUrl}
                    alt="Custom Overlay"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-xl pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Tactile Shape SVG */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-24 h-24 sm:w-28 sm:h-28 transition-all duration-300"
                  style={{
                    fill: 'none',
                    stroke: selectedContrast.symbolHex,
                    strokeWidth: 2,
                  }}
                >
                  <path d={selectedShape.svgPath} />
                </svg>
              </div>
            </div>

            {/* Bottom Dots (. . .) matching print screenshot */}
            <div className="flex items-center space-x-1.5 pt-4">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-800"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-stone-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-stone-400"></span>
            </div>
          </div>

          {/* Right Controls (Exact options from screenshot) */}
          <div className="lg:col-span-6 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
            
            {/* 1. CONTRASTE */}
            <div>
              <h3 className="text-xs font-bold tracking-wider text-stone-900 uppercase mb-3">
                1. CONTRASTE
              </h3>

              {/* Contrast Option Swatches (Matches screenshot color pills) */}
              <div className="flex items-center gap-4">
                {CONTRAST_OPTIONS.slice(0, 3).map((opt) => {
                  const isSelected = selectedContrast.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleContrastSelect(opt)}
                      className={`relative w-16 h-12 rounded-xl p-1.5 transition-all cursor-pointer flex items-center justify-between border-2 ${
                        isSelected
                          ? 'ring-2 ring-stone-900 ring-offset-2 border-stone-900 scale-105 shadow-md'
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                      style={{ backgroundColor: opt.bgHex }}
                      aria-label={`Contraste ${opt.name}`}
                    >
                      <span
                        className="w-4 h-full rounded-md"
                        style={{ backgroundColor: opt.bgHex }}
                      />
                      <span
                        className="w-4 h-full rounded-md shadow-inner"
                        style={{ backgroundColor: opt.symbolHex }}
                      />
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 bg-stone-900 text-white rounded-full p-0.5 shadow">
                          <Check className="w-3 h-3 text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. FORMA TÁTIL */}
            <div>
              <h3 className="text-xs font-bold tracking-wider text-stone-900 uppercase mb-3">
                2. FORMA TÁTIL
              </h3>

              {/* 4 Square Shape Button Boxes matching screenshot */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {TACTILE_SHAPES.slice(0, 4).map((shape) => {
                  const isSelected = selectedShape.id === shape.id;
                  return (
                    <button
                      key={shape.id}
                      onClick={() => handleShapeSelect(shape)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer h-20 ${
                        isSelected
                          ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 text-stone-900 shadow-sm font-bold'
                          : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600'
                      }`}
                      aria-label={`Forma ${shape.name}`}
                    >
                      <span className="text-2xl leading-none mb-1">
                        {shape.symbol}
                      </span>
                      <span className="text-[11px] font-medium text-stone-700 truncate max-w-full">
                        {shape.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to Cart CTA (Dusty Rose `#b86b77` matching screenshot) */}
            <button
              onClick={handleAddCustomToCart}
              className="w-full py-4 bg-[#b86b77] hover:bg-[#a25965] active:scale-98 text-white font-medium text-base rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Adicionar ao Carrinho</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

