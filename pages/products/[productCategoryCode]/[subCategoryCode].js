import * as React from "react";
import Head from "next/head";

import {
  Layout,
  CategoryMenu,
  ProductsCalculator,
  ProductList,
  SearchBar,
  ToggleMenu,
} from "../../../components";
import {
  getAllProductCategories,
  getProductCategory,
  getAllProducts,
} from "../../../lib/products";
import { paginate } from "../../../lib/utils";
import { usePaginatedProducts } from "../../../lib/customHooks";

import productsStyles from "../styles/products.module.css";

export async function getStaticPaths() {
  const allCategories = await getAllProductCategories();
  const paths = [];

  for (const category of allCategories) {
    for (const subcategory of category.SubCategories) {
      paths.push({
        params: {
          productCategoryCode: category.code,
          subCategoryCode: subcategory.code,
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
  const allProductCategoryData = await getAllProductCategories(); // for menu
  const categoryData = await getProductCategory(params.productCategoryCode);
  const subcategoryData = categoryData.SubCategories.find(
    (sub) => sub.code == params.subCategoryCode
  );
  const allProducts = await getAllProducts();
  // filter matches
  const categoryProductData = allProducts.filter((product) =>
    subcategoryData.ItemIds.includes(product.ID)
  );
  const [productData, pagination] = paginate(categoryProductData, 1, 16);

  return {
    props: {
      categoryData,
      subcategoryData,
      allProductCategoryData,
      fallbackData: { products: productData, pagination },
    },
  };
}

const SubCategory = ({
  categoryData,
  subcategoryData,
  allProductCategoryData,
  fallbackData,
}) => {
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
          <CategoryMenu
            categories={allProductCategoryData}
            activeCategory={categoryData}
            activeSubCategory={subcategoryData}
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

export default SubCategory;
