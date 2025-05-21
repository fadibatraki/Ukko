// components/ProductCard.tsx
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

interface ProductCardProps {
  product: Product;
}

export async function ProductCard({ product }: ProductCardProps) {
  const locale = await getLocale();
  const t = await getTranslations("Product");

  // Default image if no images are available
  const imageUrl = product.images?.[0].url || "/placeholder-image.jpg";

  return (
    <Card className="overflow-hidden border-0">
      <div className="relative aspect-square border-1 rounded-3xl">
        <Link href={`/products/${product.id}`}>
          <Image
            src={imageUrl}
            alt={
              locale === "zh" && product.name_zh
                ? product.name_zh
                : product.name
            }
            fill
            className="object-cover transition-all hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </Link>
        {product.featured && (
          <Badge className="absolute top-3 right-3 z-10">{t("featured")}</Badge>
        )}
      </div>

      <CardContent className="p-4 mt-0">
        <Link
          href={`/category/${product.category.id}`}
          className="mb-1 text-sm text-muted-foreground"
        >
          {locale === "zh" && product.category.name_zh
            ? product.category.name_zh
            : product.category.name}
        </Link>
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="font-semibold">
            {locale === "zh" && product.name_zh
              ? product.name_zh
              : product.name}
          </h3>
        </Link>
      </CardContent>

      <CardFooter className="flex flex-col p-4 pt-0 gap-3">
        <div className="w-full flex items-center justify-between">
          <div className="font-bold">{formatPrice(product.price ?? 0)}</div>
        </div>

        <AddToCartButton product={product} className="w-full" size="sm" />
      </CardFooter>
    </Card>
  );
}
