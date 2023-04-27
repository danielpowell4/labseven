import * as React from "react";
import Head from "next/head";
import { getAllProducts } from "../lib/products";
import { Layout } from "../components";

export async function getStaticProps() {
  const allProducts = await getAllProducts();
  const productIdsBySize = {};

  for (const product of allProducts) {
    for (const style of product.Styles) {
      for (const size of style.Sizes || []) {
        const sizeName = size.Name;
        const sizeProductSet = productIdsBySize[sizeName] || new Set();
        sizeProductSet.add(product.ID);
        productIdsBySize[sizeName] = sizeProductSet;
      }
    }
  }

  const sizeMap = {};
  Object.entries(productIdsBySize).forEach(([sizeName, sizeProductSet]) => {
    sizeMap[sizeName] = sizeProductSet.size;
  });

  return {
    props: {
      sizeMap,
    },
  };
}

const SizeAudit = ({ sizeMap }) => {
  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ maxWidth: 660, margin: "2rem auto" }}>
        <h1>Size Audit</h1>
        <p>
          This page lists the {Object.keys(sizeMap).length} sizes in the system.
        </p>
        <table style={{ textAlign: "right", minWidth: 300 }}>
          <thead>
            <tr>
              <th>Size Name</th>
              <th>Product Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(sizeMap).map(([sizeName, count]) => (
              <tr key={sizeName}>
                <td>{sizeName}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default SizeAudit;
