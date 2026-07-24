import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TactileCustomizer } from './components/TactileCustomizer';
import { AboutSection } from './components/AboutSection';
import { ImageLinkModal } from './components/ImageLinkModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

import { CartItem, CustomStickerConfig } from './types';
import { X } from 'lucide-react';

export default function App() {
  // Image links management (allow custom direct HTML image URLs)
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [heroUrl, setHeroUrl] = useState<string>('');
  const [overlayUrl, setOverlayUrl] = useState<string>('');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Modals state
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [infoModalTitle, setInfoModalTitle] = useState<string | null>(null);

  // Accessibility States
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>('');

  const announce = (text: string) => {
    setAnnouncement(text);
    setTimeout(() => setAnnouncement(''), 3000);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddCustomToCart = (config: CustomStickerConfig) => {
    const customId = `custom-${Date.now()}`;
    const packPrice = 29.90;

    const newItem: CartItem = {
      id: customId,
      title: `Adesivo Tátil Custom - ${config.shape.name}`,
      description: `Contraste: ${config.contrast.name}`,
      unitPrice: packPrice,
      quantity: 1,
      image: '',
      customConfig: config,
    };

    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isHighContrast
          ? 'bg-black text-yellow-300 [&_*]:border-yellow-400'
          : 'bg-white text-stone-900'
      }`}
    >
      {/* ARIA Live Region for Accessibility Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Header Navigation */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenImageModal={() => setIsImageModalOpen(true)}
        logoUrl={logoUrl}
        onNavClick={scrollToSection}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => {
          setIsHighContrast(!isHighContrast);
          announce(isHighContrast ? 'Modo normal ativado' : 'Modo de alto contraste ativado');
        }}
        onAnnounce={announce}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          heroImageUrl={heroUrl}
          onStartCustomizing={() => scrollToSection('customizer')}
        />

        {/* Customizer Section ("Crie o seu") */}
        <TactileCustomizer
          onAddToCart={handleAddCustomToCart}
          onAnnounce={announce}
          customOverlayUrl={overlayUrl}
        />

        {/* About Section ("Sobre") */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer logoUrl={logoUrl} onOpenAboutModal={(title) => setInfoModalTitle(title)} />

      {/* Direct HTML Image Links Modal */}
      <ImageLinkModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        logoUrl={logoUrl}
        onUpdateLogoUrl={setLogoUrl}
        heroUrl={heroUrl}
        onUpdateHeroUrl={setHeroUrl}
        overlayUrl={overlayUrl}
        onUpdateOverlayUrl={setOverlayUrl}
        onAnnounce={announce}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Mercado Pago Sales Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onClearCart={() => setCartItems([])}
        onAnnounce={announce}
      />

      {/* Informational Policy Modal */}
      {infoModalTitle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-bold text-stone-900 text-base">{infoModalTitle}</h3>
              <button
                onClick={() => setInfoModalTitle(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {infoModalTitle === 'Política de Privacidade' &&
                'Seus dados pessoais são utilizados estritamente para o processamento e entrega dos seus pedidos.'}
              {infoModalTitle === 'Termos de Serviço' &&
                'Adesivos táteis produzidos em material polimérico de alta durabilidade com relevo tátil e adesivo de alta aderência.'}
              {infoModalTitle === 'Declaração de Acessibilidade' &&
                'Este site foi desenvolvido seguindo as diretrizes WCAG 2.1 nível AA.'}
              {infoModalTitle === 'Contato & Suporte' &&
                'Entre em contato pelo e-mail suporte@adesivostateis.com.br.'}
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInfoModalTitle(null)}
                className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
