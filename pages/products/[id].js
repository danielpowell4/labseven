import Head from "next/head";
import Link from "next/link";

import Layout from "../../components/layout";
import { getAllProducts, getProduct } from "../../lib/products";

import utilStyles from "../../styles/utils.module.css";
import productsStyles from "./styles/products.module.css";

export async function getStaticPaths() {
  const allProducts = await getAllProducts();
  const paths = allProducts.map((product) => ({
    params: { id: product.ID.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const productData = await getProduct(params.id);
  return {
    props: {
      productData,
    },
  };
}

const Product = ({ productData }) => {
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
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: `#${style.HtmlColor1}`,
                    }}
                  />
                  {style.Name}
                </li>
              ))}
            </ul>
          </li>
        </ul>
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
