import Image from "next/image";

import { Button } from "components";

import Banner from "public/assets/Services/Stickers_Banner.jpg";
import Van_Wide from "public/assets/Services/Stickers_Van_Wide.jpg";
import WaterBottle_Wide from "public/assets/Services/Stickers_WaterBottle_Wide.jpg";
import icon from "public/assets/Services/Stickers_icon.svg";

import styles from "./Services.module.css";

const StickersDecals = ({ sectionRef }) => {
  return (
    <section
      id="StickersDecals"
      className={styles.serviceSection}
      ref={sectionRef}
    >
      <div className={styles.bannerContainer}>
        <Image
          src={Banner}
          alt="Cleanly pressed stickers covering a slick computer"
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 1200px) 50vw, 100vw"
        />
      </div>
      <div className={styles.sideBySide}>
        <div className={styles.content}>
          <h2 className={styles.serviceHeading}>Stickers & Decals</h2>
          <p>
            Who doesn't love stickers? Lab Seven is proud to offer full color
            (glossy or matte) die cut vinyl stickers, decals, and transfers.
            <strong>Die-cut stickers can be cut in any shape you'd like</strong>
            , and offer a fun and affordable way to raise brand awareness!
          </p>
          <p>
            We currently offer both <strong>die cut stickers</strong> (great for
            water bottles and laptops) and{" "}
            <strong>vinyl transfer decals</strong> (great for windows or company
            vehicles and work truck decals).
          </p>
          {[
            { src: Van_Wide, alt: "" },
            { src: WaterBottle_Wide, alt: "" },
          ].map((image, imageIndex) => (
            <div className={styles.wideImageContainer} key={imageIndex}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 1200px) 30vw, 80vw"
              />
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("you clicked sticker form");
          }}
          className={styles.form}
        >
          <header className={styles.form__header}>
            <Image src={icon} />
            <h3 className={styles.form__heading}>Sticker Pricing</h3>
          </header>
          <input name="__title" type="hidden" value="services" />
          <input name="serviceName" type="hidden" value="Stickers & Decals" />
          <div>
            <label htmlFor="sticker_width">Size:</label>
            <div>
              <input
                id="sticker_width"
                name="width"
                type="number"
                step="0.05"
                placeholder="Width (in.)"
              />
              x
              <input
                id="sticker_height"
                name="height"
                type="number"
                step="0.05"
                placeholder="Height (in.)"
              />
            </div>
          </div>
          <div>
            <label htmlFor="sticker_quantity">Quantity:</label>
            <input
              id="sticker_quantity"
              name="quantity"
              type="number"
              step="1"
              min="50"
              placeholder="(50 Ct Minimum)"
            />
          </div>
          <hr />
          <div>
            <h4>$0.00 each</h4>
            <h4>$0.00 total</h4>
          </div>
          <hr />
          <div>
            <h3>Ready to order?</h3>
            <div>
              <label htmlFor="sticker_name">Name:</label>
              <input
                type="text"
                id="sticker_name"
                name="name"
                placeholder="Chuck Sterling"
              />
            </div>
            <div>
              <label htmlFor="sticker_email">Email:</label>
              <input
                type="email"
                id="sticker_name"
                name="name"
                placeholder="you@goodplace.com"
              />
            </div>
            <div>
              <label htmlFor="sticker_logo">Attach Logo</label>
              <input type="file" id="sticker_logo" name="attachments" />
            </div>
            <Button type="submit">Get Started</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StickersDecals;
