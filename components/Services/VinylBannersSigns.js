import * as React from "react";

import Image from "next/image";

import { camelize, formatUSD } from "lib/utils";
import { useSubmit } from "lib/customHooks";

import { Button } from "components";
import SkinnyFileUpload from "./SkinnyFileUpload";
import ThankYou from "./ThankYou";

import Banner from "public/assets/Services/VinylBanners_Banner.jpg";
import Mercury from "public/assets/Services/VinylBanners_01_Mercury.jpg";
import Prism from "public/assets/Services/VinylBanners_02_Prism.jpg";
import Icon from "public/assets/Services/VinylBanners_icon.svg";

import styles from "./Services.module.css";

const choices = [
  {
    label: "Material",
    options: [
      { label: "13 oz. Standard", value: "13 oz. Standard", pricePerSqFt: 5 },
      {
        label: "18 oz. Heavy Duty",
        value: "18 oz. Heavy Duty",
        pricePerSqFt: 6,
      },
      {
        label: "10 oz. Wind Resistant Mesh",
        value: "10 oz. Wind Resistant Mesh",
        pricePerSqFt: 5.25,
      },
    ],
  },
  {
    label: "Single / Double Sided Printing",
    options: [
      { label: "Single Sided", value: "Single Sided", pricePerSqFt: 0 },
      { label: "Double Sided", value: "Double Sided", pricePerSqFt: 1.5 },
    ],
  },
  {
    label: "Hem & Grommet",
    options: [
      { label: `24" Grommets (Free)`, value: `24" Grommets (Free)` },
      { label: "No Grommets (Free)", value: "No Grommets (Free)" },
    ],
  },
];

