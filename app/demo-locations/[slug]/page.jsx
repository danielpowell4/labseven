import { notFound } from "next/navigation";
import * as React from "react";
import Image from "next/image";

// components
import { CallLink, LinkButton, RotatingLogo } from "components";

// styles

import styles from "../location.module.css";

// util images
import HeroArrow from "public/assets/Arrows/Services_Hero.svg";

// banner images
import EnglewoodBanner from "public/assets/Locations/englewood.webp";
import DenverBanner from "public/assets/Locations/denver.webp";
import AuroraBanner from "public/assets/Locations/aurora.webp";
import BoulderBanner from "public/assets/Locations/boulder.webp";
import ColoradoSpringsBanner from "public/assets/Locations/coloradoSprings.webp";
import FortCollinsBanner from "public/assets/Locations/fortCollins.webp";

const locationParams = {
  englewood: {
    isHeadquarters: true,
    name: "Englewood",
    slug: "englewood",
    possessive: "Englewood's",
    callCta: "Call Lab Seven Englewood",
    phoneFormatted: "(303) 814-3389",
    telLink: "+13038143389",
    position: 1,
    bannerImage: EnglewoodBanner,
  },
  denver: {
    isHeadquarters: false,
    name: "Denver",
    slug: "denver",
    possessive: "Denver's",
    callCta: "Call Lab Seven Denver",
    phoneFormatted: "(720) 708-6192",
    telLink: "+17207086192",
    position: 2,
    bannerImage: DenverBanner,
  },
  aurora: {
    isHeadquarters: false,
    name: "Aurora",
    slug: "aurora",
    possessive: "Aurora's",
    callCta: "Call Lab Seven Aurora",
    phoneFormatted: "(303) 529-6583",
    telLink: "+13035296583",
    position: 3,
    bannerImage: AuroraBanner,
  },
  boulder: {
    isHeadquarters: false,
    name: "Boulder",
    slug: "boulder",
    possessive: "Boulder's",
    callCta: "Call Lab Seven Boulder",
    phoneFormatted: "(720) 780-1205",
    telLink: "+17207801205",
    position: 4,
    bannerImage: BoulderBanner,
  },
  "colorado-springs": {
    isHeadquarters: false,
    name: "Colorado Springs",
    slug: "colorado-springs",
    possessive: "Colorado Springs'",
    callCta: "Call Our Springs Office",
    phoneFormatted: "(719) 283-3160",
    telLink: "+17192833160",
    position: 5,
    bannerImage: ColoradoSpringsBanner,
  },
  "fort-collins": {
    isHeadquarters: false,
    name: "Fort Collins",
    possessive: "Fort Collins'",
    callCta: "Call Lab Seven FoCo",
    slug: "fort-collins",
    phoneFormatted: "(720) 730-5435",
    telLink: "+17207305435",
    position: 6,
    bannerImage: FortCollinsBanner,
  },
};

export async function generateStaticParams() {
  const locationSlugs = Object.keys(locationParams);
  return locationSlugs.map((slug) => ({ slug }));
}

const LocationPage = async ({ params }) => {
  const slug = params.slug;
  const location = locationParams[slug];

  if (!location) {
    return notFound();
  }

  const BannerImage = location.bannerImage;

  return (
    <div className={styles.locationPage}>
      <div className={styles.hero}>
        <Image
          className={styles.hero__bg}
          src={BannerImage.src}
          alt={BannerImage.alt}
          aria-hidden={true}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: BannerImage.objectPosition,
          }}
        />
        <div className={styles.hero__spacer}>
          <div className={styles.hero__left}>
            <h1 className={styles.hero__heading}>
              {location.possessive} Home
              <br />
              For Custom T-Shirts.
            </h1>
            <div className={styles.hero__arrowContainer}>
              <Image
                aria-hidden={true}
                priority
                src={HeroArrow}
                className={styles.hero__arrow}
                alt="Hand drawn arrow pointing down the page"
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.welcome__block}>
          <div className={styles.welcome__block__header}>
            <h3 className={styles.welcome__block__heading}>
              Welcome to Lab Seven.
            </h3>
            <RotatingLogo />
          </div>
          <p>
            Colorado's Go-To Shop for Unbeatable Customer Service, Custom Event
            Apparel, Company Uniforms and Branded Merch.
          </p>
          <div className={styles.welcome__block__actions}>
            <CallLink telLink={location.telLink}>{location.callCta}</CallLink>
            <LinkButton className="LinkButtonAlternate" href={"/products"}>
              Instant Quote
            </LinkButton>
          </div>
        </div>
      </main>
      <details open>
        <summary>
          <strong>Location Details</strong>
        </summary>
        <pre>{JSON.stringify(location, null, 2)}</pre>
      </details>
    </div>
  );
};

export default LocationPage;
