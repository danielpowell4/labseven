import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { ColorOption, Layout } from "../../../components";
import {
  getAllProducts,
  getProductByStyle,
  getProductCategory,
} from "../../../lib/products";

import productStyles from "./product.module.css";
import { ProductCalculator } from "../../../components";

export async function getStaticPaths() {
  const allProducts = await getAllProducts();
  const paths = [];

  for (const product of allProducts) {
    for (const style of product.Styles) {
      paths.push({
        params: {
          manufacturerSkuCode: product.manufacturerSkuCode,
          styleNameCode: style.nameCode,
        },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const productData = await getProductByStyle(
    params.manufacturerSkuCode,
    params.styleNameCode
  );
  const category =
    productData.Categories.find((cat) => !!cat.subCategoryCode) ||
    productData.Categories[0];
  let categoryData,
    subcategoryData = null;

  if (category) {
    categoryData = (await getProductCategory(category.code)) || null;
    if (categoryData) {
      subcategoryData =
        categoryData.SubCategories.find(
          (sub) => sub.code == category.subCategoryCode
        ) || null;
    }
  }

  return {
    props: {
      productData,
      categoryData,
      subcategoryData,
    },
  };
}

const Product = ({ productData, categoryData, subcategoryData }) => {
  const activeStyle = productData.activeStyle;
  const [activeSide, setActiveSide] = React.useState();

  // on style change
  // show same clicked-to side Image if possible
  React.useEffect(() => {
    const matchingSide = activeStyle.Sides.find(
      (side) => side.Side === activeSide?.Side
    );
    setActiveSide(matchingSide);
  }, [activeStyle, activeSide]);

  const pageTitle = `${productData.Manufacturer} - ${productData.ManufacturerSku} // ${activeStyle.Name}`;
  const pageDescription =
    productData.LongDescription ||
    `Design your own ${productData.Name} (${productData.Manufacturer} ${productData.ManufacturerSku}) in ${activeStyle.Name} with help from Lab Seven`;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="og:title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="og:description" content={pageDescription} />
        {!!activeStyle.mainImageUrl && (
          <meta property="og:image" content={activeStyle.mainImageUrl} />
        )}
        {!!productData.defaultHref && (
          <link rel="canonical" href={productData.defaultHref} />
        )}
        {productData.Keywords && (
          <meta name="keywords" content={productData.Keywords.join(", ")} />
        )}
      </Head>
      <div className={productStyles.breadcrumbs}>
        <Link href="/products">Products</Link>
        {!!categoryData && (
          <Link href={categoryData.href}>{categoryData.Name}</Link>
        )}
        {!!subcategoryData && (
          <Link href={subcategoryData.href}>{subcategoryData.Name}</Link>
        )}
      </div>
      <div className={productStyles.pageContainer}>
        <div className={productStyles.title}>
          <h1>{productData.Name}</h1>
          <h3>
            {productData.Manufacturer}{" "}
            <span className="highlight caps">
              {productData.ManufacturerSku}
            </span>
          </h3>
        </div>
        <div className={productStyles.gallery}>
          <ul className={productStyles.gallery__sides}>
            {activeStyle.Sides.map((side, sideIndex) => (
              <li
                key={sideIndex}
                className={productStyles.gallery__sides__item}
              >
                {side.hasImage ? (
                  <button onClick={() => setActiveSide(side)}>
                    <Image
                      src={side.imageUrl}
                      width={80}
                      height={80}
                      alt={`Sample of ${productData.Name} in ${activeStyle.Name} from side ${side.Side}`}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </button>
                ) : (
                  <p>Missing image for {side.Side}</p>
                )}
              </li>
            ))}
          </ul>
          {!!activeSide ? (
            <Image
              className={productStyles.gallery__main}
              src={activeSide.imageUrl}
              width={800}
              height={800}
              alt={`Sample of ${productData.Name} in ${activeStyle.Name} from side ${activeSide.Side}`}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          ) : activeStyle.hasMainImage ? (
            <Image
              priority
              className={productStyles.gallery__main}
              src={activeStyle.mainImageUrl}
              width={800}
              height={800}
              alt={`Sample of ${productData.Name} in ${activeStyle.Name} style`}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          ) : (
            <p className={productStyles.gallery__main}>Missing image!</p>
          )}
        </div>
        <div className={productStyles.details}>
          <div className={productStyles.detailsBox}>
            <div className="detailsBox__styles">
              <label className={productStyles.style__label}>
                Color Shown
                <span>{activeStyle.Name}</span>
              </label>
              <ul className={productStyles.colorOptions}>
                {productData.Styles.map((style) => (
                  <ColorOption
                    key={style.ID}
                    style={style}
                    isActive={style.ID == activeStyle.ID}
                    replace
                  />
                ))}
              </ul>
            </div>
          </div>
          <hr />
          <div className={productStyles.detailsBox}>
            <ProductCalculator productData={productData} />
          </div>
          {!!productData.LongDescription && (
            <>
              <hr />
              <div className={productStyles.detailsBox}>
                <h3>Product Information</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: productData.LongDescription,
                  }}
                ></p>
              </div>
            </>
          )}
          {process.env.NODE_ENV === "development" && (
            <>
              <hr />
              <details>
                <pre>{JSON.stringify(productData, null, 2)}</pre>
              </details>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
