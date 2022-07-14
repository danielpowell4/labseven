import * as React from "react";
import Head from "next/head";
import { getAllProducts } from "../lib/products";
import { Layout } from "../components";

const QUOTE_DECORATIONS = ["CanScreenPrint", "CanDigitalPrint", "CanPrint"];

export async function getStaticProps() {
  const allProducts = await getAllProducts();
  const missingDecorations = allProducts.filter(
    (product) => !QUOTE_DECORATIONS.some((decoration) => product[decoration])
  );

  return {
    props: {
      missingDecorations,
    },
  };
}

const QuoteAudit = ({ missingDecorations }) => {
  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>Quote Audit</h1>
      <p>
        This page lists the {missingDecorations.length} products that have each
        of the following set to false:
      </p>
      <ul>
        {QUOTE_DECORATIONS.map((decoration) => (
          <li key={decoration}>{decoration}</li>
        ))}
      </ul>
      <table>
        <tbody>
          {missingDecorations.map((product) => (
            <tr key={product.ID}>
              <td>{product.manufacturerSkuCode}</td>
              <td>{product.defaultHref}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default QuoteAudit;
