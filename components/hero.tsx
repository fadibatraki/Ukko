import "../app/tailwind.css";

import prisma from "@/lib/prisma";
import { HeroCarousel } from "./carousel";

export default async function Hero() {
  const products = await prisma.product.findMany({
    where: { slider: true },
    include: { images: true, category: true },
    take: 100,
  });

  return <HeroCarousel products={products} />;
}