const VinylBannersSignsForm = () => {
  const [formState, onSubmit] = useSubmit();
  const [values, setValues] = React.useState({});

  if (formState === "submitted") {
    return (
      <div className={styles.form}>
        <header className={styles.form__header}>
          <Image
            src={Icon}
            alt="Hand drawn stretched banner with dollar sign"
          />
          <h3 className={styles.form__heading}>Banner Pricing:</h3>
        </header>
        <ThankYou />
      </div>
    );
  }

  // dimensions
  const widthFt = values["quote.width_feet"] || 0;
  const widthIn = values["quote.width_inches"] || 0;
  const widthInches = widthFt * 12 + widthIn;
  const heightFt = values["quote.height_feet"] || 0;
  const heightIn = values["quote.height_inches"] || 0;
  const heightInches = heightFt * 12 + heightIn;
  const sqFt = (widthInches * heightInches) / 144;
  const sqFtRounded = Number(sqFt.toFixed(2));
  const setValueAsNumber = (e) => {
    const { name, value } = e.target;
    const numberValue = Number(value);
    if (isNaN(numberValue)) return;
    setValues((prev) => ({ ...prev, [name]: numberValue }));
  };

  // choices
  const selectedMaterial = values["quote.Material"] || "";
  const materialPricePerSqFt =
    choices
      .find((opt) => opt.label === "Material")
      .options.find((opt) => opt.value === selectedMaterial)?.pricePerSqFt || 0;
  const selectedSides = values["quote.Single / Double Sided Printing"] || "";
  const sidePerSqFt =
    choices
      .find((opt) => opt.label === "Single / Double Sided Printing")
      .options.find((opt) => opt.value === selectedSides)?.pricePerSqFt || 0;
  const pricePerSqFt = materialPricePerSqFt + sidePerSqFt;
  const priceShownToCustomer = formatUSD(pricePerSqFt * sqFtRounded);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <header className={styles.form__header}>
        <Image src={Icon} alt="Hand drawn stretched banner with dollar sign" />
        <h3 className={styles.form__heading}>Banner Pricing:</h3>
      </header>
      <input name="__title" type="hidden" value="service_inquiry" />
      <input name="service" type="hidden" value="Vinyl Banners & Signs" />
      <div className={styles.formContainerSideBySide}>
        <div className={styles.formContainer}>
          <input
            id="banner__width_feet"
            name="quote.width_feet"
            type="number"
            step="1"
            min="0"
            className={styles.formInput}
            placeholder="Feet"
            value={values.width_feet}
            onChange={setValueAsNumber}
          />
          <label htmlFor={"banner__width_feet"} className={styles.formLabel}>
            Width (ft.)
          </label>
        </div>
        +
        <div className={styles.formContainer}>
          <input
            id="banner__width_inches"
            name="quote.width_inches"
            type="number"
            step="0.25"
            min="0"
            className={styles.formInput}
            placeholder="Inches"
            value={values.width_inches}
            onChange={setValueAsNumber}
          />
          <label htmlFor={"banner__width_inches"} className={styles.formLabel}>
            Width (in.)
          </label>
        </div>
      </div>
      <div className={styles.formContainerSideBySide}>
        <div className={styles.formContainer}>
          <input
            id="banner__height_feet"
            name="quote.height_feet"
            type="number"
            step="1"
            min="0"
            className={styles.formInput}
            placeholder="Feet"
            value={values.height_feet}
            onChange={setValueAsNumber}
          />
          <label htmlFor={"banner__height_feet"} className={styles.formLabel}>
            Height (ft.)
          </label>
        </div>
        +
        <div className={styles.formContainer}>
          <input
            id="banner__height_inches"
            name="quote.height_inches"
            type="number"
            step="0.25"
            min="0"
            className={styles.formInput}
            placeholder="Inches"
            value={values.height_inches}
            onChange={setValueAsNumber}
          />
          <label htmlFor={"banner__height_inches"} className={styles.formLabel}>
            Height (in.)
          </label>
        </div>
      </div>
      <div className={styles.formContainer}>
        <label>Dimensions</label>
        <p style={{ margin: 0 }}>
          {widthFt}' {widthIn}" × {heightFt}' {heightIn}" = {sqFtRounded} ft
          <sup>2</sup>
        </p>
        <input type="hidden" name="quote.sq_ft" value={sqFtRounded} />
      </div>
      {choices.map(({ label, options }) => {
        const id = `banner__${camelize(label)}`;

        return (
          <div key={label} className={styles.formContainer}>
            <label>{label}</label>
            {options.map(({ label: optLabel, value }) => {
              const optId = `${id}__${camelize(optLabel)}`;
              const fieldName = `quote.${label}`;
              const formVal = values[fieldName];
              return (
                <div key={optId}>
                  <input
                    type="radio"
                    name={fieldName}
                    value={value}
                    checked={formVal === value}
                    onChange={(event) =>
                      setValues((prev) => ({
                        ...prev,
                        [event.target.name]: event.target.value,
                      }))
                    }
                    id={optId}
                  />
                  <label htmlFor={optId}>{optLabel}</label>
                </div>
              );
            })}
          </div>
        );
      })}
      <hr />
      <div>
        <h4>{priceShownToCustomer} each</h4>
        <h3>Ready to Order?</h3>
        <input
          type="hidden"
          name="quote.priceShownToCustomer"
          value={priceShownToCustomer}
        />
      </div>
      <hr />
      <div>
        <div className={styles.formContainer}>
          <input
            type="text"
            id="banner__name"
            name="name"
            placeholder="Chuck Sterling"
            className={styles.formInput}
          />
          <label htmlFor="banner__name" className={styles.formLabel}>
            Name
          </label>
        </div>
        <div className={styles.formContainer}>
          <input
            type="email"
            id="banner__email"
            name="email"
            placeholder="you@goodplace.com"
            className={styles.formInput}
          />
          <label htmlFor="banner__email" className={styles.formLabel}>
            Email
          </label>
        </div>
        <SkinnyFileUpload prefix="banner" />
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

const VinylBannersSigns = ({ sectionRef }) => {
  return (
    <section
      id="VinylBannersSigns"
      className={styles.serviceSection}
      ref={sectionRef}
    >
      <div className={styles.bannerContainer}>
        <Image
          src={Banner}
          alt="Hands pulling bright ink over a printing screen"
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 1200px) 50vw, 100vw"
        />
      </div>
      <div className={styles.sideBySide}>
        <div className={styles.content}>
          <h2 className={styles.serviceHeading}>Vinyl Banners & Signs</h2>
          <p>
            Need road-side signage to promote an event, sale, or business? Vinyl
            banners are some of the most eye-catching and affordable promotional
            products available. Perfect for live events, churches, school
            sports, roofers and construction companies, or your mobile business
            looking for a simple and effective curbside display. Check out the
            pricing calculator to see how affordable old-school advertising can
            be for you!
          </p>
          {[
            { src: Mercury, alt: "" },
            { src: Prism, alt: "" },
          ].map((image, imageIndex) => (
            <div className={styles.tallImageContainer} key={imageIndex}>
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
        <VinylBannersSignsForm />
      </div>
    </section>
  );
};

export default VinylBannersSigns;
