import { ContrastOption, TactileShape, ProductItem } from './types';

export const CONTRAST_OPTIONS: ContrastOption[] = [
  {
    id: 'navy_yellow',
    name: 'Marinho & Amarelo',
    bgHex: '#121F38',
    textHex: '#FFD600',
    symbolHex: '#FFD600',
    borderHex: '#2A3C63',
    description: 'Máximo contraste visual e tátil para visão reduzida',
  },
  {
    id: 'black_yellow',
    name: 'Preto & Amarelo Vivo',
    bgHex: '#111111',
    textHex: '#FFEA00',
    symbolHex: '#FFEA00',
    borderHex: '#333333',
    description: 'Padrão internacional de alerta e alta visibilidade',
  },
  {
    id: 'dusty_rose',
    name: 'Rosa Malva & Nude',
    bgHex: '#A86B79',
    textHex: '#FFFFFF',
    symbolHex: '#FFFFFF',
    borderHex: '#C48A98',
    description: 'Estética suave e elegante com ótimo relevo tátil',
  },
  {
    id: 'white_crimson',
    name: 'Branco & Vermelho',
    bgHex: '#FFFFFF',
    textHex: '#C8102E',
    symbolHex: '#C8102E',
    borderHex: '#E2E8F0',
    description: 'Ideal para marcação de parada, atalho e aviso',
  },
  {
    id: 'emerald_white',
    name: 'Verde Esmeralda',
    bgHex: '#0F5257',
    textHex: '#E8F1F2',
    symbolHex: '#E8F1F2',
    borderHex: '#1A6B71',
    description: 'Contraste relaxante para aparelhos e mobília',
  },
];

export const TACTILE_SHAPES: TactileShape[] = [
  {
    id: 'square',
    name: 'Quadrado',
    symbol: '□',
    svgPath: 'M4 4h16v16H4z',
    description: 'Ideal para marcação de botões de parada e base de portas',
  },
  {
    id: 'circle',
    name: 'Círculo',
    symbol: '○',
    svgPath: 'M12 21a9 9 0 100-18 9 9 0 000 18z',
    description: 'Ação principal, Ligar/Desligar e ativação',
  },
  {
    id: 'triangle',
    name: 'Triângulo',
    symbol: '△',
    svgPath: 'M12 3l10 18H2L12 3z',
    description: 'Direção, Aumentar volume, Temperatura e Ajustes',
  },
  {
    id: 'star',
    name: 'Estrela',
    symbol: '☆',
    svgPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    description: 'Favoritos, Programa Principal, Chave Mestra',
  },
  {
    id: 'plus',
    name: 'Mais / Cruz',
    symbol: '＋',
    svgPath: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
    description: 'Adicionar, Subir Andar, Aumentar',
  },
  {
    id: 'heart',
    name: 'Coração',
    symbol: '♡',
    svgPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    description: 'Identificação pessoal e itens delicados',
  },
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'kit-eletros',
    title: 'Kit Eletrodomésticos & Cozinha',
    category: 'kit_casa',
    price: 39.90,
    description: '12 Adesivos táteis texturizados de alto contraste para micro-ondas, máquina de lavar e fogão.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    shapes: ['Círculo', 'Quadrado', 'Triângulo'],
    contrastCombo: 'Preto & Amarelo',
    rating: 4.9,
    reviewsCount: 84,
    badge: 'Mais Vendido',
  },
  {
    id: 'kit-elevadores-portas',
    title: 'Kit Mobilidade, Portas & Chaves',
    category: 'kit_elevador',
    price: 44.90,
    description: 'Adesivos com relevo acentuado e símbolos táteis para identificação de andares, fechaduras e controles.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    shapes: ['Estrela', 'Mais', 'Quadrado'],
    contrastCombo: 'Marinho & Amarelo',
    rating: 5.0,
    reviewsCount: 52,
    badge: 'Autonomia Total',
  },
  {
    id: 'kit-remedios-saude',
    title: 'Kit Medicamentos & Cuidados',
    category: 'kit_saude',
    price: 34.90,
    description: 'Adesivos táteis diferenciados por forma para identificação diária de caixas de remédios (Manhã, Tarde, Noite).',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    shapes: ['Círculo', 'Estrela', 'Triângulo'],
    contrastCombo: 'Verde Esmeralda',
    rating: 4.8,
    reviewsCount: 39,
  },
  {
    id: 'kit-escola-trabalho',
    title: 'Kit Escolar, Cadernos & Escritório',
    category: 'kit_escola',
    price: 32.90,
    description: 'Adesivos leves para organização de pastas, cadernos, teclado de computador e materiais de trabalho.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    shapes: ['Círculo', 'Coração', 'Quadrado'],
    contrastCombo: 'Rosa Malva & Nude',
    rating: 4.7,
    reviewsCount: 28,
  },
];

// Alfabeto e números simplificados em braille para representação tátil visual
export const BRAILLE_MAP: Record<string, string> = {
  'A': '⠁', 'B': '⠃', 'C': '⠉', 'D': '⠙', 'E': '⠑', 'F': '⠋', 'G': '⠛', 'H': '⠓', 'I': '⠊', 'J': '⠚',
  'K': '⠅', 'L': '⠇', 'M': '⠍', 'N': '⠝', 'O': '⠕', 'P': '⠏', 'Q': '⠿', 'R': '⠷', 'S': '⠮', 'T': '⠞',
  'U': '⠥', 'V': '⠧', 'W': '⠺', 'X': '⠭', 'Y': '⠽', 'Z': '⠵',
  '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑', '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚',
};

export function getBrailleText(text: string): string {
  if (!text) return '';
  return text
    .toUpperCase()
    .split('')
    .map((char) => BRAILLE_MAP[char] || char)
    .join(' ');
}
