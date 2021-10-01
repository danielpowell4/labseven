import Head from "next/head";
import Link from "next/link";

import Layout from "../../../components/layout";
import { getAllProducts, getProductByStyle } from "../../../lib/products";

import utilStyles from "../../../styles/utils.module.css";
import productsStyles from "../styles/products.module.css";

export async function getStaticPaths() {
  const allProducts = await getAllProducts();
  const paths = [];

  for (const product of allProducts) {
    for (const style of product.Styles) {
      paths.push(
        {
          params: {
            manufacturerSkuCode: product.manufacturerSkuCode,
            styleNameCode: style.nameCode
          },
        }
      )
    }
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const productData = await getProductByStyle(params.manufacturerSkuCode, params.styleNameCode);
  return {
    props: {
      productData,
    },
  };
}

const Product = ({ productData }) => {
  const activeStyle = productData.activeStyle;

  return (
    <Layout>
      <Head>
        <title>Shop our products</title>
      </Head>
      <div>
        <Link href="/products">
          <a>View All Products</a>
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <strong>ID</strong> {productData.ID}
          </li>
          <li>
            <strong>Name</strong> {productData.Name}
          </li>
          <li>
            <strong>Supplier</strong> {productData.Supplier}
          </li>
          <li>
            <strong>Manufacturer</strong>
            <span>
              {productData.Manufacturer}-{productData.ManufacturerSku}
            </span>
          </li>
          <li>
            <strong>Categories</strong>
            <ul>
              {productData.Categories.map((cat) => (
                <li key={cat.ID}>
                  {cat.Name} ({cat.ID})
                </li>
              ))}
            </ul>
          </li>
          <li>
            <strong>UnitPrice</strong>
            {productData.UnitPrice}
          </li>
          <li>
            <strong>Styles</strong>
            <ul style={{ display: "flex", flexFlow: "row wrap", gap: "1rem" }}>
              {productData.Styles.map((style) => (
                <li key={style.ID}>
                  <Link href={`/products/${productData.manufacturerSkuCode}/${style.nameCode}`}>
                    <a>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: `#${style.HtmlColor1}`,
                        }}
                      />
                      {style.Name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <hr />
        <div>
          <h2>{activeStyle.Name}</h2>
          <div className="gallery" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "2rem" }}>
            {activeStyle.hasMainImage ? <img src={activeStyle.mainImageUrl} alt={`Sample of ${productData.Name} in ${activeStyle.Name} style`} />: <p>Missing image!</p>}
            <div>
              <h4>Sides</h4>
              <ul>
                {activeStyle.Sides.map((side, sideIndex) => (
                  <li key={sideIndex}>
                    {side.Side}
                    {side.hasImage ? <img src={side.imageUrl} width={200} height="auto" alt={`Sample of ${productData.Name} in ${activeStyle.Name} from side ${side.Side}`} />: <p>Missing image</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <details className={productsStyles.details}>
            <summary>View full activeStyle</summary>
            <pre>{JSON.stringify(activeStyle, null, 2)}</pre>
          </details>
        </div>
        <hr />
        <details className={productsStyles.details}>
          <summary>View full productData</summary>
          <pre>{JSON.stringify(productData, null, 2)}</pre>
        </details>
      </div>
    </Layout>
  );
};

export default Product;
