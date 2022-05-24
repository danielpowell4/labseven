import * as React from "react";
import Head from "next/head";

import {
  Layout,
  CategoryMenu,
  ProductsCalculator,
  ProductList,
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
  const [productData, pagination] = paginate(categoryProductData, 1, 15);

  return {
    props: {
      categoryData,
      subcategoryData,
      allProductCategoryData,
      productData,
      pagination,
    },
  };
}

const SubCategory = ({
  categoryData,
  subcategoryData,
  allProductCategoryData,
  productData,
  pagination,
}) => {
  const { data, error, isLoading, setQuote } = usePaginatedProducts(
    productData,
    pagination
  );

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
            activeSubCategory={subcategoryData}
          />
          <ProductsCalculator
            products={data.products}
            setQuote={setQuote}
            isLoading={isLoading}
          />
        </aside>
        <main className={productsStyles.grid__main}>
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
