"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/stores/cart-store";
import { useTranslations } from "next-intl";

type ButtonProps = React.ComponentProps<typeof Button>;

interface AddToCartButtonProps extends ButtonProps {
  product: Product;
}

export function AddToCartButton({
  product,
  className,
  ...props
}: AddToCartButtonProps) {
  const t = useTranslations("Product");
  const { addItem } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      name_zh: product.name_zh ?? "",
   
      image: product.images[0].url,
      quantity: 1,
    });

    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <Button onClick={handleAddToCart} className={cn(className)} {...props}>
      {isAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" /> {t("added")}
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" /> {t("addToCart")}
        </>
      )}
    </Button>
  );
}
