import { CatalogForm } from "@/components/catalog-form";

export default function NewCatalogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Catalog</h1>
      <CatalogForm />
    </div>
  );
}
