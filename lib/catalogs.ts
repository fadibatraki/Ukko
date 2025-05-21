// lib/catalogs.ts
"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export async function getCatalogs() {
  return await prisma.catalog.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCatalog(id: string) {
  return await prisma.catalog.findUnique({
    where: { id },
  });
}

interface CatalogData {
  name: string;
  url: string;
  imageUrl: string;
}

export async function createCatalog(data: CatalogData) {
  const catalog = await prisma.catalog.create({
    data: {
      name: data.name,
      url: data.url,
      imageUrl: data.imageUrl,
    },
  });

  revalidatePath("/admin/catalogs");
  return catalog;
}

export async function updateCatalog(id: string, data: CatalogData) {
  const catalog = await prisma.catalog.update({
    where: { id },
    data: {
      name: data.name,
      url: data.url,
      imageUrl: data.imageUrl,
    },
  });

  revalidatePath("/admin/catalogs");
  revalidatePath(`/admin/catalogs/${id}`);
  return catalog;
}

export async function deleteCatalog(id: string) {
  await prisma.catalog.delete({
    where: { id },
  });

  revalidatePath("/admin/catalogs");
  return true;
}
