import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "../../components";

import styles from "./Home.module.css";

const ACTION_VERBS = [
  "Wear",
  "Share",
  "Put on",
  "Sell",
  "Wear",
  "Share",
  "Wear",
];

const HomePage = () => {
  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles.hero}>
        <div className={styles.hero__text}>
          <h1>
            <div className={styles.verbsContainer}>
              <div className={styles.verbsContainer__reel}>
                {ACTION_VERBS.map((verb) => (
                  <div key={verb} className={styles.verbsContainer__reel__item}>
                    {verb}
                  </div>
                ))}
              </div>
              <span>your brand with pride</span>
            </div>
          </h1>
          <h2>
            Get Custom Printed Apparel Affordably. Backed by a Local Team You
            Can Trust.
          </h2>
          <div className={styles.linkContainer}>
            <Link href="/products">
              <a className={styles.LinkButton}>Browse Catalog</a>
            </Link>
            <Link href="/contact">
              <a className={styles.LinkButtonAlternate}>Contact Printing Pro</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
