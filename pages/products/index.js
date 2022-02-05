import Head from "next/head";
import {
  Layout,
  ProductList,
  CategoryMenu,
  ErrorAlert,
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
  const { data, error, isLoading } = usePaginatedProducts(
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
          <h1>Apparel</h1>
          <CategoryMenu categories={allProductCategoryData} />
        </aside>
        <main className={productsStyles.grid__main}>
          {!!error ? (
            <ErrorAlert error={error} />
          ) : (
            <ProductList
              products={data.products}
              pagination={data.pagination}
              isLoading={isLoading}
            />
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Products;
