import { Testimonial } from "../types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "User-Centric design",
    designation: "Founder @ Rolex",
    content:
      "We prioritize user-centric design, ensuring user needs and preferences that dictate our design process. This approach involves understanding user requirements, robust research, and continuous feedback integration, leading to products that are both functional and optimized for user experience.",
    image: "/images/testimonials/author-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Development of Customer Products",
    designation: "Founder @ UI Hunter",
    content:
      "UKKO-CO is dedicated to creating outstanding products, and commitment that originates from their state-of-the-art laboratories. Their expert team conducts rigorous evaluations of existing products, pinpointing their strengths and areas of improvement.",
    image: "/images/testimonials/author-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "Offer Free Samples for Trial",
    designation: "Founder @ Trorex",
    content:
      "We embody unparalleled excellence in every product they create. Rather than just highlighting their quality, they emphasize hands-on experience by offering free samples to potential customers, giving a tangible taste of their superior standards across diverse products like skincare and dietary supplements.",
    image: "/images/testimonials/author-03.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2 md:py-[120px]">
      <div className="container px-4">
        <SectionTitle
          subtitle="Ukko"
          title="Our Services"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
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
};

export default Testimonials;
