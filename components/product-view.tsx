// components/ProductView.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface ProductViewProps {
  product: Product;
}

export function ProductView({ product }: ProductViewProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || "/placeholder-image.jpg",
  );

  // Default to placeholder if no images are available
  const hasImages = product.images && product.images.length > 0;

  const handleAddToCart = () => {
    // This would be replaced with actual cart functionality
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square relative overflow-hidden rounded-lg border bg-muted">
          <Image
            src={selectedImage.url}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />
        </div>

        {/* Thumbnail gallery */}
        {hasImages && product.images.length > 1 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`relative h-20 w-20 cursor-pointer rounded-md border overflow-hidden transition ${
                  selectedImage === image ? "ring-2 ring-primary" : ""
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="mt-2 flex items-center">
            <Link
              href={`/categories/${product.category.slug}`}
              className="text-sm text-muted-foreground hover:underline flex items-center"
            >
              {product.category.name}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

  

        <Separator />

        <div className="prose prose-sm">
          <p>{product.description}</p>
        </div>

        <div className="space-y-4">
          <Button onClick={handleAddToCart} size="lg" className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
