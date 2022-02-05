import Head from "next/head";
import { Layout, ProductList, CategoryMenu } from "../../components";
import {
  getAllProductCategories,
  getPaginatedProducts,
} from "../../lib/products";

import productsStyles from "./styles/products.module.css";

export async function getStaticProps() {
  const [productData, pagination] = await getPaginatedProducts(1);
  const allProductCategoryData = await getAllProductCategories();

  return {
    props: {
      productData,
      pagination,
      allProductCategoryData,
    },
  };
}

// export async function getServerSideProps(context) {
//   const productData = await getPaginatedProducts(
//     context.query.page,
//     context.query.perPage
//   );
//   const allProductCategoryData = await getAllProductCategories();

//   return {
//     props: {
//       productData,
//       allProductCategoryData,
//     },
//   };
// }

const Products = ({ productData, pagination, allProductCategoryData }) => {
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
          <ProductList products={productData} pagination={pagination} />
        </main>
      </div>
    </Layout>
  );
};

export default Products;
