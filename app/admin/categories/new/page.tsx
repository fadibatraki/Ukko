// app/admin/categories/new/page.tsx
import { CategoryForm } from "@/components/category-form";

export default function NewCategoryPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-2xl font-bold mb-6">Add New Category</h1>
      <CategoryForm />
    </div>
  );
}
