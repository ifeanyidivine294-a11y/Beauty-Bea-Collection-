export type ProductCategory = 'HANDBAGS' | 'SHOES' | 'JEWELRY' | 'PERFUMES';

export type ProductType = 'Bag' | 'Shoe' | 'Jewelry' | 'Perfume';

export type PageRoute = '/' | '/shop' | '/about' | '/contact';

export interface ProductColor {
  name: string;
  hex: string;
  border?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  productType: ProductType;
  price: number;
  image: string;
  description: string;
  colors: ProductColor[];
  sizes?: number[]; // Only for shoes: 36, 37, 38, 39, 40, 41
}

export interface CartItem {
  id: string; // unique composite key: `${productId}-${color}-${size ?? 'default'}`
  product: Product;
  selectedColor: ProductColor;
  selectedSize?: number;
  quantity: number;
}

export type DeliveryMethod = 'waybill' | 'pickup';

export type QualityGrade = 'Standard' | 'Premium';

export interface NigerianStateRate {
  state: string;
  fee: number;
  zone: string;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  type: string;
  country: string;
  town: string;
  officeAddress: string;
  whatsappNumber: string;
  whatsappUrl: string;
  email: string;
  hours: {
    openTime: string; // "06:30"
    closeTime: string; // "17:00"
    timezone: string; // "Africa/Lagos"
    display: string;
  };
  waybillRates: Record<string, number>;
  defaultWaybillFee: number;
  pickupFee: number;
  payment: {
    bank: string;
    accountName: string;
    accountNumber: string;
    isPlaceholder: boolean;
  };
}

export interface OrderFormData {
  fullName: string;
  phoneNumber: string;
  productType: ProductType;
  productName: string;
  color: ProductColor;
  shoeSize?: number;
  quantity: number;
  qualityGrade: QualityGrade;
  additionalNotes: string;
  deliveryMethod: DeliveryMethod;
  // Waybill fields
  destinationState: string;
  destinationTown: string;
  deliveryAddressOrPark: string;
  nearestBusStop: string;
  // Pickup fields
  pickupDate: string;
  pickupTime: string;
}
