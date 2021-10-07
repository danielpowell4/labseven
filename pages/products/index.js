import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import { getAllProducts } from "../../lib/products";

import utilStyles from "../../styles/utils.module.css";
import productsStyles from "./styles/products.module.css";

export async function getStaticProps() {
  const allProductData = await getAllProducts();
  return {
    props: {
      allProductData,
    },
  };
}

const Products = ({ allProductData }) => {
  const productsWithCats = allProductData
    .filter((product) => !!product.Categories.length)
    .sort((a, b) => {
      const supplierCompare = a.Supplier.localeCompare(b.Supplier);
      if (supplierCompare !== 0) return supplierCompare;

      const manufacturerCompare = a.Manufacturer.localeCompare(b.Manufacturer);
      if (manufacturerCompare !== 0) return manufacturerCompare;

      return a.ManufacturerSku.localeCompare(b.ManufacturerSku);
    });
  const productsWithoutCats = allProductData
    .filter((product) => !product.Categories.length)
    .sort((a, b) => {
      const supplierCompare = a.Supplier.localeCompare(b.Supplier);
      if (supplierCompare !== 0) return supplierCompare;

      const manufacturerCompare = a.Manufacturer.localeCompare(b.Manufacturer);
      if (manufacturerCompare !== 0) return manufacturerCompare;

      return a.ManufacturerSku.localeCompare(b.ManufacturerSku);
    });

  return (
    <Layout hideHome>
      <Head>
        <title>Shop our products</title>
      </Head>
      <aside>
        <h3>Apparel</h3>
      </aside>
      <main>
        <h1>Shop our products</h1>
        <details className={productsStyles.details}>
          <summary>products WITH categories {productsWithCats.length}</summary>
          <div>
            <table className={utilStyles.table}>
              <thead>
                <tr>
                  <th style={{ width: 320 }}>Product Name</th>
                  <th>Supplier</th>
                  <th>Manufacturer + Sku</th>
                  <th>Categories</th>
                  <th>UnitPrice</th>
                  <th>Styles</th>
                </tr>
              </thead>
              <tbody>
                {productsWithCats.map((product) => (
                  <tr key={product.ID}>
                    <td>{product.Name}</td>
                    <td>{product.Supplier}</td>
                    <td>
                      {product.Manufacturer}
                      <br />
                      {product.ManufacturerSku}
                    </td>
                    <td>
                      <ul>
                        {product.Categories.map((cat) => (
                          <li key={cat.ID}>
                            {cat.Name} ({cat.ID})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{product.UnitPrice}</td>
                    <td>
                      <ul>
                        {product.Styles.map((style) => (
                          <li key={style.id}>
                            <Link
                              href={`/products/${product.manufacturerSkuCode}/${style.nameCode}`}
                            >
                              <a>{style.Name}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <details className={productsStyles.details}>
          <summary>
            products without categories {productsWithoutCats.length}
          </summary>
          <div>
            <table className={utilStyles.table}>
              <thead>
                <tr>
                  <th style={{ width: 320 }}>Product Name</th>
                  <th>Supplier</th>
                  <th>Manufacturer + Sku</th>
                  <th>Categories</th>
                  <th>UnitPrice</th>
                  <th>Styles</th>
                </tr>
              </thead>
              <tbody>
                {productsWithoutCats.map((product) => (
                  <tr key={product.ID}>

                    <td>{product.Name}</td>
                    <td>{product.Supplier}</td>
                    <td>
                      {product.Manufacturer}
                      <br />
                      {product.ManufacturerSku}
                    </td>
                    <td>
                      Not added in InkSoft
                    </td>
                    <td>{product.UnitPrice}</td>
                    <td>
                      <ul>
                        {product.Styles.map((style) => (
                          <li key={style.id}>
                            <Link
                              href={`/products/${product.manufacturerSkuCode}/${style.nameCode}`}
                            >
                              <a>{style.Name}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <details className={productsStyles.details}>
          <summary>
            raw products: {JSON.stringify(allProductData.length, null, 2)}
          </summary>
          <pre>allProductData: {JSON.stringify(allProductData, null, 2)}</pre>
        </details>
      </main>
    </Layout>
  );
};

export default Products;
