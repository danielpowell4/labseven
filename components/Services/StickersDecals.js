import * as React from "react";

import Image from "next/image";

import { camelize, formatUSD } from "lib/utils";
import { useSubmit } from "lib/customHooks";

import { Button } from "components";
import SkinnyFileUpload from "./SkinnyFileUpload";
import ThankYou from "./ThankYou";

import Banner from "public/assets/Services/Stickers_Banner.jpg";
import Van_Wide from "public/assets/Services/Stickers_Van_Wide.jpg";
import WaterBottle_Wide from "public/assets/Services/Stickers_WaterBottle_Wide.jpg";
import icon from "public/assets/Services/Stickers_icon.svg";

import styles from "./Services.module.css";

const choices = [
  {
    label: "Shape",
    value: "shape",
    options: [
      { label: "Circle", value: "circle" },
      { label: "Rectangle", value: "rectangle" },
    ],
  },
];

const calculateArea = (values) => {
  const shape = values["quote.shape"];

  switch (shape) {
    case "circle": {
      const radius = values["quote.radius"] || 0;
      return Math.PI * radius * radius;
    }
    case "rectangle": {
      const width = values["quote.width"] || 0;
      const height = values["quote.height"] || 0;
      return width * height;
    }
    default:
      return 0;
  }
};

const buildQuote = (values) => {
  const qty = values["quote.quantity"] || 0;
  if (qty < 50) return "UNDER_MINIMUM";

  const area = calculateArea(values);
  const areaCost = 0.012;
  const perPiece = area * areaCost;
  const productionCost = qty * perPiece;

  let customerPrice;
  if (qty >= 50 && qty < 200) customerPrice = productionCost * 3.75 + 35;
  if (qty >= 200 && qty < 500) customerPrice = productionCost * 3.25 + 25;
  if (qty >= 500 && qty < 1000) customerPrice = productionCost * 2.75 + 20;
  if (qty >= 1000 && qty <= 5000) customerPrice = productionCost * 2 + 15;

  if (customerPrice === undefined) return "OUT_OF_RANGE"; // 5000+
  return [customerPrice / qty, customerPrice];
};

const formatArea = (area) =>
  `${new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
  }).format(area)} in²`;

const checkIsSquare = (values) => {
  const width = values["quote.width"];
  if (width == null) return false;
  const height = values["quote.height"];
  if (height == null) return false;

  return width === height;
};

