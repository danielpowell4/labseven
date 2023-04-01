import * as React from "react";

import Image from "next/image";
import { Button } from ".";
import { useCarousel } from "./TestimonialsReel";

import homeStyles from "../pages/dev/Home.module.css";
import styles from "./ServicesReel.module.css";

import ArrowLeft from "../public/assets/Home/ArrowLeft.svg";
import ArrowRight from "../public/assets/Home/ArrowRight.svg";

import ScreenPrinting from "../public/assets/Home/Services_ScreenPrinting.jpg";
import Embroidery from "../public/assets/Home/Services_Embroidery.jpg";
import Stickers from "../public/assets/Home/Services_Stickers.jpg";
import VinylBanners from "../public/assets/Home/Services_VinylBanners.jpg";
import PromoProducts from "../public/assets/Home/Services_PromoProducts.jpg";
import HeatTransfer from "../public/assets/Home/Services_HeatTransfer.jpg";

const SERVICES = [
  { name: "Screen Printing", background: ScreenPrinting },
  { name: "Embroidery", background: Embroidery },
  { name: "Stickers & Decals", background: Stickers },
  { name: "Vinyl Banners & Signs", background: VinylBanners },
  { name: "Promo Products", background: PromoProducts },
  { name: "Digital Heat Transfer", background: HeatTransfer },
];

const ServicesReel = ({ services = SERVICES }) => {
  const carouselRef = React.useRef();
  const { activeIndex, showNext, showPrev } = useCarousel(services);
  const prevDisabled = activeIndex === 0;
  const nextDisabled = activeIndex === services.length - 3;

  React.useLayoutEffect(() => {
    const oneRem = 16;
    const offset =
      activeIndex * oneRem * (10 + 2); /* fontSize + (size + gap) */
    carouselRef.current.scrollTo({ behavior: "smooth", left: offset });
  }, [activeIndex]);

  return (
    <div className={styles.ServicesReel}>
      <div className={styles.ServicesReel__header}>
        <h3 className={styles.ServicesReel__heading}>
          What does <span className={homeStyles.Underline4}>your business</span>{" "}
          need?
        </h3>
        <div className={styles.ServicesReel__nav}>
          <Button
            className="ButtonTransparent"
            onClick={showPrev}
            disabled={prevDisabled}
          >
            <Image
              src={ArrowLeft}
              style={prevDisabled ? { filter: `opacity(25%)` } : {}}
            />
          </Button>
          <Button
            className="ButtonTransparent"
            onClick={showNext}
            disabled={nextDisabled}
          >
            <Image
              style={nextDisabled ? { filter: `opacity(25%)` } : {}}
              src={ArrowRight}
            />
          </Button>
        </div>
      </div>
      <div className={styles.ServicesReel__carousel} ref={carouselRef}>
        {services.map(({ name, background }, serviceIndex) => (
          <div
            key={serviceIndex}
            className={styles.ServicesReel__carousel__item}
          >
            <Image
              src={background}
              alt={`Amazing sample of our ${name} service`}
              aria-hidden={true}
              style={{
                position: "absolute",
                height: "10rem",
                width: "10rem",
              }}
              height={"10rem"}
              width={"10rem"}
            />
            <h4>{name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesReel;
