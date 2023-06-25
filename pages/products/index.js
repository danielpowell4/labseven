import * as React from "react";
import Head from "next/head";
import {
  Layout,
  ProductList,
  ProductsCalculator,
  CategoryMenu,
  SearchBar,
  ToggleMenu,
} from "../../components";
import { getAllProductCategories, getAllProducts } from "../../lib/products";
import { paginate } from "../../lib/utils";
import { usePaginatedProducts } from "../../lib/customHooks";

import productsStyles from "./styles/products.module.css";

export async function getStaticProps() {
  const allProducts = await getAllProducts();
  const [productData, pagination] = paginate(allProducts, 1, 16);
  const allProductCategoryData = await getAllProductCategories();

  return {
    props: {
      fallbackData: { products: productData, pagination },
      allProductCategoryData,
    },
  };
}

const Products = ({ fallbackData, allProductCategoryData }) => {
  const { data, error, isLoading, setQuote, query, setQuery } =
    usePaginatedProducts(fallbackData);
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
          <CategoryMenu categories={allProductCategoryData} />
          <ProductsCalculator
            className={productsStyles.ProductsCalculator}
            products={data.products}
            setQuote={setQuote}
            isLoading={isLoading}
          />
        </aside>
        <main className={productsStyles.grid__main}>
          <SearchBar query={query} setQuery={setQuery} />
          <hr />
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

export default Products;
