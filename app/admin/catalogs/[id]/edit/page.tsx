import { CatalogForm } from "@/components/catalog-form";
import prisma from "@/lib/prisma";

export default async function EditCatalogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const catalog = await prisma.catalog.findUnique({
    where: { id },
  });

  if (!catalog) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <CatalogForm catalog={catalog} />
    </div>
  );
}
