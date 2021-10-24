import * as React from "react";
import Head from "next/head";

import { Layout, CategoryMenu, ProductList } from "../../components";
import {
  getAllProductCategories,
  getProductCategory,
  getAllProducts,
  sortProducts,
} from "../../lib/products";

import productsStyles from "./styles/products.module.css";

export async function getStaticPaths() {
  const allCategories = await getAllProductCategories();
  const paths = [];

  for (const category of allCategories) {
    paths.push({
      params: {
        productCategoryCode: category.code,
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allProductCategoryData = await getAllProductCategories(); // for menu
  const categoryData = await getProductCategory(params.productCategoryCode);
  const allProducts = await getAllProducts();
  // filter matches
  const categoryProductData = allProducts
    .filter((product) =>
      product.Categories.some((cat) => cat.ID === categoryData.ID)
    )
    .sort(sortProducts);

  return {
    props: {
      categoryData,
      categoryProductData,
      allProductCategoryData,
    },
  };
}

const Category = ({ categoryProductData, allProductCategoryData }) => {
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
          <ProductList products={categoryProductData} />
        </main>
      </div>
    </Layout>
  );
};

export default Category;
