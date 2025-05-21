import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { featured: true },
    include: { category: true, images: true },
  });

  const t = await getTranslations("HomePage");

  return (
    <div className="container mx-auto px-4 py-8">
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t("featuredProducts")}</h2>
          <Button asChild variant="outline">
            <Link href="/products">{t("viewAll")}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
