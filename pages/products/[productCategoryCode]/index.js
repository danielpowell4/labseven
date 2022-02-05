import * as React from "react";
import Head from "next/head";

import { Layout, CategoryMenu, ProductList } from "../../../components";
import {
  getAllProductCategories,
  getProductCategory,
  getAllProducts,
} from "../../../lib/products";

import productsStyles from "../styles/products.module.css";

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
    .filter((product) => categoryData.ItemIds.includes(product.ID))

  return {
    props: {
      categoryData,
      categoryProductData,
      allProductCategoryData,
    },
  };
}

const Category = ({
  categoryData,
  categoryProductData,
  allProductCategoryData,
}) => {
  return (
    <Layout>
      <Head>
        <title>Shop our products</title>
      </Head>
      <div className={productsStyles.grid}>
        <aside className={productsStyles.grid__aside}>
          <CategoryMenu
            categories={allProductCategoryData}
            activeCategory={categoryData}
          />
        </aside>
        <main className={productsStyles.grid__main}>
          <ProductList products={categoryProductData} />
        </main>
      </div>
    </Layout>
  );
};

export default Category;
