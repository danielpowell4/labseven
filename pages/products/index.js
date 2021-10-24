import Head from "next/head";
import Link from "next/link";
import { Layout, ProductList } from "../../components";
import { getAllProductCategories, getAllProducts } from "../../lib/products";

import productsStyles from "./styles/products.module.css";

export async function getStaticProps() {
  const allProducts = await getAllProducts();
  // Hide products without categories!
  const allProductData = allProducts
    .filter((product) => !!product.Categories.length)
    .sort((a, b) => {
      const supplierCompare = a.Supplier.localeCompare(b.Supplier);
      if (supplierCompare !== 0) return supplierCompare;

      const manufacturerCompare = a.Manufacturer.localeCompare(b.Manufacturer);
      if (manufacturerCompare !== 0) return manufacturerCompare;

      return a.ManufacturerSku.localeCompare(b.ManufacturerSku);
    });
  const allProductCategories = await getAllProductCategories();

  return {
    props: {
      allProductData,
      allProductCategories,
    },
  };
}

const Products = ({ allProductData, allProductCategories }) => {
  return (
    <Layout>
      <Head>
        <title>Shop our products</title>
      </Head>
      <div className={productsStyles.searchContainer}>
        <aside className={productsStyles.searchContainer__aside}>
          <h1>Apparel</h1>
          <nav>
            <ul className={productsStyles.categoriesList}>
              {allProductCategories.map((category) => (
                <li
                  key={category.ID}
                  className={productsStyles.categoriesList__option}
                >
                  <Link href={category.href}>
                    <a>{category.Name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className={productsStyles.searchContainer__main}>
          <ProductList products={allProductData} />
        </main>
      </div>
    </Layout>
  );
};

export default Products;
