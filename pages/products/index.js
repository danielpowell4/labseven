import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ColorOption, Layout } from "../../components";
import { getAllProducts } from "../../lib/products";

import productsStyles from "./styles/products.module.css";

export async function getStaticProps() {
  const allProducts = await getAllProducts();
  // Hide products without categories!
  const allProductData = allProducts
    .filter((product) => !!product.Categories.length)
    .sort((a, b) => {
      const supplierCompare = a.Supplier.localeCompare(b.Supplier);
      if (supplierCompare !== 0) return supplierCompare;

      const manufacturerCompare = a.Manufacturer.localeCompare(b.Manufacturer);
      if (manufacturerCompare !== 0) return manufacturerCompare;

      return a.ManufacturerSku.localeCompare(b.ManufacturerSku);
    });

  return {
    props: {
      allProductData,
    },
  };
}

const ProductCard = ({ product }) => {
  const activeStyle = product.Styles[0];
  const showMoreStyles = product.Styles.length > 7;

  return (
    <Link href={product.defaultHref}>
      <a className={productsStyles.ProductCard}>
        <div className={productsStyles.ProductCard__frame} />
        <div className={productsStyles.ProductCard__description}>
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
            <p className={productsStyles.ProductCard__extraDetail}>
              {`$${product.UnitPrice.toFixed(2)}`} |{" "}
              {product.Styles.length > 1
                ? `${product.Styles.length} Colors`
                : "1 Color"}
            </p>
            {product.Styles.length > 1 && (
              <ul
                className={`${productsStyles.colorOptions} ${
                  showMoreStyles ? productsStyles.colorOptions__ShowMore : ""
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

const Products = ({ allProductData }) => {
  return (
    <Layout>
      <Head>
        <title>Shop our products</title>
      </Head>
      <div className={productsStyles.searchContainer}>
        <aside className={productsStyles.searchContainer__aside}>
          <h1>Apparel</h1>
          <pre>TODO: add filters</pre>
        </aside>
        <main className={productsStyles.searchContainer__main}>
          <div className={productsStyles.ProductList}>
            {allProductData.map((product) => (
              <ProductCard key={product.ID} product={product} />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Products;
