import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Layout } from "components";
import {
  DigitalHeatTransfer,
  Embroidery,
  PromotionalProducts,
  ScreenPrinting,
  StickersDecals,
  VinylBannersSigns,
} from "components/Services";

import styles from "./Services.module.css";

const ServicesPage = () => {
  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
        <meta
          name="description"
          content="Get Custom Printed Apparel Affordably. Backed by a Local Team You Can Trust."
        />
      </Head>
      <div>
        <h1>Everything you need to promote your brand.</h1>
      </div>
      <div className={styles.scrollContainer}>
        <aside className={styles.scrollContainer__aside}>
          <nav className={styles.sectionNav}>
            <ul>
              <li>
                <Link href="#ScreenPrinting">Screen Printing</Link>
              </li>
              <li>
                <Link href="#Embroidery">Embroidery</Link>
              </li>
              <li>
                <Link href="#StickersDecals">Stickers & Decals</Link>
              </li>
              <li>
                <Link href="#VinylBannersSigns">Vinyl Banners & Signs</Link>
              </li>
              <li>
                <Link href="#DigitalHeatTransfer">Digital Heat Transfer</Link>
              </li>
              <li>
                <Link href="#PromotionalProducts">Promotional Products</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main>
          <ScreenPrinting />
          <Embroidery />
          <StickersDecals />
          <VinylBannersSigns />
          <DigitalHeatTransfer />
          <PromotionalProducts />
        </main>
      </div>
    </Layout>
  );
};

export default ServicesPage;
