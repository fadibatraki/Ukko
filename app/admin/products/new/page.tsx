import { ProductForm } from "@/components/product-form";
import prisma from "@/lib/prisma";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
