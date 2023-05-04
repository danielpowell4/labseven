import Image from "next/image";

import { LinkButton } from "components";

import Banner from "public/assets/Services/Embroidery_Banner.jpg";
import NIKE_Banner from "public/assets/Services/Embroidery_NIKE_Banner.jpg";

import DetailEmbroidery from "public/assets/Services/Embroidery_01_DetailEmbroidery.jpg";
import PuffEmbroidery from "public/assets/Services/Embroidery_02_PuffEmbroidery.jpg";

import Carhartt from "public/assets/Services/Embroidery_Logo01_Carhartt.svg";
import Nike from "public/assets/Services/Embroidery_Logo02_Nike.svg";
import UnderArmour from "public/assets/Services/Embroidery_Logo03_UnderArmour.svg";
import Adidas from "public/assets/Services/Embroidery_Logo04_Adidas.svg";

import styles from "./Services.module.css";

const Embroidery = () => {
  return (
    <section id="Embroidery" className={styles.serviceSection}>
      <div className={styles.bannerContainer}>
        <Image
          src={Banner}
          alt="Exquisite hats embroidered with vibrant colors and an intricate Colorado flag design"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 1200px) 50vw, 100vw"
        />
      </div>
      <div className={styles.sideBySide}>
        <div className={styles.productDisplay}>Image 2 + 3</div>
        <div className={styles.content}>
          <h2 className={styles.serviceHeading}>Embroidery</h2>
          <p>
            {`What does your outfit say about your business? Custom embroidery from
          Lab Seven is the best way to spruce up your company uniforms or
          merchandise. With professional digitizing, accurate color matching,
          and precision stitching, this tried-and-true approach lets the world
          know you mean business! We recommend embroidery on `}
            <strong>{`polos, headwear,
          performance gear, outerwear`}</strong>
            {`, and `}
            <strong>{`backpacks.`}</strong>
          </p>
          <LinkButton href="/products" className="LinkButtonAlternate">
            Browse Catalog
          </LinkButton>
        </div>
      </div>
      <div>
        <h3
          className={styles.serviceHeading}
          style={{ textAlign: "center", marginBottom: 0 }}
        >
          Now stocking the latest styles from:
        </h3>
        <ul className={styles.logoList}>
          {[
            { brand: "Carhartt", src: Carhartt, height: 68 },
            { brand: "Nike", src: Nike, height: 42 },
            { brand: "UnderArmour", src: UnderArmour, height: 62 },
            { brand: "Adidas", src: Adidas, height: 72 },
          ].map(({ brand, src, height }, imageIndex) => (
            <li key={imageIndex} className={styles.logoList__brand}>
              <Image src={src} alt={`Logo for ${brand}`} height={height} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.bannerContainer}>
        <Image
          src={NIKE_Banner}
          alt="Athlete models for Nike sporting rad technical apparel"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 1200px) 50vw, 100vw"
        />
      </div>
    </section>
  );
};

export default Embroidery;
