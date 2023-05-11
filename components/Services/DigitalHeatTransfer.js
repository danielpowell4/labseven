import Image from "next/image";

import { Button, LinkButton } from "components";
import SkinnyFileUpload from "./SkinnyFileUpload";

import Banner from "public/assets/Services/HeatTransfer_Banner.jpg";
import Sample from "public/assets/Services/HeatTransfer_Sample.jpg";
import IconMockup from "public/assets/Services/ScreenPrinting_IconMockup.svg";

import styles from "./Services.module.css";

const DigitalHeatTransfer = ({ sectionRef }) => {
  return (
    <section
      id="DigitalHeatTransfer"
      className={styles.serviceSection}
      ref={sectionRef}
    >
      <div className={styles.bannerContainer}>
        <Image
          src={Banner}
          alt="Working hands resting on an ironing pulling between careful movements"
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 1200px) 50vw, 100vw"
        />
      </div>
      <div className={styles.sideBySide}>
        <div className={styles.content}>
          <h2 className={styles.serviceHeading}>Digital Heat Transfer</h2>
          <p>
            Don't let the limitations of traditional screen printing stop you
            from making your vision a reality! Our digital heat transfer
            decoration method allows us to print virtually any garment in any
            number of colors. Great for names and numbers on sports jerseys,
            full color face mask printing, or getting intricate details on
            textured garments (like tote bags or nylon jackets),{" "}
            <strong>if we can't print it, we can 'press' it!</strong>
          </p>
          <LinkButton href="#">Call Now to Learn More</LinkButton>
          <div className={styles.wideImageContainer}>
            <Image
              src={Sample}
              alt={
                "Careful hands pulling away the backing of a beautiful transfer"
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
            alert(`clicked ${e.targer.innerHTML}`);
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
          <input name="__title" type="hidden" value="services" />
          <input
            name="serviceName"
            type="hidden"
            value="Digital Heat Transfer"
          />
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
          ].map(({ name, label, type }) => {
            const id = `digitalHeatTransfer__${name}`;
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
          <SkinnyFileUpload id={"digitalHeatTransfer__file"} />
          <Button type="submit">Upload Your Logo!</Button>
        </form>
      </div>
    </section>
  );
};

export default DigitalHeatTransfer;
