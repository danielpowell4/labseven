import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from ".";
import { useCarousel } from "./TestimonialsReel";

import homeStyles from "../pages/Home.module.css";
import styles from "./ServicesReel.module.css";

import ArrowLeft from "../public/assets/Arrows/Left.svg";
import ArrowRight from "../public/assets/Arrows/Right.svg";

import ScreenPrinting from "../public/assets/Home/Services_ScreenPrinting.jpg";
import Embroidery from "../public/assets/Home/Services_Embroidery.jpg";
import Stickers from "../public/assets/Home/Services_Stickers.jpg";
import VinylBanners from "../public/assets/Home/Services_VinylBanners.jpg";
import PromoProducts from "../public/assets/Home/Services_PromoProducts.jpg";
import HeatTransfer from "../public/assets/Home/Services_HeatTransfer.jpg";

const SERVICES = [
  { id: "ScreenPrinting", name: "Screen Printing", background: ScreenPrinting },
  { id: "Embroidery", name: "Embroidery", background: Embroidery },
  { id: "StickersDecals", name: "Stickers & Decals", background: Stickers },
  {
    id: "VinylBannersSigns",
    name: "Vinyl Banners & Signs",
    background: VinylBanners,
  },
  {
    id: "DigitalHeatTransfer",
    name: "Digital Heat Transfer",
    background: HeatTransfer,
  },
  {
    id: "PromotionalProducts",
    name: "Promo Products",
    background: PromoProducts,
  },
];

/** this is for the home page */
const ServicesReel = ({ services = SERVICES }) => {
  const carouselRef = React.useRef();
  const { activeIndex, showNext, showPrev } = useCarousel(services);
  const prevDisabled = activeIndex === 0;
  const nextDisabled = activeIndex === services.length - 3;

  React.useEffect(() => {
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
              alt={"Arrow to Previous Service"}
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
              alt={"Arrow to Next Service"}
            />
          </Button>
        </div>
      </div>
      <div className={styles.ServicesReel__carousel} ref={carouselRef}>
        {services.map(({ id, name, background }, serviceIndex) => (
          <Link
            href={`/services/#${id}`}
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesReel;
