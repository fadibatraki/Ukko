import type React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AboutUs1 from "@/components/about-us1";
import About from "@/components/about";
import Testimonials from "@/components/Testimonials/index";


import CatalogCard from "@/components/catalog-card";


import Hero from "@/components/hero";
import prisma from "@/lib/prisma";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UKKO",
  description: "",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const products = await prisma.product.findMany({
    select: { name: true, name_zh: true, id: true },
  });

  const categories = await prisma.category.findMany({
    select: { name: true, name_zh: true, id: true },
    where: {
      OR: [
        { name: { contains: "PCBa" } },
        { name: { contains: "Smart Home" } },
        { name: { contains: "Copper" } },
        { name: { contains: "Frames" } },
        { name: { contains: "Connects" } },
       
     //   { name: { contains: "Copper" } },
      ],
      // in: ["compressors", "Gas", "Copper", "Insulation"],
      // contains: [""]
    },
  });

  const catalogs = await prisma.catalog.findMany();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <div className="flex min-h-screen flex-col">
            <Header products={products} categories={categories} />
            <Hero />
             <About />
            <main className="flex-1">{children}</main>
             
                <Testimonials />
               
            <CatalogCard catalogs={catalogs} />
   
            {/* <AboutUs1 /> */}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
