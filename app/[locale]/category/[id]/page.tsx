import { getProductsFiltered } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Suspense } from "react";
import { ItemPagination } from "@/components/item-pagination";
import { getLocale, getTranslations } from "next-intl/server";

export const metadata = {
  title: "Products | oukra",
  description: "Browse our collection of products",
};

export default async function ProductsByCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    page: number;
    pageSize: number;
  }>;
}) {
  const { page = 1, pageSize = 20 } = await searchParams;

  const categoryId = (await params).id;

  const locale = await getLocale();

  const { data, count } = await getProductsFiltered({
    page,
    pageSize,
    categoryIds: [categoryId],
  });

  const t = await getTranslations("ProductsPage");

  // Calculate total pages for pagination
  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {locale === "zh" && data[0].category.name_zh
          ? data[0].category.name_zh
          : data[0].category.name}
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
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
            baseUrl={`/category/${categoryId}`}
            page={page}
            // pageSize={pageSize}
            pagesCount={totalPages}
          />
        </div>
      )}
    </div>
  );
}
