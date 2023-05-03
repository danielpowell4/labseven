import * as React from "react";
import Head from "next/head";
import Image from "next/image";

import { Layout } from "components";
import {
  DigitalHeatTransfer,
  Embroidery,
  PromotionalProducts,
  ScreenPrinting,
  StickersDecals,
  VinylBannersSigns,
} from "components/Services";

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
      <aside>
        <nav>
          <ul>
            <li>Screen Printing</li>
            <li>Embroidery</li>
            <li>Stickers & Decals</li>
            <li>Vinyl Banners & Signs</li>
            <li>Digital Heat Transfer</li>
            <li>Promotional Products</li>
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
    </Layout>
  );
};

export default ServicesPage;
