export interface ContrastOption {
  id: string;
  name: string;
  bgHex: string;
  textHex: string;
  symbolHex: string;
  borderHex: string;
  description: string;
}

export interface TactileShape {
  id: string;
  name: string;
  symbol: string;
  svgPath: string;
  description: string;
}

export interface CustomStickerConfig {
  contrast: ContrastOption;
  shape: TactileShape;
  labelText: string; // ex: "1", "CAFÉ", "PORTA"
  showBraille: boolean;
  quantityPack: number; // 4, 10, 20
  customImageUrl?: string;
  surfaceTexture: 'relievo_soft' | 'relievo_sharp' | 'embossed_dots';
}

export interface ProductItem {
  id: string;
  title: string;
  category: 'custom' | 'kit_casa' | 'kit_elevador' | 'kit_saude' | 'kit_escola';
  price: number;
  description: string;
  image: string;
  shapes?: string[];
  contrastCombo?: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
}

export interface CartItem {
  id: string;
  title: string;
  description: string;
  unitPrice: number;
  quantity: number;
  image: string;
  customConfig?: CustomStickerConfig;
}

export interface CustomerInfo {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentState {
  isProcessing: boolean;
  preferenceId?: string;
  initPoint?: string;
  pixCode?: string;
  isLive?: boolean;
  errorMessage?: string;
  status?: 'idle' | 'created' | 'pending' | 'success';
}
