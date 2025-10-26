export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  supplier: Supplier;
  specifications: ProductSpecification[];
  inStock: boolean;
  minOrderQuantity: number;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  company: string;
  telegramUsername: string;
  telegramUserId?: string;
  location: string;
  rating: number;
  verified: boolean;
  responseTime: string;
  languages: string[];
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface PurchaseIntent {
  id: string;
  productId: string;
  buyerTelegramId: string;
  quantity: number;
  message: string;
  requirements: string;
  contactInfo: string;
  type: 'purchase' | 'trial';
  status: 'pending' | 'contacted' | 'completed';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  nameRu: string;
  icon: string;
  productCount: number;
}

export type Language = 'zh' | 'en' | 'ru';

export interface AppState {
  currentLanguage: Language;
  selectedCategory: string | null;
  favorites: string[];
  searchQuery: string;
}
