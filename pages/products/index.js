import Head from "next/head";
import { Layout, ProductList, CategoryMenu } from "../../components";
import {
  getAllProductCategories,
  getAllProducts,
} from "../../lib/products";

import productsStyles from "./styles/products.module.css";

export async function getStaticProps() {
  const allProductData = await getAllProducts();
  const allProductCategoryData = await getAllProductCategories();

  return {
    props: {
      allProductData,
      allProductCategoryData,
    },
  };
}

const Products = ({ allProductData, allProductCategoryData }) => {
  return (
    <Layout>
      <Head>
        <title>Shop our products</title>
      </Head>
      <div className={productsStyles.searchContainer}>
        <aside className={productsStyles.searchContainer__aside}>
          <h1>Apparel</h1>
          <CategoryMenu categories={allProductCategoryData} />
        </aside>
        <main className={productsStyles.searchContainer__main}>
          <ProductList products={allProductData} />
        </main>
      </div>
    </Layout>
  );
};

export default Products;
