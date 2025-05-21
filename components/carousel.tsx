"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  DotButton,
  useDotButton,
} from "@/components/ui/carousel";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/lib/types";
import { Link } from "@/i18n/navigation";

type HeroCarouselProps = {
  products: Product[];
};

const TWEEN_FACTOR_BASE = 0.2;

export function HeroCarousel({ products }: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi | undefined>();
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector("img") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          // تحديد المسافة إلى المنتصف بشكل دقيق
          const distanceToCenter = Math.abs(scrollSnap - scrollProgress);
          const isCenter = distanceToCenter < 0.1; // إذا كان العنصر قريب جدا من المنتصف

          const scale = isCenter ? "1.1" : "0.9"; // تكبير العنصر في المنتصف فقط

          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
          tweenNode.style.transition = "transform 0.5s ease";
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!api) return;

    setTweenNodes(api);
    setTweenFactor(api);
    tweenScale(api);

    api
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [api, tweenScale]);

  return (
    <div className="relative w-full bg-[url('/assets/img/hero/3.jpg')] bg-cover bg-center bg-no-repeat py-32 px-4 sm:px-8 md:px-16">
      <div className="max-w-7xl mx-auto px-4">
        <Carousel
          setApi={setApi}
          className="w-full"
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="relative basis-1/2 md:basis-1/5"
              >
                <Link href={`/products/${product.id}`}>
                  <Image
                    className="object-contain mx-auto "
                    src={product.images[0].url}
                    alt={product.name}
                    width={500}
                    height={500}
                    priority
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="embla__dots justify-center mt-4 flex gap-2">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : "",
                )}
              />
            ))}
          </div>
           <div className="embla__dots justify-center mt-4 flex gap-2 pt-18">
        <Image
    src="/assets/img/logo/logo-white.svg"
    alt="Logo"
    width={250} // Adjust size as needed
    height={250}
    className="object-contain"
  />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
