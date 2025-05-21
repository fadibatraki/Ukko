"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { Button } from "@/components/ui/button";
import { DownloadIcon, BookOpenIcon } from "lucide-react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Catalog } from "@prisma/client";

const CatalogCard = ({ catalogs }: { catalogs: Catalog[] }) => {
  const swiperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!swiperRef.current) return;
    new Swiper(swiperRef.current, {
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      },
    });
  }, []);

  const toggleCatalog = (index: number) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  return (
    <section
      id="catalogs"
      className="overflow-hidden  py-20  md:py-[120px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[485px] text-center">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Oukra
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-black dark:text-white sm:text-4xl md:text-[40px]">
                TOP CATALOGS
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-400">
                Oukra Company Pioneering Air Conditioning & Refrigeration
                Solutions "Building a More Comfortable and Sustainable Future"
              </p>
            </div>
          </div>
        </div>

        <div className="-m-5">
          <div
            ref={swiperRef}
            className="swiper testimonial-carousel common-carousel p-5"
          >
            <div className="swiper-wrapper">
              {catalogs.map((catalog, idx) => (
                <div key={idx} className="swiper-slide">
                  <div className="rounded-xl bg-white px-4 py-[30px] shadow-lg dark:bg-gray-800 sm:px-[30px]">
                    <p className="mb-4 font-bold text-base text-gray-700 dark:text-gray-400">
                      {catalog.name}
                    </p>
                    <Image
                      src={catalog.imageUrl}
                      alt={catalog.name}
                      width={400}
                      height={400}
                      className="aspect-square object-cover"
                    />

                    <div className="flex flex-col gap-2">
                      <Button onClick={() => toggleCatalog(idx)}>
                        <BookOpenIcon className="mr-2 h-4 w-4" />
                        {visibleIndex === idx ? "Hide Catalog" : "View Catalog"}
                      </Button>

                      <a
                        href={catalog.url}
                        download
                        className="inline-flex items-center bg-muted px-4 py-2 rounded-md hover:bg-muted/80 text-sm"
                      >
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download PDF
                      </a>
                    </div>

                    {visibleIndex === idx && (
                      <div className="mt-4 w-full max-h-[80vh] overflow-auto rounded-lg border">
                        {isMobile ? (
                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                            <Viewer fileUrl={catalog.url} />
                          </Worker>
                        ) : (
                          <iframe
                            src={catalog.url}
                            className="w-full h-[500px]"
                            title={`Catalog Preview ${idx}`}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="mt-[60px] flex items-center justify-center gap-1">
              <div className="swiper-button-prev cursor-pointer">
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.25 10.2437H4.57187L10.4156 4.29687C10.725 3.9875 10.725 3.50625 10.4156 3.19687C10.1062 2.8875 9.625 2.8875 9.31562 3.19687L2.2 10.4156C1.89062 10.725 1.89062 11.2063 2.2 11.5156L9.31562 18.7344C9.45312 18.8719 9.65937 18.975 9.86562 18.975C10.0719 18.975 10.2437 18.9062 10.4156 18.7687C10.725 18.4594 10.725 17.9781 10.4156 17.6688L4.60625 11.7906H19.25C19.6625 11.7906 20.0063 11.4469 20.0063 11.0344C20.0063 10.5875 19.6625 10.2437 19.25 10.2437Z" />
                </svg>
              </div>
              <div className="swiper-button-next cursor-pointer">
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.8 10.45L12.6844 3.2313C12.375 2.92192 11.8938 2.92192 11.5844 3.2313C11.275 3.54067 11.275 4.02192 11.5844 4.3313L17.3594 10.2094H2.75C2.3375 10.2094 1.99375 10.5532 1.99375 10.9657C1.99375 11.3782 2.3375 11.7563 2.75 11.7563H17.4281L11.5844 17.7032C11.275 18.0126 11.275 18.4938 11.5844 18.8032C11.7219 18.9407 11.9281 19.0094 12.1344 19.0094C12.3406 19.0094 12.5469 18.9407 12.6844 18.7688L19.8 11.55C20.1094 11.2407 20.1094 10.7594 19.8 10.45Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogCard;
