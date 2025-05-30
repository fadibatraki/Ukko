import { Testimonial } from "../types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";
import { getTranslations } from "next-intl/server";

export default async function Testimonials() {
  const t = await getTranslations("Services");
  const tc = await getTranslations("ServiceContent"); // الترجمة الخاصة بالمحتوى الداخلي

  const testimonialData: Testimonial[] = [
    {
      id: 1,
      name: tc("item1.name"),
      designation: tc("item1.designation"),
      content: tc("item1.content"),
      image: "/images/testimonials/author-01.png",
      star: 5,
    },
    {
      id: 2,
      name: tc("item2.name"),
      designation: tc("item2.designation"),
      content: tc("item2.content"),
      image: "/images/testimonials/author-02.png",
      star: 5,
    },
    {
      id: 3,
      name: tc("item3.name"),
      designation: tc("item3.designation"),
      content: tc("item3.content"),
      image: "/images/testimonials/author-03.png",
      star: 5,
    },
  ];

  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2 md:py-[120px]">
      <div className="container px-4">
        <SectionTitle
          subtitle={t("title1")}
          title={t("title2")}
          paragraph={t("title3")}
          width="640px"
          center
        />

        <div className="mt-[60px] flex flex-wrap lg:mt-20 gap-y-8">
          {testimonialData.map((testimonial, i) => (
            <SingleTestimonial key={i} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
