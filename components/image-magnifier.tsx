"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageMagnifierProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  magnifierSize?: number;
  zoomLevel?: number;
}

export function ImageMagnifier({
  src,
  alt,
  width,
  height,
  magnifierSize = 150,
  zoomLevel = 2.5,
}: ImageMagnifierProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    // Get the position of the image container
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();

    // Calculate cursor position relative to the image
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Set the cursor position for the magnifier background position
    setCursorPosition({ x, y });

    // Calculate the position of the magnifier
    const magnifierX = e.clientX - left - magnifierSize / 2;
    const magnifierY = e.clientY - top - magnifierSize / 2;

    // Ensure the magnifier stays within the image boundaries
    const boundedX = Math.max(0, Math.min(width - magnifierSize, magnifierX));
    const boundedY = Math.max(0, Math.min(height - magnifierSize, magnifierY));

    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseEnter = () => {
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div
      ref={imgRef}
      className="relative overflow-hidden rounded-lg bg-gray-100"
      style={{ width, height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover"
        priority
      />

      {showMagnifier && (
        <div
          className="absolute border-2 border-gray-200 rounded-full pointer-events-none z-10 shadow-lg"
          style={{
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            left: `${position.x}px`,
            top: `${position.y}px`,
            backgroundImage: `url(${src})`,
            backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
            backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
}
