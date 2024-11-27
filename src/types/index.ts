export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'milk' | 'butter' | 'cheese' | 'yogurt';
  image: string;
  stock: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface CartItem {
  product: Product;
  quantity: number;
}