// app/admin/categories/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/category-form";
import prisma from "@/lib/prisma";

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;
  // Fetch the category
  const category = await prisma.category.findUnique({
    where: { id },
  });

  // If category doesn't exist, return 404
  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
