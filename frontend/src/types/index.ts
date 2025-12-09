export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number | string;
  stock: number;
  imageUrl?: string;
}

export interface CreateProductInput {
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}