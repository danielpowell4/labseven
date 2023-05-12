import Image from "next/image";

import { Button } from "/components";
import SkinnyFileUpload from "./SkinnyFileUpload";

import Banner from "public/assets/Services/ScreenPrinting_Banner.jpg";

import HopeHoodies from "public/assets/Services/ScreenPrinting_01_HopeHoodies.jpg";
import PhillipLindsay from "public/assets/Services/ScreenPrinting_02_PhillipLindsay.jpg";
import CatDog from "public/assets/Services/ScreenPrinting_03_CatDog.jpg";

import IconMockup from "public/assets/Services/ScreenPrinting_IconMockup.svg";

import styles from "./Services.module.css";

const ScreenPrinting = ({ sectionRef }) => {
  return (
    <section
      id="ScreenPrinting"
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
          <h2 className={styles.serviceHeading}>Screen Printing</h2>
          <p>
            {`Serving Denver and beyond since 2006, Lab Seven offers fresh takes on traditional screen printing methods. We’re up to speed on current print-industry trends, and only use top of the line equipment and materials in our Englewood, Colorado production headquarters. We're constantly improving our formulas to offer bright, soft, and stunning prints that you’ll be as excited to share as we are to print! At Lab Seven, we've perfected the science of t-shirt printing!`}
          </p>
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
            <h3 className={styles.form__heading}>
              Get Your Free Digital Proof!
            </h3>
          </header>
          <strong>Curious about the final product?</strong>
          <p>
            Just upload your logo, drawing, or finished design and a Lab Seven
            artist will be in touch with a complimentary digital proof!
          </p>
          <input name="__title" type="hidden" value="service_inquiry" />
          <input name="service" type="hidden" value="Screen Printing" />
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
          ].map(({ name, label, type }) => {
            const id = `screenPrinting__${name}`;
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
          <SkinnyFileUpload prefix="screenPrinting" />
          <Button type="submit">Submit!</Button>
        </form>
      </div>
      <div className={styles.imageReel}>
        {[HopeHoodies, PhillipLindsay, CatDog].map((image, imageIndex) => (
          <div key={imageIndex} className={styles.imageReel__item}>
            <Image src={image} fill sizes="16vw" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScreenPrinting;