const StickerDecalsForm = () => {
  const [formState, onSubmit] = useSubmit();
  const [values, setValues] = React.useState({});

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

  const setValueAsNumber = (e) => {
    const { name, value } = e.target;
    const numberValue = value === "" ? "" : Number(value);
    if (isNaN(numberValue)) return;

    switch (name) {
      case "quote.diameter": {
        const newValues = {
          [name]: numberValue,
          ["quote.radius"]: numberValue / 2,
        };
        return setValues((prev) => ({ ...prev, ...newValues }));
      }
      case "quote.radius": {
        const newValues = {
          [name]: numberValue,
          ["quote.diameter"]: numberValue * 2,
        };
        return setValues((prev) => ({ ...prev, ...newValues }));
      }
      default:
        return setValues((prev) => ({ ...prev, [name]: numberValue }));
    }
  };

  const area = calculateArea(values);
  const calculatedQuote = buildQuote(values);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <header className={styles.form__header}>
        <Image src={icon} />
        <h3 className={styles.form__heading}>Sticker Pricing</h3>
      </header>
      <input name="__title" type="hidden" value="service_inquiry" />
      <input name="service" type="hidden" value="Stickers & Decals" />
      {choices.map(({ label, value, options }) => {
        const id = `sticker__${camelize(value)}`;

        return (
          <div key={label} className={styles.formContainer}>
            <label>{label}</label>
            {options.map(({ label: optLabel, value: optValue }) => {
              const optId = `${id}__${camelize(optLabel)}`;
              const fieldName = `quote.${value}`;
              const formVal = values[fieldName];
              const displayLabel =
                optLabel === "Circle"
                  ? optLabel
                  : checkIsSquare(values)
                  ? "Square or Die-Cut"
                  : "Rectangle or Die-Cut";

              return (
                <div key={optId}>
                  <input
                    type="radio"
                    name={fieldName}
                    value={optValue}
                    checked={formVal === optValue}
                    onChange={(event) =>
                      setValues((prev) => ({
                        ...prev,
                        [event.target.name]: event.target.value,
                      }))
                    }
                    id={optId}
                  />
                  <label htmlFor={optId}>{displayLabel}</label>
                </div>
              );
            })}
          </div>
        );
      })}

      {values["quote.shape"] === "circle" && (
        <div
          className={styles.formContainerSideBySide}
          style={{ gap: "0.5rem" }}
        >
          <div className={styles.formContainer}>
            <input
              id="sticker__diameter"
              name="quote.diameter"
              type="number"
              step="0.125" // 1/8"
              min="0"
              className={styles.formInput}
              placeholder="Inches"
              value={values["quote.diameter"]}
              onChange={setValueAsNumber}
            />
            <label htmlFor={"sticker__diameter"} className={styles.formLabel}>
              Diameter (in.)
            </label>
          </div>
          or
          <div className={styles.formContainer}>
            <input
              id="sticker__radius"
              name="quote.radius"
              type="number"
              step="0.0625" // 1/16"
              min="0"
              className={styles.formInput}
              placeholder="Inches"
              value={values["quote.radius"]}
              onChange={setValueAsNumber}
            />
            <label htmlFor={"sticker__radius"} className={styles.formLabel}>
              Radius (in.)
            </label>
          </div>
        </div>
      )}

      {values["quote.shape"] === "rectangle" && (
        <div
          className={styles.formContainerSideBySide}
          style={{ gap: "0.5rem" }}
        >
          <div className={styles.formContainer}>
            <input
              id="sticker__width"
              name="quote.width"
              type="number"
              step="0.125"
              min="0"
              className={styles.formInput}
              placeholder="Width (in.)"
              value={values["quote.width"]}
              onChange={setValueAsNumber}
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
              step="0.125"
              min="0"
              className={styles.formInput}
              placeholder="Height (in.)"
              value={values["quote.height"]}
              onChange={setValueAsNumber}
            />
            <label htmlFor={"sticker__height"} className={styles.formLabel}>
              Height (in.)
            </label>
          </div>
        </div>
      )}

      {!values["quote.shape"] && (
        <div className={styles.formContainer}>
          <p style={{ minHeight: 36, margin: 0 }}>
            Select 'Shape' to enter Size.
          </p>
        </div>
      )}

      <div className={styles.formContainer}>
        <input
          id="sticker__quantity"
          name="quote.quantity"
          type="number"
          step="1"
          min="50"
          className={styles.formInput}
          placeholder="(50 Ct Minimum)"
          value={values["quote.quantity"]}
          onChange={setValueAsNumber}
        />
        <label htmlFor="sticker__quantity" className={styles.formLabel}>
          Quantity
        </label>
      </div>
      <hr />
      <div>
        {values["quote.shape"] === "circle" && (
          <p>
            π × ({values["quote.radius"] ?? 0} in)
            <sup>2</sup> = {formatArea(area)}
          </p>
        )}
        {values["quote.shape"] === "rectangle" && (
          <p>
            {values["quote.width"] || "0"}" × {values["quote.height"] || "0"}" ={" "}
            {formatArea(area)}
          </p>
        )}
        {calculatedQuote === "UNDER_MINIMUM" ? (
          <>
            <p>We have a 50 count minimum</p>
            <input
              type="hidden"
              name="quote.priceShownToCustomer"
              value="We have a 50 count minimum"
            />
          </>
        ) : calculatedQuote === "OUT_OF_RANGE" ? (
          <>
            <p>Contact our team for bulk pricing!</p>
            <input
              type="hidden"
              name="quote.priceShownToCustomer"
              value="Contact our team for bulk pricing!"
            />
          </>
        ) : (
          <>
            <h4>{formatUSD(calculatedQuote[0])} each</h4>
            <input
              type="hidden"
              name="quote.perStickerPriceShownToCustomer"
              value={formatUSD(calculatedQuote[0])}
            />
            <h4>{formatUSD(calculatedQuote[1])} total</h4>
            <input
              type="hidden"
              name="quote.totalPriceShownToCustomer"
              value={formatUSD(calculatedQuote[1])}
            />
          </>
        )}
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
            (glossy or matte) die cut vinyl stickers, decals, and transfers.{" "}
            <strong>Die-cut stickers can be cut in any shape you'd like</strong>
            , and offer a fun and affordable way to raise brand awareness!
          </p>
          <p>
            We currently offer both <strong>die-cut stickers</strong> (great for
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
