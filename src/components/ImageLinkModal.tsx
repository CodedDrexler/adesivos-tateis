import React, { useState } from 'react';
import { X, Image as ImageIcon, Link2, Check, RefreshCw, Upload } from 'lucide-react';

interface ImageLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  logoUrl: string;
  onUpdateLogoUrl: (url: string) => void;
  heroUrl: string;
  onUpdateHeroUrl: (url: string) => void;
  overlayUrl: string;
  onUpdateOverlayUrl: (url: string) => void;
  onAnnounce: (text: string) => void;
}

export const ImageLinkModal: React.FC<ImageLinkModalProps> = ({
  isOpen,
  onClose,
  logoUrl,
  onUpdateLogoUrl,
  heroUrl,
  onUpdateHeroUrl,
  overlayUrl,
  onUpdateOverlayUrl,
  onAnnounce,
}) => {
  const [localLogo, setLocalLogo] = useState(logoUrl);
  const [localHero, setLocalHero] = useState(heroUrl);
  const [localOverlay, setLocalOverlay] = useState(overlayUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateLogoUrl(localLogo);
    onUpdateHeroUrl(localHero);
    onUpdateOverlayUrl(localOverlay);
    setSavedSuccess(true);
    onAnnounce('Links de imagens do HTML atualizados com sucesso!');
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleResetDefaults = () => {
    const defaultHero =
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80';
    setLocalLogo('');
    setLocalHero(defaultHero);
    setLocalOverlay('');
    onUpdateLogoUrl('');
    onUpdateHeroUrl(defaultHero);
    onUpdateOverlayUrl('');
    onAnnounce('Imagens restauradas para o padrão.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 p-6 sm:p-8 relative space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-800">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Gerenciador de Links Diretos de Imagens
              </h3>
              <p className="text-xs text-stone-500">
                Insira URLs diretas para personalizar as imagens do HTML da aplicação
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

        {/* Inputs */}
        <div className="space-y-4">
          {/* Logo URL */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Logo da Marca (URL Direta de Imagem PNG/SVG)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2 className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="url"
                  value={localLogo}
                  onChange={(e) => setLocalLogo(e.target.value)}
                  placeholder="https://exemplo.com/logo-adesivos-tateis.png"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-rose-700 bg-stone-50"
                />
              </div>
            </div>
            <p className="text-[11px] text-stone-600 mt-1">
              Se deixar em branco, o ícone e tipografia oficial do Adesivos Táteis serão exibidos.
            </p>
          </div>

          {/* Hero Banner URL */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Imagem do Banner Principal (Hero Section)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2 className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="url"
                  value={localHero}
                  onChange={(e) => setLocalHero(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-rose-700 bg-stone-50"
                />
              </div>
            </div>
            {localHero && (
              <div className="mt-2 h-20 rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
                <img
                  src={localHero}
                  alt="Preview Hero"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>

          {/* Customizer Overlay URL */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Overlay/Textura para o Personalizador Tátil (Opcional)
            </label>
            <div className="relative flex-1">
              <Link2 className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="url"
                value={localOverlay}
                onChange={(e) => setLocalOverlay(e.target.value)}
                placeholder="https://exemplo.com/textura-relevo.png"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-rose-700 bg-stone-50"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <button
            onClick={handleResetDefaults}
            className="text-xs font-medium text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Restaurar Padrões
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-100 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-[#b86b77] hover:bg-[#a25965] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Salvo!</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Aplicar Imagens no HTML</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
