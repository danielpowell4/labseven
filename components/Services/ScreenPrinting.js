import Image from "next/image";

import { Button } from "/components";

import Banner from "public/assets/Services/ScreenPrinting_Banner.jpg";

import HopeHoodies from "public/assets/Services/ScreenPrinting_01_HopeHoodies.jpg";
import PhillipLindsay from "public/assets/Services/ScreenPrinting_02_PhillipLindsay.jpg";
import CatDog from "public/assets/Services/ScreenPrinting_03_CatDog.jpg";

import IconMockup from "public/assets/Services/ScreenPrinting_IconMockup.svg";

import styles from "./Services.module.css";

const ScreenPrinting = () => {
  return (
    <section id="ScreenPrinting" className={styles.serviceSection}>
      <Image
        src={Banner}
        alt="Hands pulling bright ink over a printing screen"
      />
      <div className={styles.sideBySide}>
        <div className={styles.content}>
          <h2>Screen Printing</h2>
          <p>
            {`Serving Denver and beyond since 2006, Lab Seven offers fresh takes on traditional screen printing methods. We’re up to speed on current print-industry trends, and only use top of the line equipment and materials in our Englewood, Colorado production headquarters. We're constantly improving our formulas to offer bright, soft, and stunning prints that you’ll be as excited to share as we are to print! At Lab Seven, we've perfected the science of t-shirt printing!`}
          </p>
          <br />
          <p>Stop buying cheap throwaway gear.</p>
          <p>
            <strong>Print shirts you'll actually want to wear.</strong>
          </p>
          <Button
            className="ButtonAlternate"
            onClick={(e) => {
              alert(`you clicked ${e.target.innerHTML}`);
            }}
          >
            Get a Quote
          </Button>
          <Button
            onClick={(e) => {
              alert(`you clicked ${e.target.innerHTML}`);
            }}
          >
            Start a Project
          </Button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`trying to submit screen printing form`);
          }}
          className={styles.form}
        >
          <header className={styles.form__header}>
            <Image src={IconMockup} />
            <h3>Get Your Free Digital Proof!</h3>
          </header>
          <strong>Curious about the final product?</strong>
          <p>
            Just upload your logo, drawing, or finished design and a Lab Seven
            artist will be in touch with a complimentary digital proof!
          </p>
          <input name="__title" type="hidden" value="services" />
          <input name="serviceName" type="hidden" value="Screen Printing" />
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            {},
          ].map(({ name, label, type }) => {
            const id = `screenPrinting__${name}`;
            return (
              <div key={id}>
                <label htmlFor={id}>{label}</label>
                <input id={id} name={name} type={type} />
              </div>
            );
          })}
          <div>
            <label htmlFor="screenPrinting__file">Attach Logo</label>
            <input id="screenPrinting__file" name="file" type="file" />
          </div>
          <Button type="submit">Submit!</Button>
        </form>
      </div>
      <div className={styles.imageReel}>
        <Image src={HopeHoodies} />
        <Image src={PhillipLindsay} />
        <Image src={CatDog} />
      </div>
    </section>
  );
};

export default ScreenPrinting;
