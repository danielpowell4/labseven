import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import {
  CallLink,
  InstaReel,
  Layout,
  LinkButton,
  NewsletterForm,
} from "components";
import {
  DigitalHeatTransfer,
  Embroidery,
  PromotionalProducts,
  ScreenPrinting,
  StickersDecals,
  VinylBannersSigns,
} from "components/Services";

import useIntersectionObserver from "@react-hook/intersection-observer";

import HeroCollection from "public/assets/Services/Services_HeroCollection.png";
import HeroArrow from "public/assets/Arrows/Services_Hero.svg";

import styles from "./Services.module.css";
import homeStyles from "./Home.module.css";

import { SectionDivider } from "./home";

const intersectionObsOptions = {
  threshold: [0.05, 0.1, 0.2, 0.25, 0.5, 0.75, 0.8, 0.9, 0.95],
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
        <meta
          name="description"
          content="Get Custom Printed Apparel Affordably. Backed by a Local Team You Can Trust."
        />
      </Head>
      <div className={styles.hero}>
        <div className={styles.hero__spacer}>
          <div className={styles.hero__left}>
            <h1 className={styles.hero__heading}>
              Everything you need to promote your brand.
            </h1>
            <div className={styles.hero__linkContainer}>
              <Image
                aria-hidden={true}
                priority
                src={HeroArrow}
                className={styles.hero__arrow}
              />
              <LinkButton href={`#${services[0].id}`} scroll={false}>
                Browse Services
              </LinkButton>
            </div>
          </div>
          <div className={styles.hero__right}>{/* no content */}</div>
          <div className={styles.hero__imageContainer}>
            <Image
              aria-hidden={true}
              priority
              src={HeroCollection}
              alt="A collection of custom printed apparel"
              fill
              style={{ objectFit: "scale-down" }}
              sizes={"65vw"}
            />
          </div>
        </div>
      </div>
      <div className={styles.scrollContainer}>
        <aside className={styles.scrollContainer__aside}>
          <nav className={styles.sectionNav}>
            <ul>
              {services.map(({ id, name }, serviceIndex) => (
                <li key={id}>
                  <Link
                    href={`#${id}`}
                    scroll={false}
                    className={[
                      styles.sectionNav__link,
                      serviceIndex === activeServiceIndex &&
                        styles.sectionNav__linkActive,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {name}
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
      <div className={[styles.ctaWrap, homeStyles.hasSectionDivider].join(" ")}>
        <SectionDivider />
        <div className={styles.cta__topSpacer}>
          <div className={styles.cta__header}>
            <h3 className={styles.cta__header__text}>
              Ready to{" "}
              <span className={homeStyles.Underline5}>get started</span>?
            </h3>
            <div className={styles.cta__header__links}>
              <CallLink className="LinkButtonAlternate">Call Now</CallLink>
              <LinkButton href="/products">Browse Products</LinkButton>
            </div>
          </div>
        </div>
        <div className={homeStyles.cta__footer}>
          <InstaReel />
          <div className={homeStyles.newsletterWrap}>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicesPage;
