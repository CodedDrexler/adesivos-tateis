import React from 'react';

interface FooterProps {
  logoUrl?: string;
  onOpenAboutModal: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ logoUrl, onOpenAboutModal }) => {
  return (
    <footer className="bg-[#1a3f54] text-stone-200 py-12 px-4 sm:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo Adesivos Táteis"
              className="h-10 w-auto object-contain bg-white/90 p-1 rounded"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 p-1 flex items-center justify-between border border-white/20">
                <svg className="w-3 h-3 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <div className="w-2 h-2 rounded-xs bg-teal-300" />
              </div>
              <span className="font-extrabold text-white tracking-wider text-sm uppercase">ADESIVOS TÁTEIS</span>
            </div>
          )}
          <p className="text-xs text-stone-300 max-w-md leading-relaxed">
            © 2026 Adesivos Táteis. Todos os direitos reservados. Projeto acadêmico para a disciplina Inovações para Engenharia.
          </p>
        </div>

        {/* Navigation / Policy Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-6 text-xs text-stone-300 font-medium">
          <button
            onClick={() => onOpenAboutModal('Política de Privacidade')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Política de Privacidade
          </button>
          <button
            onClick={() => onOpenAboutModal('Termos de Serviço')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Termos de Serviço
          </button>
          <button
            onClick={() => onOpenAboutModal('Declaração de Acessibilidade')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Declaração de Acessibilidade
          </button>
          <button
            onClick={() => onOpenAboutModal('Contato & Suporte')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contato & Suporte
          </button>
        </div>
      </div>
    </footer>
  );
};
