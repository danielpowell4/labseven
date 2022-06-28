import Image from "next/image";
import styles from "./SiteFooter.module.css";

const SiteFooter = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__logo}>
        <a href="//labseven.co">
          <img
            alt="Lab Seven Screen Printing Co. Logo"
            src="/assets/Lab-Seven-Logo.svg"
            height="auto"
            width={280}
          />
        </a>
        <p>
          <small>
            <i>
              Lab Seven Screen Printing Co. is the leader in Denver Screen
              Printing, Custom T-shirt Printing, Graphic Design, and Embroidery
              in Colorado.
            </i>
          </small>
        </p>
        <div className={styles.locales}>
          <Image src="/assets/Colorado-Flag.svg" height={20} width={30} />
          <Image src="/assets/USA-Flag.svg" height={20} width={30} />
        </div>
      </div>
      <div>
        <div className={styles.Footer__location}>
          <h4>
            Lab Seven at River Point <sub>HQ</sub>
          </h4>
          <p>
            <a href="https://www.google.com/maps/dir//Lab+Seven+Screen+Printing+Co./@39.6570677,-105.0729178,12z/data=!3m1!4b1!4m9!4m8!1m1!4e2!1m5!1m1!1s0x876c7fd8cd38f017:0x2856413ac04a5c4d!2m2!1d-105.0028778!2d39.6570887">
              3244 S Platte River Dr Englewood, CO, 80110
            </a>
          </p>
          <p>
            <strong>Monday - Friday</strong>: 9:00AM - 5:00PM;{" "}
            <strong>Saturday - Sunday:</strong> CLOSED
          </p>
          <p>
            Phone: <a href="tel:3038143389">(303) 814-3389</a>
          </p>
          <p>
            Email: <a href="mailto:info@labseven.co">info@labseven.co</a>
          </p>
        </div>
        <div className={styles.Footer__location}>
          <h4>Lab Seven at Lakeside</h4>
          <p>
            <a href="https://www.google.com/maps/dir//5265+W+48th+Ave,+Denver,+CO+80212/@39.7842758,-105.0562265,17z/data=!3m1!4b1!4m9!4m8!1m1!4e2!1m5!1m1!1s0x876b87966ca4b1cf:0x38c3e30d07cd49cb!2m2!1d-105.0540378!2d39.7842758">
              5265 W 48th Ave Denver, CO, 80212
            </a>
          </p>
          <p>
            <strong>Monday - Friday</strong>: 9:00AM - 5:00PM;{" "}
            <strong>Saturday - Sunday</strong>: CLOSED
          </p>
          <p>
            Phone: <a href="tel:7207086192">(720) 708-6192</a>
          </p>
          <p>
            Email: <a href="mailto:kevin@labseven.co">kevin@labseven.co</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
