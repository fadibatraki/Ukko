"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageMagnifier } from "./image-magnifier";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

export function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Use default image if no images are provided
  const imageList =
    images.length > 0 ? images : ["/placeholder.svg?height=600&width=600"];

  return (
    <div className="grid gap-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <ImageMagnifier
          src={imageList[selectedImage] || "/placeholder.svg"}
          alt={`${alt} - Image ${selectedImage + 1}`}
          width={600}
          height={600}
        />
      </div>

      {imageList.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {imageList.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border",
                selectedImage === index ? "border-primary" : "border-gray-200",
              )}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${alt} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
