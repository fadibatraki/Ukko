// app/admin/page.tsx
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  Package,
  Tag,
  TrendingUp,
  ShoppingCart,
  FileImage,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic"; // Ensure page is not statically optimized

export default async function AdminDashboard() {
  // Fetch counts for dashboard
  const [productCount, categoryCount, featuredProductCount, catalogsCount] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.product.count({
        where: {
          featured: true,
        },
      }),
      prisma.catalog.count(),
    ]);

  // Get recent products
  const recentProducts = await prisma.product.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productCount}</div>
            <p className="text-xs text-muted-foreground">
              Items in your inventory
            </p>
          </CardContent>
          {/* <CardFooter> */}
          {/*   <Button asChild variant="ghost" size="sm" className="w-full"> */}
          {/*     <Link href="/admin/products">View all products</Link> */}
          {/*   </Button> */}
          {/* </CardFooter> */}
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryCount}</div>
            <p className="text-xs text-muted-foreground">
              Product organization
            </p>
          </CardContent>
          {/* <CardFooter> */}
          {/*   <Button asChild variant="ghost" size="sm" className="w-full"> */}
          {/*     <Link href="/admin/categories">Manage categories</Link> */}
          {/*   </Button> */}
          {/* </CardFooter> */}
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Featured Products
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredProductCount}</div>
            <p className="text-xs text-muted-foreground">
              Products marked as featured
            </p>
          </CardContent>
          {/* <CardFooter> */}
          {/*   <Button asChild variant="ghost" size="sm" className="w-full"> */}
          {/*     <Link href="/admin/products?filter=featured">View featured</Link> */}
          {/*   </Button> */}
          {/* </CardFooter> */}
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Catalogs</CardTitle>
            <FileImage className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{catalogsCount}</div>
            <p className="text-xs text-muted-foreground">Catalogs you have</p>
          </CardContent>
          {/* <CardFooter> */}
          {/*   <Button asChild variant="ghost" size="sm" className="w-full"> */}
          {/*     <Link href="/admin/products?filter=lowStock"> */}
          {/*       Check inventory */}
          {/*     </Link> */}
          {/*   </Button> */}
          {/* </CardFooter> */}
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button asChild variant="outline" size="lg" className="h-auto py-4">
            <Link
              href="/admin/products/new"
              className="flex flex-col items-center"
            >
              <Package className="h-6 w-6 mb-2" />
              <span>Add New Product</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-auto py-4">
            <Link
              href="/admin/categories/new"
              className="flex flex-col items-center"
            >
              <Tag className="h-6 w-6 mb-2" />
              <span>Create Category</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-auto py-4">
            <Link
              href="/admin/catalogs/new"
              className="flex flex-col items-center"
            >
              <FileImage className="h-6 w-6 mb-2" />
              <span>Add New Catalog</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Recent Products */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Products</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/products">View All</Link>
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="py-3 px-4 text-left font-medium">Name</th>
                <th className="py-3 px-4 text-left font-medium">Category</th>
             
                <th className="py-3 px-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">{product.category.name}</td>
               
                  <td className="py-3 px-4 text-center">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <span className="sr-only">Edit</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
              {recentProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 text-center text-muted-foreground"
                  >
                    No products found. Add your first product.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
