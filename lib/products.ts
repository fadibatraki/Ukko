// lib/products.ts
"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export async function getProductsFiltered({
  page = 1,
  pageSize = 10,
  categoryIds = [],

  search = "",
}: {
  page?: number;
  pageSize?: number;
  categoryIds?: string[];

  search?: string;
}) {


  // Fetch products with pagination
  const data = await prisma.product.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        categoryIds?.length > 0 ? { categoryId: { in: categoryIds } } : {},
      
      ],
    },
    include: {
      category: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc", // Default ordering
    },
    take: pageSize,
    skip: Math.max(0, (page - 1) * pageSize), // Ensure skip is never negative
  });

  // Get total count using the same conditions
  const count = await prisma.product.count({
    where: {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        categoryIds?.length > 0 ? { categoryId: { in: categoryIds } } : {},
      
      ],
    },
  });

  // Calculate pagination metadata
  const totalPages = Math.ceil(count / pageSize);
  const hasMore = page < totalPages;

  return {
    data,
    count,
    pagination: {
      page,
      pageSize,
      totalPages,
      hasMore,
    },
  };
}
export async function getProducts() {
  return await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
}

interface ProductData {
  name: string;
  name_zh?: string | null;
  description: string | null;
  description_zh?: string | null;

  featured: boolean;
  slider: boolean;
  categoryId: string;
  images: string[];
}

export async function createProduct(data: ProductData) {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      name_zh: data.name_zh,
      description: data.description,
      description_zh: data.description_zh,
    
      featured: data.featured,
      slider: data.slider,
      categoryId: data.categoryId,
      images: { createMany: { data: data.images.map((im) => ({ url: im })) } },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  return product;
}

export async function updateProduct(id: string, data: ProductData) {
  // Delete existing images for the product
  await prisma.productImage.deleteMany({
    where: { productId: id },
  });

  // Update product details and add new images
  const product = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      name_zh: data.name_zh,
      description: data.description,
      description_zh: data.description_zh,
     
      featured: data.featured,
      slider: data.slider,
      categoryId: data.categoryId,
      images: {
        createMany: {
          data: data.images.map((url) => ({ url })),
        },
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath(`/products/${id}`);
  return product;
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  return true;
}

export async function toggleProductFeatured(id: string, featured: boolean) {
  const product = await prisma.product.update({
    where: { id },
    data: { featured },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  return product;
}
