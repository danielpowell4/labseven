import Image from "next/image";

import { camelize } from "lib/utils";
import { Button, LinkButton } from "components";

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
          <LinkButton href="#">Browse Promotional Items</LinkButton>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`clicked 'promo products'`);
          }}
          className={styles.form}
        >
          <header className={styles.form__header}>
            <Image src={Icon} />
            <h3 className={styles.form__heading}>
              Interested in Promo Products?
            </h3>
          </header>
          <p>
            Pick a category, and we'll e-mail you awesome product
            recommendations and pricing!
          </p>
          <input name="__title" type="hidden" value="services" />
          <input
            name="serviceName"
            type="hidden"
            value="Promotional Products"
          />
          <div className={styles.formContainer}>
            {choices.map((choice) => {
              const choiceId = `promoProduct__${camelize(choice)}`;

              return (
                <div key={choice}>
                  <input
                    type="radio"
                    name={"Item Type"}
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
          <div className={styles.formContainer}>
            <label htmlFor="promoProduct__file">Attach Logo</label>
            <input id="promoProduct__file" name="file" type="file" />
          </div>
          <Button type="submit">Upload Your Logo!</Button>
        </form>
      </div>
    </section>
  );
};

export default PromotionalProducts;
