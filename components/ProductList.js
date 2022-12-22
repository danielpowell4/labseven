import Image from "next/legacy/image";
import Link from "next/link";
import { ColorOption, ErrorAlert, Pagination, ThreeDotLoader } from ".";

import styles from "./ProductList.module.css";

const LOADING_ADJECTIVES = [
  "Awesome",
  "Beautiful",
  "Creative",
  "Delightful",
  "Exciting",
  "Favorite",
  "Glorious",
  "Honest",
  "Incredible",
  "Juicy",
  "Killer",
  "Legit",
  "Majestic",
  "Novel",
  "Optimal",
  "Prized",
  "Quality",
  "Rad",
  "Stunning",
  "Tantalizing",
  "Upbeat",
  "Valiant",
  "Worthwhile",
  "Yummy",
  "Zesty",
];
const ProductSkeleton = ({ productIndex }) => {
  const randomAdjective = LOADING_ADJECTIVES[productIndex];

  return (
    <div className={styles.ProductCard}>
      <div className={styles.ProductCard__frame} />
      <div className={styles.ProductCard__description}>
        <div className={styles.ProductSkeleton__image} />
        <div>
          <h4>
            {randomAdjective}
            <br />
            Product
          </h4>
          <p>Loading...</p>
          <ul className={styles.colorOptions} />
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, productIndex }) => {
  if (product.isLoading) return <ProductSkeleton productIndex={productIndex} />;

  const activeStyle = product.Styles[0];
  const showMoreStyles = product.Styles.length > 7;

  return (
    <Link href={product.defaultHref} className={styles.ProductCard}>
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
            <span class="caps">{product.ManufacturerSku}</span>
          </h4>
          <p>{product.Name}</p>

          {product.showPrice && (
            <p className="highlight">
              <strong>
                <span>{`$${product.UnitPrice.toFixed(2)} each`}</span>
              </strong>
            </p>
          )}

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
    </Link>
  );
};

const ProductList = ({ error, products, isLoading, pagination }) => {
  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!products.length) {
    return <p className={styles.NoContentMessage}>No matching products</p>;
  }

  return (
    <>
      <div
        className={`${styles.ProductList} ${
          isLoading ? styles.ProductListIsLoading : ""
        }`}
      >
        {products.map((product, productIndex) => (
          <ProductCard
            key={`${product.ID}-${productIndex}`}
            product={product}
            productIndex={productIndex}
          />
        ))}
      </div>
      <div className={styles.PaginationContainer}>
        <Pagination pagination={pagination} />
        {isLoading && <ThreeDotLoader />}
      </div>
    </>
  );
};

export default ProductList;
