import Image from "next/image";

import { camelize } from "lib/utils";
import { Button } from "components";

import Banner from "public/assets/Services/VinylBanners_Banner.jpg";
import Mercury from "public/assets/Services/VinylBanners_01_Mercury.jpg";
import Prism from "public/assets/Services/VinylBanners_02_Prism.jpg";
import Icon from "public/assets/Services/VinylBanners_icon.svg";

import styles from "./Services.module.css";

const choices = [
  {
    label: "Material",
    options: [
      { label: "13 oz. Standard", value: "13 oz. Standard" },
      { label: "18 oz. Heavy Duty", value: "18 oz. Heavy Duty" },
      {
        label: "10 oz. Wind Resistant Mesh",
        value: "10 oz. Wind Resistant Mesh",
      },
    ],
  },
  {
    label: "Single / Double Sided Printing",
    options: [
      { label: "Single Sided", value: "Single Sided" },
      { label: "Double Sided", value: "Double Sided" },
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("you clicked banner form");
          }}
          className={styles.form}
        >
          <header className={styles.form__header}>
            <Image src={Icon} />
            <h3 className={styles.form__heading}>Banner Pricing:</h3>
          </header>
          <input type="hidden" name="__title" value="bannerAndSigns" />
          <input name="__title" type="hidden" value="services" />
          <input
            name="serviceName"
            type="hidden"
            value="Vinyl Banners & Signs"
          />
          <div className={styles.formContainerSideBySide}>
            <div className={styles.formContainer}>
              <input
                id="banner_width"
                name="width"
                type="number"
                step="0.05"
                className={styles.formInput}
                placeholder="Width (in.)"
              />
              <label htmlFor={"banner_width"} className={styles.formLabel}>
                Width (in.)
              </label>
            </div>
            x
            <div className={styles.formContainer}>
              <input
                id="banner_height"
                name="height"
                type="number"
                step="0.05"
                className={styles.formInput}
                placeholder="Height (in.)"
              />
              <label htmlFor={"banner_height"} className={styles.formLabel}>
                Height (in.)
              </label>
            </div>
          </div>
          {choices.map(({ label, options }) => {
            const id = `banner_${camelize(label)}`;

            return (
              <div key={label} className={styles.formContainer}>
                <label>{label}</label>
                {options.map(({ label: optLabel, value }) => {
                  const optId = `${id}_${camelize(optLabel)}`;
                  return (
                    <div key={optId}>
                      <input
                        type="radio"
                        name={label}
                        value={value}
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
            <h4>$0.00 each</h4>
            <h3>Ready to Order?</h3>
          </div>
          <hr />
          <div>
            <div className={styles.formContainer}>
              <input
                type="text"
                id="banner_name"
                name="name"
                placeholder="Chuck Sterling"
                className={styles.formInput}
              />
              <label htmlFor="banner_name" className={styles.formLabel}>
                Name
              </label>
            </div>
            <div className={styles.formContainer}>
              <input
                type="email"
                id="banner_name"
                name="name"
                placeholder="you@goodplace.com"
                className={styles.formInput}
              />
              <label htmlFor="banner_email" className={styles.formLabel}>
                Email
              </label>
            </div>
            <div className={styles.formContainer}>
              <label htmlFor="banner_logo">Attach Logo</label>
              <input type="file" id="banner_logo" name="attachments" />
            </div>
            <Button type="submit">Get Started</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VinylBannersSigns;
