export interface TransactionsData {
  id: string;
  user_id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  invoice_id: null;
  totalPrice: number;
  discountAmount: number;
  discountedTotal: number;
  paidAmount: number;
  user: User;
  products: ProductElement[];
}

export interface ProductElement {
  id: string;
  transactionId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  priceAtSale: number;
  product: ProductProduct;
}

export interface ProductProduct {
  id: string;
  item_id: string;
  shop_id: string;
  createdAt: Date;
  updatedAt: Date;
  isBestSelling: boolean;
  price: number;
  quantity: number;
}

export interface User {
  id: string;
  phone_no: string;
  name: string;
  email: null;
  role: string;
  user_shop_id: null;
  isApproved: boolean;
  is_phone_no_verified: boolean;
  isFirstLogin: boolean;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  otp: null;
  otpExpiresAt: null;
}
