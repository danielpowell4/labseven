import * as React from "react";
import Head from "next/head";
import { Layout } from "../../components";

import styles from "./Home.module.css";

const ACTION_VERBS = [
  "Wear",
  "Share",
  "Put on",
  "Give out",
  "Put on",
  "Share",
  "Wear",
];

const HomePage = () => {
  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div>
        <div>
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
          <h2>Get Quality Custom Apparel Locally and Affordably</h2>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
