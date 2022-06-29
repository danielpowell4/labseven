import * as React from "react";
import Head from "next/head";

import {
  Layout,
  CategoryMenu,
  ProductList,
  ProductsCalculator,
  SearchBar,
  ToggleMenu,
} from "../../../components";
import {
  getAllProductCategories,
  getProductCategory,
  getAllProducts,
} from "../../../lib/products";
import { paginate } from "../../../lib/utils";
import { usePaginatedProducts, useQuotes } from "../../../lib/customHooks";

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
  const categoryProductData = allProducts.filter((product) =>
    categoryData.ItemIds.includes(product.ID)
  );
  const [productData, pagination] = paginate(categoryProductData, 1, 15);

  return {
    props: {
      categoryData,
      allProductCategoryData,
      productData,
      pagination,
    },
  };
}

const Category = ({
  productData,
  pagination,
  categoryData,
  allProductCategoryData,
}) => {
  const { data, error, isLoading, setQuote, query, setQuery } =
    usePaginatedProducts(productData, pagination);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Layout>
      <Head>
        <title>Shop our products</title>
      </Head>
      <div className={productsStyles.grid}>
        <aside
          className={`${productsStyles.grid__aside} ${
            isMenuOpen ? productsStyles.grid__asideIsOpen : ""
          }`}
        >
          <ToggleMenu
            className={productsStyles.menuButton}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
          <CategoryMenu
            categories={allProductCategoryData}
            activeCategory={categoryData}
          />
          <ProductsCalculator
            className={productsStyles.ProductsCalculator}
            products={data.products}
            setQuote={setQuote}
            isLoading={isLoading}
          />
        </aside>
        <main className={productsStyles.grid__main}>
          <SearchBar query={query} setQuery={setQuery} />
          <ProductList
            products={data.products}
            pagination={data.pagination}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </Layout>
  );
};

export default Category;
