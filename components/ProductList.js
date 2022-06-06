import Image from "next/image";
import Link from "next/link";
import { ColorOption, ErrorAlert, Pagination, ThreeDotLoader } from ".";

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
      </a>
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
        {products.map((product) => (
          <ProductCard key={product.ID} product={product} />
        ))}
      </div>
      <div>
        <Pagination pagination={pagination} />
        {isLoading && <ThreeDotLoader />}
      </div>
    </>
  );
};

export default ProductList;
