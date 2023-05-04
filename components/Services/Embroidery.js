import { LinkButton } from "components";

import styles from "./Services.module.css";

const Embroidery = () => {
  return (
    <section id="Embroidery" className={styles.serviceSection}>
      <div>Header Image</div>
      <div>
        <div>Image 2 + 3</div>
        <div>
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
        <h3>Now stocking the latest styles from:</h3>
        <ul>
          <li>carhartt</li>
          <li>nike</li>
          <li>under armour</li>
          <li>addidas</li>
        </ul>
        <div>Image 4 + 5</div>
      </div>
    </section>
  );
};

export default Embroidery;
