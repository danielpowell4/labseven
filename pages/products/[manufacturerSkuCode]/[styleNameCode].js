import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Layout from "../../../components/layout";
import { getAllProducts, getProductByStyle } from "../../../lib/products";

import productStyles from "../styles/product.module.css";

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
  return {
    props: {
      productData,
    },
  };
}

const Product = ({ productData }) => {
  const activeStyle = productData.activeStyle;
  const [activeSide, setActiveSide] = React.useState();

  // on style change
  // show same clicked-to side Image if possible
  React.useEffect(() => {
    const matchingSide = activeStyle.Sides.find(side => side.Side === activeSide?.Side);
    setActiveSide(matchingSide);
  }, [activeStyle, activeSide])

  return (
    <Layout>
      <Head hideHome>
        <title>Shop our products</title>
      </Head>
      <div>
        <Link href="/products">
          <a>{`⬅ All Products`}</a>
        </Link>
      </div>
      <div className={productStyles.pageContainer}>
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
                      objectFit="cover"
                      objectPosition="center"
                      width={80}
                      height={80}
                      alt={`Sample of ${productData.Name} in ${activeStyle.Name} from side ${side.Side}`}
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
              src={activeSide.imageUrl}
              objectFit="contain"
              objectPosition="center"
              width={800}
              height={800}
              alt={`Sample of ${productData.Name} in ${activeStyle.Name} from side ${activeSide.Side}`}
            />
          ) : activeStyle.hasMainImage ? (
            <Image
              src={activeStyle.mainImageUrl}
              objectFit="contain"
              objectPosition="center"
              width={800}
              height={800}
              alt={`Sample of ${productData.Name} in ${activeStyle.Name} style`}
            />
          ) : (
            <p>Missing image!</p>
          )}
        </div>
        <div className={productStyles.details}>
          <div className={productStyles.detailsBox}>
            <div className={productStyles.title}>
              <h1>{productData.Name}</h1>
              <h3>
                {productData.Manufacturer} {productData.ManufacturerSku}
              </h3>
            </div>
            <div className="detailsBox__styles">
              <label className={productStyles.style__label}>
                Color Shown
                <span>{activeStyle.Name}</span>
              </label>
              <ul className={productStyles.style__options}>
                {productData.Styles.map((style) => (
                  <li key={style.ID}>
                    <Link
                      href={`/products/${productData.manufacturerSkuCode}/${style.nameCode}`}
                    >
                      <a
                        title={style.Name}
                        className={`${productStyles.styleOption}${
                          style.ID == activeStyle.ID
                            ? ` ${productStyles.styleOptionActive}`
                            : ""
                        }`}
                      >
                        <div
                          className={productStyles.styleOption__color}
                          style={{
                            backgroundColor: `#${style.HtmlColor1}`,
                          }}
                        />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr />
          <div className={productStyles.detailsBox}>
            <h3>Pricing</h3>
            <pre>TODO: add instant calculator</pre>
            <p>{`$ ${productData.UnitPrice.toFixed(2)}`} / shirt</p>
            <p>{`$ ${(productData.UnitPrice * 100).toFixed(0)}`} total</p>
          </div>
          <hr />
          <div className={productStyles.detailsBox}>
            <h3>Options</h3>
            <ul className={productStyles.detailsList}>
              <li>{productData.CanScreenPrint ? `✅` : `⚪️`} Screen Print</li>
              <li>
                {productData.CanDigitalPrint ? `✅` : `⚪️`} Digital Print
              </li>
              <li>{productData.CanPrint ? `✅` : `⚪️`} Print</li>
              <li>{productData.CanEmbroider ? `✅` : `⚪️`} Embroider</li>
              <li>{productData.BuyBlank ? `✅` : `⚪️`} Buy Blank</li>
            </ul>
          </div>
          <hr />
          {!!productData.Keywords?.length && (
            <div className={productStyles.detailsBox}>
              <h3>Keywords</h3>
              {productData.Keywords.join(", ")}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
