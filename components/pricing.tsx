"use client";

import React from "react";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Pricing Table"
            title="Our Pricing Plan"
            paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div
              className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14"
              data-wow-delay=".1s"
            >
              <p className="absolute right-[-50px] top-[60px] inline-block -rotate-90 rounded-bl-md rounded-tl-md bg-primary px-5 py-2 text-base font-medium text-white">
                Recommended
              </p>

              <span className="mb-5 block text-xl font-medium text-dark dark:text-white">
                Pro Plan
              </span>
              <h2 className="mb-11 text-4xl font-semibold text-dark dark:text-white xl:text-[42px] xl:leading-[1.21]">
                <span className="text-xl font-medium">$ </span>
                <span className="-ml-1 -tracking-[2px]">29</span>
                <span className="text-base font-normal text-body-color dark:text-dark-6">
                  {" "}
                  Per Month
                </span>
              </h2>

              <div className="mb-[50px]">
                <h3 className="mb-5 text-lg font-medium text-dark dark:text-white">
                  Features
                </h3>
                <div className="mb-10 space-y-2">
                  <p className="text-base text-body-color dark:text-dark-6">
                    Access to all basic features
                  </p>
                  <p className="text-base text-body-color dark:text-dark-6">
                    Priority customer support
                  </p>
                  <p className="text-base text-body-color dark:text-dark-6">
                    Monthly updates
                  </p>
                </div>
              </div>

              <div className="w-full">
                <button className="inline-block rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white transition duration-300 hover:bg-primary/90">
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionTitle = ({
  subtitle,
  title,
  paragraph,
  width = "635px",
  center,
}: {
  subtitle?: string;
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
}) => {
  return (
    <div className="-mx-4 flex flex-wrap">
      <div
        className={`wow fadeInUp w-full px-4 ${
          center ? "mx-auto text-center" : ""
        }`}
        data-wow-delay=".1s"
        style={{ maxWidth: width }}
      >
        {subtitle && (
          <span className="mb-2 block text-lg font-semibold text-primary">
            {subtitle}
          </span>
        )}
        <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
          {title}
        </h2>
        <p className="text-base leading-relaxed text-body-color dark:text-dark-6 sm:leading-relaxed">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default Pricing;
