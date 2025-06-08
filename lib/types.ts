import { ProductImage } from "@prisma/client";

// lib/types.ts
export interface Category {
  id: string;
  name: string;
  name_zh: string | null;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  id: string;
  name: string;
  name_zh: string | null;
  description: string | null;
  description_zh: string | null;

  featured: boolean;
  slider: boolean;
  categoryId: string;
  category: Category;
  images: ProductImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;

  image: string;
  quantity: number;
}
