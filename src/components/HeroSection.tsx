import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  heroImageUrl: string;
  onStartCustomizing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroImageUrl, onStartCustomizing }) => {
  return (
    <section id="hero" className="py-12 md:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Product Showcase Image (3D Tactile Stickers in Purple, Teal, and Red) */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative rounded-2xl overflow-hidden shadow-sm bg-white border border-stone-200">
            {heroImageUrl ? (
              <img
                src={heroImageUrl}
                alt="Adesivos táteis em relevo"
                className="w-full h-[380px] sm:h-[460px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
            ) : (
              /* Exact 3D rendering representation of attached Product Image: 3 star cutout tactile tiles */
              <div className="w-full h-[380px] sm:h-[460px] bg-stone-50 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="relative w-full max-w-md h-72 flex items-center justify-center">
                  
                  {/* Tile 1: Lilac / Light Purple (Left) */}
                  <div className="absolute left-4 top-8 w-52 h-36 bg-[#c5b8e0] rounded-2xl border-2 border-[#b0a0d4] shadow-xl transform -rotate-12 flex flex-col justify-between p-4 z-10 transition-transform hover:scale-105">
                    <div className="flex justify-end space-x-1.5 pt-1 pr-1">
                      {/* 4 Raised Braille Dots */}
                      <div className="w-3 h-3 rounded-full bg-[#a291ca] shadow-xs border border-[#8e7bb9]" />
                      <div className="w-3 h-3 rounded-full bg-[#a291ca] shadow-xs border border-[#8e7bb9]" />
                      <div className="w-3 h-3 rounded-full bg-[#a291ca] shadow-xs border border-[#8e7bb9]" />
                      <div className="w-3 h-3 rounded-full bg-[#a291ca] shadow-xs border border-[#8e7bb9]" />
                    </div>
                    {/* Star Cutout */}
                    <div className="my-auto mx-auto text-[#e2daef]">
                      <svg className="w-16 h-16 fill-current drop-shadow-inner" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                  </div>

                  {/* Tile 2: Teal / Cyan Blue (Middle) */}
                  <div className="absolute left-24 top-12 w-52 h-36 bg-[#68abb8] rounded-2xl border-2 border-[#5297a5] shadow-2xl transform -rotate-6 flex flex-col justify-between p-4 z-20 transition-transform hover:scale-105">
                    <div className="flex justify-end space-x-1.5 pt-1 pr-1">
                      {/* 4 Raised Braille Dots */}
                      <div className="w-3 h-3 rounded-full bg-[#468694] shadow-xs border border-[#377380]" />
                      <div className="w-3 h-3 rounded-full bg-[#468694] shadow-xs border border-[#377380]" />
                      <div className="w-3 h-3 rounded-full bg-[#468694] shadow-xs border border-[#377380]" />
                      <div className="w-3 h-3 rounded-full bg-[#468694] shadow-xs border border-[#377380]" />
                    </div>
                    {/* Star Cutout */}
                    <div className="my-auto mx-auto text-[#b2d9e0]">
                      <svg className="w-16 h-16 fill-current drop-shadow-inner" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                  </div>

                  {/* Tile 3: Red / Dusty Mauve (Right) */}
                  <div className="absolute left-44 top-16 w-52 h-36 bg-[#d65252] rounded-2xl border-2 border-[#c23e3e] shadow-2xl transform rotate-3 flex flex-col justify-between p-4 z-30 transition-transform hover:scale-105">
                    <div className="flex justify-end space-x-1.5 pt-1 pr-1">
                      {/* 4 Raised Braille Dots */}
                      <div className="w-3 h-3 rounded-full bg-[#a83232] shadow-xs border border-[#8f2323]" />
                      <div className="w-3 h-3 rounded-full bg-[#a83232] shadow-xs border border-[#8f2323]" />
                      <div className="w-3 h-3 rounded-full bg-[#a83232] shadow-xs border border-[#8f2323]" />
                      <div className="w-3 h-3 rounded-full bg-[#a83232] shadow-xs border border-[#8f2323]" />
                    </div>
                    {/* Star Cutout */}
                    <div className="my-auto mx-auto text-[#f2aab2]">
                      <svg className="w-16 h-16 fill-current drop-shadow-inner" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 lg:pl-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Personalize seu Acesso com Adesivos Táteis
          </h1>

          <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            Adesivos táteis para autonomia e identificação. Design funcional para o dia a dia.
          </p>

          <div className="pt-2">
            <button
              onClick={onStartCustomizing}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#b86b77] hover:bg-[#a25965] active:scale-98 text-white font-medium text-base rounded-md transition-all shadow-md cursor-pointer group"
            >
              <span>Começar</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

