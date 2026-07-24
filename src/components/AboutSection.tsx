import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-12 bg-stone-50 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500">
          Sobre o Projeto
        </h2>
        <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
          Desenvolvido para a disciplina de <strong>Inovações para Engenharia</strong>, este projeto aborda a dificuldade de identificação enfrentada por pessoas com deficiência visual diante do uso constante de cartões de pagamento, transporte e acesso. Através da produção de baixo custo via impressão 3D, oferecemos uma solução simples, intuitiva e sem tecnologia complexa, promovendo autonomia, inclusão e fácil personalização com alto potencial de expansão para diversos produtos do dia a dia.
        </p>
      </div>
    </section>
  );
};

