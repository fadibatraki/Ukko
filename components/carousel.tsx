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
    <section
      id="home"
    className="relative overflow-hidden bg-[url('/assets/img/hero/bg.png')] bg-cover bg-center bg-black/20 bg-blend-overlay pt-[120px] md:pt-[130px] lg:pt-[160px]"  >

      <div className="-mx-4 flex flex-wrap items-center">


        <div className="w-full px-4">
          <div
            className="wow fadeInUp relative z-10 mx-auto max-w-[845px]"
            data-wow-delay=".25s"
          >
            <div className="mt-0">

              <div className="w-full px-4">
                <div className="hero-content mx-auto max-w-[780px] text-center">
                  <h1
                    className="mb-4 text-3xl  font-extrabold leading-tight tracking-tight text-white drop-shadow-lg"
                  >
                    In Ukko, we present <span className="italic text-secondary">technology</span> as an <span className="italic text-accent">art</span>
                  </h1>
                  <p className="mt-0 mb-0 text-m sm:text-m text-white/50">
                    we are aiming to be one of the journeys of making the product from A to Z
                  </p>
                </div>

              </div>

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
                          className="object-contain mx-auto"
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
                {/* <div className="embla__dots justify-center mt-4 flex gap-2">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : "",
                )}
              />
            ))}
          </div> */}
                <div className=" embla__dots justify-center flex gap-2 pt-0 mb-2">
                  <ul className="mb-0 flex flex-wrap items-center justify-center gap-5">
                    <li>
                      <Link
                        href="#footer"
                        className="inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#about"
                     
                        className="flex items-center gap-4 rounded-md bg-white/[0.12] px-6 py-[14px] text-base font-medium text-white transition duration-300 ease-in-out hover:bg-white hover:text-dark"
                      >

                        About Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </Carousel>







              <div className="w-full px-4">
                <div
                  className="wow fadeInUp relative z-10 mx-auto max-w-[845px]"
                  data-wow-delay=".25s"
                >
                  <div className="mt-10">
                    <Image
                      src="/assets/img/hero/hero-image1.png"
                      alt="hero"
                      className="mx-auto max-w-full rounded-xl rounded-tr-xl "
                
                      width={845}
                      height={316}
                    />
                  </div>
                  <div className="absolute -left-9 bottom-0 z-[-1]">

                  </div>
                  <div className="absolute -right-6 -top-6 z-[-1]">

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}











