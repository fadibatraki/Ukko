// app/admin/products/page.tsx
import { Suspense } from "react";
import { ProductsDataTable } from "@/components/products-data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic"; // Ensure page is not statically optimized

export default async function AdminProductsPage() {
  // Fetch all products with their categories
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Fetch categories for filtering
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  // Transform categories for the filter component
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.name, // Using the name for filtering since that's what we display
  }));

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <Breadcrumb items={[{ label: "Products" }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your product inventory, pricing, and details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductsDataTable
              products={products}
              categories={categoryOptions}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
