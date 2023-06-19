import Image from "next/image";

import { camelize } from "lib/utils";
import { useSubmit } from "lib/customHooks";
import { Button, CallLink } from "components";
import SkinnyFileUpload from "./SkinnyFileUpload";
import ThankYou from "./ThankYou";

import Banner from "public/assets/Services/PromoProducts_Banner.jpg";
import Collection from "public/assets/Services/PromoProducts_Collection.jpg";
import Icon from "public/assets/Services/PromoProducts_Icon.svg";

import styles from "./Services.module.css";

const choices = [
  "Drinkware",
  "Bags & Coolers",
  "Office Materials",
  "Writing Instruments",
  "Stress Relievers",
  "Stationary & Notebooks",
  "Chargers & Tech.",
  "Tools, Flashlights, etc.",
];

const PromotionalProductsForm = () => {
  const [formState, onSubmit] = useSubmit();

  if (formState === "submitted") {
    return (
      <div className={styles.form}>
        <header className={styles.form__header}>
          <Image src={Icon} />
          <h3 className={styles.form__heading}>
            Interested in Promo Products?
          </h3>
        </header>
        <ThankYou />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <header className={styles.form__header}>
        <Image src={Icon} />
        <h3 className={styles.form__heading}>Interested in Promo Products?</h3>
      </header>
      <p>
        Pick a category, and we'll e-mail you awesome product recommendations
        and pricing!
      </p>
      <input name="__title" type="hidden" value="service_inquiry" />
      <input name="service" type="hidden" value="Promotional Products" />
      <div className={styles.formContainer}>
        {choices.map((choice) => {
          const choiceId = `promoProduct__${camelize(choice)}`;

          return (
            <div key={choice}>
              <input
                type="radio"
                name={"quote.Item Type"}
                id={choiceId}
                value={choice}
              />
              <label htmlFor={choiceId}>{choice}</label>
            </div>
          );
        })}
      </div>
      {[
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
      ].map(({ name, label, type }) => {
        const id = `promoProduct__${name}`;
        return (
          <div key={id} className={styles.formContainer}>
            <input
              id={id}
              name={name}
              type={type}
              className={styles.formInput}
              placeholder={label}
            />
            <label htmlFor={id} className={styles.formLabel}>
              {label}
            </label>
          </div>
        );
      })}
      <SkinnyFileUpload prefix="promoProduct" />
      <Button type="submit" isSubmitting={formState === "submitting"}>
        Upload Your Logo!
      </Button>
      {formState === "error" && (
        <p style={{ color: "var(--danger)" }}>
          Oh no! An error occurred. If this problem continues please let our
          team know.
        </p>
      )}
    </form>
  );
};

const PromotionalProducts = ({ sectionRef }) => {
  return (
    <section
      id="PromotionalProducts"
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
          <h2 className={styles.serviceHeading}>Promotional Products</h2>
          <p>
            <strong>Keep your customers thinking of you!</strong> Branded
            promotional products offer tactile and useful tools, souvenirs, and
            what-cha-ma-call-its to help your company stand out and make a
            lasting impact. Put your logo on pens, coffee cups, stress
            relievers, phone chargers, and other memorable novelties! Affordable
            and functional, these giveaway items go a long way in keeping your
            business on everybody's mind. Browse the catalog or give us a call
            to explore the exciting world of customizable promo products!
          </p>
          <div className={styles.linkContainer}>
            <CallLink>Call For Info</CallLink>
          </div>
          <div className={styles.wideImageContainer}>
            <Image
              src={Collection}
              alt={
                "A perfectly laid out collection of promotional products from pens to letterhead"
              }
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 1200px) 30vw, 80vw"
            />
          </div>
        </div>
        <PromotionalProductsForm />
      </div>
    </section>
  );
};

export default PromotionalProducts;
