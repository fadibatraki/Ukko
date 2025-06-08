"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/lib/stores/cart-store";
import { Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
  const locale = useLocale();
  const t = useTranslations("CartPage");
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">{t("loadingCart")}</div>
    );
  }

 const subtotal = 0;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">{t("yourCart")}</h1>
        <p className="mb-6">{t("cartIsEmpty")}</p>
        <Button asChild>
          <Link href="/products">{t("continueShopping")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("yourCart")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative basis-64">
                      <Image
                        src={
                          item.image || `/placeholder.svg?height=128&width=128`
                        }
                        alt={
                          locale === "zh" && item.name_zh
                            ? item.name_zh
                            : item.name
                        }
                        width={200}
                        height={200}
                        className="object-contain mx-auto"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col sm:flex-row justify-between">
                      <div className="flex flex-col">
                        <h3 className="font-semibold">
                          {locale === "zh" && item.name_zh
                            ? item.name_zh
                            : item.name}
                        </h3>
                      
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                          >
                            -
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 sm:mt-0">
                      
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <Button variant="outline" onClick={clearCart}>
              {t("clearCart")}
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">{t("continueShopping")}</Link>
            </Button>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{t("orderSummary")}</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>{t("subtotal")}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("shipping")}</span>
                  <span>{t("free")}</span>
                </div>
                <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                  <span>{t("total")}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <Button asChild className="w-full">
                <Link href="/checkout">{t("proceedToCheckout")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
