import * as React from "react";
import Head from "next/head";
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

import useIntersectionObserver from "@react-hook/intersection-observer";

import styles from "./Services.module.css";

const intersectionObsOptions = {
  threshold: [0.05, 0.1, 0.2, 0.25, 0.35, 0.5, 0.65, 0.75, 0.8, 0.9, 0.95, 1.0],
};

const ServicesPage = () => {
  // section refs
  const screenPrintingRef = React.useRef();
  const embroideryRef = React.useRef();
  const stickersDecalsRef = React.useRef();
  const vinylBannersSignsRef = React.useRef();
  const digitalHeatTransferRef = React.useRef();
  const promotionalProductsRef = React.useRef();

  // section observers
  const screenPrintingObserver = useIntersectionObserver(screenPrintingRef, {
    ...intersectionObsOptions,
    initialIsIntersecting: true, // for SSR
  });
  const embroideryObserver = useIntersectionObserver(
    embroideryRef,
    intersectionObsOptions
  );
  const stickersDecalsObserver = useIntersectionObserver(
    stickersDecalsRef,
    intersectionObsOptions
  );
  const vinylBannersSignsObserver = useIntersectionObserver(
    vinylBannersSignsRef,
    intersectionObsOptions
  );
  const digitalHeatTransferObserver = useIntersectionObserver(
    digitalHeatTransferRef,
    intersectionObsOptions
  );
  const promotionalProductsObserver = useIntersectionObserver(
    promotionalProductsRef,
    intersectionObsOptions
  );

  const allObservers = [
    screenPrintingObserver,
    embroideryObserver,
    stickersDecalsObserver,
    vinylBannersSignsObserver,
    digitalHeatTransferObserver,
    promotionalProductsObserver,
  ];
  const [activeServiceIndex] = allObservers.reduce(
    ([maxIndex, maxRatio], observer, index) => {
      if (observer.intersectionRatio > maxRatio) {
        return [index, observer.intersectionRatio];
      }
      return [maxIndex, maxRatio];
    },
    [-1, 0]
  );

  console.log("activeServiceIndex", activeServiceIndex);

  const services = [
    {
      Component: ScreenPrinting,
      id: "ScreenPrinting",
      name: "Screen Printing",
      ref: screenPrintingRef,
    },
    {
      Component: Embroidery,
      id: "Embroidery",
      name: "Embroidery",
      ref: embroideryRef,
    },
    {
      Component: StickersDecals,
      id: "StickersDecals",
      name: "Stickers & Decals",
      ref: stickersDecalsRef,
    },
    {
      Component: VinylBannersSigns,
      id: "VinylBannersSigns",
      name: "Vinyl Banners & Signs",
      ref: vinylBannersSignsRef,
    },
    {
      Component: DigitalHeatTransfer,
      id: "DigitalHeatTransfer",
      name: "Digital Heat Transfer",
      ref: digitalHeatTransferRef,
    },
    {
      Component: PromotionalProducts,
      id: "PromotionalProducts",
      name: "Promotional Products",
      ref: promotionalProductsRef,
    },
  ];

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
              {services.map(({ id, name }, serviceIndex) => (
                <li key={id}>
                  <Link href={`#${id}`} scroll={false}>
                    {name} {serviceIndex === activeServiceIndex && "👈"}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main>
          {services.map(({ Component, ref }, serviceIndex) => (
            <Component key={serviceIndex} sectionRef={ref} />
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default ServicesPage;
