// app/admin/products/page.tsx
import { Suspense } from "react";
import { CatalogsDataTable } from "@/components/catalogs-data-table";
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

export default async function AdminCatalogsPage() {
  // Fetch all products with their categories
  const catalogs = await prisma.catalog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <Breadcrumb items={[{ label: "Catalogs" }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Catalog Management</h1>
        <Button asChild>
          <Link href="/admin/catalogs/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Catalog
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Catalogs</CardTitle>
          <CardDescription>
            Manage your catalog inventory, images, and pdfs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading catalogs...</div>}>
            <CatalogsDataTable catalogs={catalogs} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
