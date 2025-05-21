import { getProductsFiltered } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ProductFilter } from "@/components/product-filter";
import { Suspense } from "react";
import { getCategories } from "@/lib/categories";
import { ItemPagination } from "@/components/item-pagination";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Products | oukra",
  description: "Browse our collection of products",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page: number;
    pageSize: number;
    category: string;
    minPrice: string;
    maxPrice: string;
    search: string;
  }>;
}) {
  const {
    page = 1,
    pageSize = 20,
    category,
    minPrice,
    maxPrice,
    search,
  } = await searchParams;
  const categoryIds = category ? category.split(",") : [];

  const { data, count } = await getProductsFiltered({
    page,
    pageSize,
    categoryIds,
    minPrice,
    maxPrice,
    search,
  });

  const categories = await getCategories();

  const productsNames = await prisma.product.findMany({
    select: { name: true },
  });

  const t = await getTranslations("ProductsPage");

  // Calculate total pages for pagination
  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("allProducts")}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <ProductFilter
            categories={categories}
            allProductNames={productsNames.map((p) => p.name)}
            initialCategoryIds={categoryIds}
            initialPriceRange={[0, 10000]}
          />
        </div>

        <div className="w-full md:w-3/4">
          <Suspense fallback={<div>{t("loadingProducts")}</div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Suspense>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <ItemPagination
            baseUrl="/products"
            page={page}
            // pageSize={pageSize}
            pagesCount={totalPages}
          />
        </div>
      )}
    </div>
  );
}
