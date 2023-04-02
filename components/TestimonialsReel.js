import * as React from "react";
import styles from "./TestimonialsReel.module.css";

import Image from "next/image";
import { Button } from ".";

import ArrowLeft from "../public/assets/Home/ArrowLeft.svg";
import ArrowRight from "../public/assets/Home/ArrowRight.svg";
import Stars from "../public/assets/Home/Testimonials_Stars.svg";

import Casey from "../public/assets/Home/Testimonials_Casey.png";
import Bryan from "../public/assets/Home/Testimonials_Bryan.png";
import Lenae from "../public/assets/Home/Testimonials_Lenae.png";
import Kevon from "../public/assets/Home/Testimonials_Kevon.png";
import Barb from "../public/assets/Home/Testimonials_Barb.png";

const TESTIMONIALS = [
  {
    customerName: "Casey Kent",
    blurb: `We cannot say enough positive things about this company and their team. Nick has been amazing to work with, with fast response time, great ideas, superior accommodation and SUPER SOFT t-shirts with impeccable quality. We are return clients as their products are in their own category. Our family would highly recommend using Lab Seven for your future projects.`,
    avatar: Casey,
  },
  {
    customerName: "Bryan Coy",
    blurb: `I have been a customer here for a couple of years now and I cannot say enough about this fantastic team!  They are always fair and competitive on price, timely, and the best quality around.  You are definitely dealing with the best of the best when you hire this company for whatever your needs are!`,
    avatar: Bryan,
  },
  {
    customerName: "Lenae Myers",
    blurb: `Could not have asked for a better company to work with to bring our company creative to life. Nick and his team were so helpful throughout the ordering process and provided great guidance. Our team couldn't be more happy on the high quality outcome! Looking forward to working with them in the future.`,
    avatar: Lenae,
  },
  {
    customerName: "Kevon Fiedler",
    blurb: `Happy to say that we have found our permanent supplier for our apparel company! From the initial phone call to the design process, to the end results, we are highly satisfied! The team over at the Lakeside location has been awesome!`,
    avatar: Kevon,
  },
  {
    customerName: "Barb Silverstein",
    blurb: `I worked with Lab Seven to get school t-shirts and basketball jerseys printed for our elementary school.  Everyone that I've interacted with there is very friendly and responsive to my questions.  It was nice to go to the store and feel the quality of the t-shirt material before selecting the product.  We've now gone back for our second year and intend to continue returning for our t-shirt and branding needs!!`,
    avatar: Barb,
  },
];

const Testimonial = ({ customerName, blurb, avatar }) => (
  <figure className={styles.Testimonial}>
    <figcaption className={styles.Testimonial__attribute}>
      <Image
        src={avatar}
        alt={`Head shot for ${customerName}`}
        style={{ borderRadius: "50%", objectFit: "cover" }}
        width={120}
        height={120}
      />
      <strong>{customerName}</strong>
      <Image
        src={Stars}
        alt="5 Star Review"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
        width={120}
      />
    </figcaption>
    <blockquote className={styles.Testimonial__blurb}>{blurb}</blockquote>
  </figure>
);

export const useCarousel = (items) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  // position helpers
  const lastIndex = items.length - 1;
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === lastIndex;

  // nav helpers
  const showNext = () => {
    setActiveIndex(isLast ? 0 : activeIndex + 1);
  };
  const showPrev = () => {
    setActiveIndex(isFirst ? lastIndex : activeIndex - 1);
  };

  return {
    activeIndex,
    showNext,
    showPrev,
  };
};

const buildTestimonialId = (tIndex) => {
  const id = tIndex + 1;
  return `testimonial-${id}`;
};

const TestimonialsReel = ({ testimonials = TESTIMONIALS }) => {
  const containerRef = React.useRef();
  const { activeIndex, showNext, showPrev } = useCarousel(testimonials);

  React.useEffect(() => {
    const activeId = buildTestimonialId(activeIndex);

    const container = containerRef.current;
    if (container) {
      const testimonial = container.querySelector("#" + activeId);
      if (testimonial) container.scrollTo(testimonial.offsetLeft, 0);
    }
  }, [activeIndex]);

  return (
    <div className={styles.TestimonialsReel}>
      <Button className="ButtonTransparent" onClick={showPrev}>
        <Image src={ArrowLeft} alt={"Arrow to Previous Testimonial"} />
      </Button>
      <ul className={styles.TestimonialsReel__container} ref={containerRef}>
        {testimonials.map((testimonial, tIndex) => (
          <li key={tIndex} id={buildTestimonialId(tIndex)}>
            <Testimonial {...testimonial} />
          </li>
        ))}
      </ul>
      <Button className="ButtonTransparent" onClick={showNext}>
        <Image src={ArrowRight} alt={"Arrow to Next Testimonial"} />
      </Button>
    </div>
  );
};

export default TestimonialsReel;
