import { AddToCartButton } from "@/components/add-to-cart-button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Truck, Shield } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { ProductImageGallery } from "@/components/product-image-gallery";
import prisma from "@/lib/prisma";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

// export async function generateStaticParams() {
//   const products = await prisma.product.findMany({
//     select: { id: true },
//   });
//   return products.map((product) => ({
//     id: product.id,
//   }));
// }
//
// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const product = await prisma.product.findUnique({
//     where: { id: (await params).id },
//     include: {
//       category: true,
//       images: true,
//     },
//   });
//
//   if (!product) {
//     return {
//       title: "Product Not Found",
//       description: "The product you are looking for does not exist",
//     };
//   }
//
//   return {
//     title: `${product.name} | Modern eCommerce`,
//     description: product.description,
//     openGraph: {
//       title: product.name,
//       description: product.description ?? "",
//       images: [{ url: product.images[0].url || "" }],
//     },
//   };
// }

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: true,
    },
  });

  const t = await getTranslations("ProductDetails");
  const locale = await getLocale();

  if (!product) {
    notFound();
  }

  // Calculate a fake rating for display purposes
  const rating = (Math.floor(Math.random() * 10) + 40) / 10; // Random rating between 4.0 and 5.0

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("backToProducts")}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product images */}
        <div className="bg-background rounded-lg">
          <ProductImageGallery
            images={product.images.map((im) => im.url) || []}
            alt={
              locale === "zh" && product.name_zh
                ? product.name_zh
                : product.name
            }
          />
        </div>

        {/* Product info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href={`/categories/${product.category.id}`}>
                <Badge
                  variant="outline"
                  className="bg-primary/5 hover:bg-primary/10"
                >
                  {locale === "zh" && product.category.name_zh
                    ? product.category.name_zh
                    : product.category.name}
                </Badge>
              </Link>
              {product.featured && (
                <Badge className="bg-amber-500 hover:bg-amber-600">
                  {t("featured")}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {locale === "zh" && product.name_zh
                ? product.name_zh
                : product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">
                  {rating.toFixed(1)}
                </span>
              </div>
              <Separator orientation="vertical" className="h-5" />
              {/* <span className="text-sm text-muted-foreground">
                SKU: {product.id.slice(0, 8).toUpperCase()}
              </span> */}
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold mb-4">
              {formatPrice(product.price ?? 0)}
            </div>

            <Separator className="my-6" />

            <div className="mb-8 prose prose-slate max-w-none">
              <h3 className="text-lg font-medium mb-3">
                {t("aboutThisProduct")}
              </h3>
              <p className="text-muted-foreground">
                {locale === "zh" && product.description_zh
                  ? product.description_zh
                  : product.description}
              </p>
            </div>
          </div>

          {/* <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <AddToCartButton
                product={product}
                className="flex-1 py-6 text-base"
              />

              <Button variant="outline" className="flex-1 py-6">
                {t("saveForLater")}
              </Button>
            </div>
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start p-4 border rounded-lg">
              <Truck className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">{t("freeShipping")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("onOrdersOver50")}
                </p>
              </div>
            </div>

            <div className="flex items-start p-4 border rounded-lg">
              <Shield className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">{t("twoHundred")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("fullCoverage")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional sections like related products could go here */}
    </main>
  );
}
