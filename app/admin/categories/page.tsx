// app/admin/categories/page.tsx
import { Suspense } from "react";
import { CategoriesDataTable } from "@/components/categories-data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic"; // Ensure page is not statically optimized

export default async function AdminCategoriesPage() {
  // Fetch all categories
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  // Transform categories to include product count
  const categoriesWithProductCount = categories.map((category) => ({
    ...category,
    productCount: category._count.products,
  }));

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <Breadcrumb items={[{ label: "Categories" }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Manage your product categories and organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading categories...</div>}>
            <CategoriesDataTable categories={categoriesWithProductCount} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
