import Head from "next/head";
import {
  Layout,
  ProductList,
  ProductsCalculator,
  CategoryMenu,
} from "../../components";
import { getAllProductCategories, getAllProducts } from "../../lib/products";
import { paginate } from "../../lib/utils";
import { usePaginatedProducts } from "../../lib/customHooks";

import productsStyles from "./styles/products.module.css";

export async function getStaticProps() {
  const allProducts = await getAllProducts();
  const [productData, pagination] = paginate(allProducts, 1, 15);
  const allProductCategoryData = await getAllProductCategories();

  return {
    props: {
      productData,
      pagination,
      allProductCategoryData,
    },
  };
}

const Products = ({ productData, pagination, allProductCategoryData }) => {
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
          <CategoryMenu categories={allProductCategoryData} />
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

export default Products;
