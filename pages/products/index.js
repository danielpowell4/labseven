import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ColorOptions, Layout } from "../../components";
import { getAllProducts } from "../../lib/products";

import productsStyles from "./styles/products.module.css";

export async function getStaticProps() {
  const allProducts = await getAllProducts();
  // Hide products without categories!
  const allProductData = allProducts.filter((product) => !!product.Categories.length)
    .sort((a, b) => {
      const supplierCompare = a.Supplier.localeCompare(b.Supplier);
      if (supplierCompare !== 0) return supplierCompare;

      const manufacturerCompare = a.Manufacturer.localeCompare(b.Manufacturer);
      if (manufacturerCompare !== 0) return manufacturerCompare;

      return a.ManufacturerSku.localeCompare(b.ManufacturerSku);
    });

  return {
    props: {
      allProductData,
    },
  };
}

const ProductCard = ({ product }) => {
  const activeStyle = product.Styles[0];

  return <li className={productsStyles.ProductCard}>
    <Link href={product.defaultHref}>
      <a>
        { activeStyle.hasMainImage ? (
                <Image
                  src={activeStyle.mainImageUrl}
                  objectFit="contain"
                  objectPosition="center"
                  width={380}
                  height={410}
                  alt={`Sample of ${product.Name} in ${activeStyle.Name} style`}
                />
              ) : (
                <p>Missing image!</p>
              )}
        <h4>{product.Manufacturer} {product.ManufacturerSku}</h4>
        <p>{product.Name}</p>
        <p>{`$${product.UnitPrice.toFixed(2)}`} | {product.Styles.length > 1 ? `${product.Styles.length} Colors` : "1 Color"}</p>
        {product.Styles.length > 1 && <ColorOptions Styles={product.Styles} activeStyle={activeStyle} />}
      </a>
      </Link>
  </li>
}

const Products = ({ allProductData }) => {
  return (
    <Layout>
      <Head>
        <title>Shop our products</title>
      </Head>
      <div className={productsStyles.searchContainer}>
        <aside className={productsStyles.searchContainer__aside}>
          <h3>Apparel</h3>
          <pre>TODO: add filters</pre>
        </aside>
        <main className={productsStyles.searchContainer__main}>
          <h1>Shop our products</h1>
          <ul className={productsStyles.ProductList}>
            {allProductData.map((product) => (
              <ProductCard key={product.ID} product={product} />
            ))}
          </ul>
        </main>
      </div>
    </Layout>
  );
};

export default Products;
