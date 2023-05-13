import Image from "next/image";

import { useSubmit } from "lib/customHooks";
import { Button } from "components";
import SkinnyFileUpload from "./SkinnyFileUpload";
import ThankYou from "./ThankYou";

import Banner from "public/assets/Services/Stickers_Banner.jpg";
import Van_Wide from "public/assets/Services/Stickers_Van_Wide.jpg";
import WaterBottle_Wide from "public/assets/Services/Stickers_WaterBottle_Wide.jpg";
import icon from "public/assets/Services/Stickers_icon.svg";

import styles from "./Services.module.css";

const StickerDecalsForm = () => {
  const [formState, onSubmit] = useSubmit();

  if (formState === "submitted") {
    return (
      <div className={styles.form}>
        <header className={styles.form__header}>
          <Image src={icon} />
          <h3 className={styles.form__heading}>Sticker Pricing</h3>
        </header>
        <ThankYou />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <header className={styles.form__header}>
        <Image src={icon} />
        <h3 className={styles.form__heading}>Sticker Pricing</h3>
      </header>
      <input name="__title" type="hidden" value="service_inquiry" />
      <input name="service" type="hidden" value="Stickers & Decals" />
      <div className={styles.formContainerSideBySide}>
        <div className={styles.formContainer}>
          <input
            id="sticker__width"
            name="quote.width"
            type="number"
            step="0.05"
            className={styles.formInput}
            placeholder="Width (in.)"
          />
          <label htmlFor={"sticker__width"} className={styles.formLabel}>
            Width (in.)
          </label>
        </div>
        x
        <div className={styles.formContainer}>
          <input
            id="sticker__height"
            name="quote.height"
            type="number"
            step="0.05"
            className={styles.formInput}
            placeholder="Height (in.)"
          />
          <label htmlFor={"sticker__height"} className={styles.formLabel}>
            Height (in.)
          </label>
        </div>
      </div>
      <div className={styles.formContainer}>
        <input
          id="sticker__quantity"
          name="quote.quantity"
          type="number"
          step="1"
          min="50"
          className={styles.formInput}
          placeholder="(50 Ct Minimum)"
        />
        <label htmlFor="sticker__quantity" className={styles.formLabel}>
          Quantity
        </label>
      </div>
      <hr />
      <div>
        <h4>$0.00 each</h4>
        <h4>$0.00 total</h4>
      </div>
      <hr />
      <div>
        <h3>Ready to order?</h3>
        <div className={styles.formContainer}>
          <input
            type="text"
            id="sticker__name"
            className={styles.formInput}
            name="name"
            placeholder="Chuck Sterling"
          />
          <label htmlFor="sticker__name" className={styles.formLabel}>
            Name
          </label>
        </div>
        <div className={styles.formContainer}>
          <input
            type="email"
            id="sticker__email"
            name="email"
            className={styles.formInput}
            placeholder="you@goodplace.com"
          />
          <label htmlFor="sticker__email" className={styles.formLabel}>
            Email
          </label>
        </div>
        <SkinnyFileUpload prefix="sticker" />
        <Button type="submit" isSubmitting={formState === "submitting"}>
          Get Started
        </Button>
        {formState === "error" && (
          <p style={{ color: "var(--danger)" }}>
            Oh no! An error occurred. If this problem continues please let our
            team know.
          </p>
        )}
      </div>
    </form>
  );
};

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
        <StickerDecalsForm />
      </div>
    </section>
  );
};

export default StickersDecals;
