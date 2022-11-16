import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "../../components";

/* images */
import Step1_Shirt from "../../public/assets/Home/Step1_Shirt.svg";
import Step2_Sizes from "../../public/assets/Home/Step2_Sizes.svg";
import Step3_Upload from "../../public/assets/Home/Step3_Upload.svg";
import ThatsIt_Hoodie from "../../public/assets/Home/ThatsIt_Hoodie.svg";

import styles from "./Home.module.css";

const ACTION_VERBS = ["Wear", "Share", "Wear", "Sell", "Wear", "Share", "Wear"];

const HomePage = () => {
  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
        <meta
          name="description"
          content="Get Custom Printed Apparel Affordably. Backed by a Local Team You Can Trust."
        />
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
              <span>your brand proudly.</span>
            </div>
          </h1>
          <h2>Get Quality Custom Apparel Locally and Affordably.</h2>
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
      <div className={styles.welcome}>
        <div className={styles.welcome__block}>
          <h3 className={styles.welcome__block__heading}>
            Welcome to Lab Seven
          </h3>
          <p>
            Founded in 2006, now with 6 front-range locations – We've been
            helping local businesses, schools, and churches successfully market
            their brands in style for nearly 15 years.
          </p>
          <p>
            Like you, we understand the challenges of standing out in a busy and
            competitive market.
          </p>
          <p>
            <strong>That's why we believe:</strong>
          </p>
        </div>
      </div>
      <div className={styles.youDeserve}>
        <div className={styles.youDeserve__block}>
          <p>
            You deserve quality apparel that reflects the legitimacy of your
            brand.
          </p>
          <Link href="/products">
            <a className={styles.LinkButton}>Get Started</a>
          </Link>
        </div>
      </div>
      <div className={styles.howTo}>
        <h2 className={styles.howTo__heading}>
          <span className="highlight">Your plan</span>
          {` for awesome apparel:`}
        </h2>
        <ol className={styles.howTo__steps}>
          <li>
            <Image src={Step1_Shirt} alt="Hand drawn sketch of a t-shirt" />
            <h4>Pick your products</h4>
          </li>
          <li>
            <Image src={Step2_Sizes} alt="Hand drawn chart of sizes" />
            <h4>Fill out the size breakdown</h4>
          </li>
          <li>
            <Image src={Step3_Upload} alt="Upload logo to cloud" />
            <h4>Upload your logo idea</h4>
          </li>
        </ol>
        <div className={styles.howTo__block}>
          <div className={styles.howTo__block__text}>
            <h3>
              <span className="highlight">That's it!</span>
            </h3>
            <p>
              We'll send you a no-commitment proposal, complete with pricing,
              product recommendations, and digital mockups!
            </p>
            <div className={styles.linkContainer}>
              <Link href="/products">
                <a className={styles.LinkButton}>Ok, let's go!</a>
              </Link>
              <Link href="/contact">
                <a className={styles.LinkButtonAlternate}>Talk to a person</a>
              </Link>
            </div>
          </div>
          <Image
            src={ThatsIt_Hoodie}
            width={200}
            alt="Cool hoodie and beanie"
          />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
