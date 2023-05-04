import { camelize } from "lib/utils";
import { Button, LinkButton } from "components";

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

const PromotionalProducts = () => {
  return (
    <section id="PromotionalProducts" className={styles.serviceSection}>
      <div>Header Image</div>
      <div>
        <h2 className={styles.serviceHeading}>Promotional Products</h2>
        <p>
          <strong>Keep your customers thinking of you!</strong> Branded
          promotional products offer tactile and useful tools, souvenirs, and
          what-cha-ma-call-its to help your company stand out and make a lasting
          impact. Put your logo on pens, coffee cups, stress relievers, phone
          chargers, and other memorable novelties! Affordable and functional,
          these giveaway items go a long way in keeping your business on
          everybody's mind. Browse the catalog or give us a call to explore the
          exciting world of customizable promo products!
        </p>
        <LinkButton href="#">Browse Promotional Items</LinkButton>
        <div>Image 1</div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`clicked 'promo products'`);
        }}
      >
        <header>
          <div>Image</div>
          <h3>Interested in Promo Products?</h3>
        </header>
        <p>
          Pick a category, and we'll e-mail you awesome product recommendations
          and pricing!
        </p>
        <input name="__title" type="hidden" value="services" />
        <input name="serviceName" type="hidden" value="Promotional Products" />
        <div>
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
          {},
        ].map(({ name, label, type }) => {
          const id = `promoProduct__${name}`;
          return (
            <div key={id}>
              <label htmlFor={id}>{label}</label>
              <input id={id} name={name} type={type} />
            </div>
          );
        })}
        <div>
          <label htmlFor="promoProduct__file">Attach Logo</label>
          <input id="promoProduct__file" name="file" type="file" />
        </div>
        <Button type="submit">Upload Your Logo!</Button>
      </form>
    </section>
  );
};

export default PromotionalProducts;
