import Image from "next/image";
import Link from "next/link";
import { ColorOption } from ".";

import styles from "./ProductList.module.css";

const ProductCard = ({ product }) => {
  const activeStyle = product.Styles[0];
  const showMoreStyles = product.Styles.length > 7;

  return (
    <Link href={product.defaultHref}>
      <a className={styles.ProductCard}>
        <div className={styles.ProductCard__frame} />
        <div className={styles.ProductCard__description}>
          {activeStyle.hasMainImage ? (
            <Image
              src={activeStyle.mainImageUrl}
              objectFit="contain"
              objectPosition="center"
              width={290}
              height={320}
              alt={`Sample of ${product.Name} in ${activeStyle.Name} style`}
            />
          ) : (
            <p>Missing image!</p>
          )}
          <div>
            <h4>
              {product.Manufacturer} <br />
              {product.ManufacturerSku}
            </h4>
            <p>{product.Name}</p>
            <p className={styles.ProductCard__extraDetail}>
              {`$${product.UnitPrice.toFixed(2)}`} |{" "}
              {product.Styles.length > 1
                ? `${product.Styles.length} Colors`
                : "1 Color"}
            </p>
            {product.Styles.length > 1 && (
              <ul
                className={`${styles.colorOptions} ${
                  showMoreStyles ? styles.colorOptions__ShowMore : ""
                }`}
              >
                {product.Styles.map((style, styleIndex) => {
                  if (styleIndex > 6) return null;

                  return (
                    <ColorOption
                      key={styleIndex}
                      style={style}
                      isActive={styleIndex === 0}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

const ProductList = ({ products }) => {
  return (
    <div className={styles.ProductList}>
      {products.map((product) => (
        <ProductCard key={product.ID} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
