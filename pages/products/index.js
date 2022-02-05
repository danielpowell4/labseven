import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

import { stringify } from "querystring";

import {
  Layout,
  ProductList,
  CategoryMenu,
  ErrorAlert,
} from "../../components";
import { getAllProductCategories, getAllProducts } from "../../lib/products";
import { paginate } from "../../lib/utils";

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

const Products = ({
  productData: serverProductData,
  pagination: serverPagination,
  allProductCategoryData,
}) => {
  const { query } = useRouter();
  const { data, error } = useSWR("/api/products?" + stringify(query), fetcher);
  const productData = data?.products || serverProductData;
  const pagination = data?.pagination || serverPagination;
  const isLoading = !error && !data;

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
              products={productData}
              isLoading={isLoading}
              pagination={pagination}
            />
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Products;
