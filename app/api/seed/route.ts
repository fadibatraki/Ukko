import { NextResponse } from "next/server";
import { products, categories } from "@/lib/seed-products";
import prisma from "@/lib/prisma";

export async function GET() {
  for await (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        name_zh: product.name_zh,
        description: product.description,
        description_zh: product.description_zh,
   
        images: {
          createMany: {
            data: product.images.map((im) => ({ url: im })),
          },
        },
        category: {
          connectOrCreate: {
            where: { name: product.category },
            create: {
              name: product.category,
              name_zh: categories.find((c) => c.name === product.category)
                ?.name_zh,
              slug: product.category.toLowerCase().replaceAll(" ", "-"),
            },
          },
        },
      },
    });
  }
  return NextResponse.json({ message: "Products seeded successfully!" });
}
