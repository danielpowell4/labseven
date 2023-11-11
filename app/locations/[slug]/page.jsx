import { notFound } from "next/navigation";
import * as React from "react";
import Image from "next/image";

// 'us' components + utils
import { CallLink, LinkButton, RotatingLogo } from "components";
import { ScreenPrintingForm } from "components/Services/ScreenPrinting";
import HeroArrow from "public/assets/Arrows/Services_Hero.svg";
import styles from "../location.module.css";
import { getAllLocationSlugs, getLocationData } from "lib/locations";

// location data + banner images
import EnglewoodBanner from "public/assets/Locations/englewood.webp";
import DenverBanner from "public/assets/Locations/denver.webp";
import AuroraBanner from "public/assets/Locations/aurora.webp";
import BoulderBanner from "public/assets/Locations/boulder.webp";
import ColoradoSpringsBanner from "public/assets/Locations/coloradoSprings.webp";
import FortCollinsBanner from "public/assets/Locations/fortCollins.webp";
const locationBanners = {
  englewood: EnglewoodBanner,
  denver: DenverBanner,
  aurora: AuroraBanner,
  boulder: BoulderBanner,
  "colorado-springs": ColoradoSpringsBanner,
  "fort-collins": FortCollinsBanner,
};

export async function generateStaticParams() {
  const locationSlugs = getAllLocationSlugs();
  return locationSlugs.map((slug) => ({ slug }));
}

const LocationPage = async ({ params }) => {
  const slug = params.slug;
  const BannerImage = locationBanners[slug];
  if (!BannerImage) return notFound(); // need a banner and an '.md' file for each location

  const location = await getLocationData(slug);

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
            <CallLink telLink={location.telLink} locationSlug={location.slug}>
              {location.callCta}
            </CallLink>
            <LinkButton className="LinkButtonAlternate" href={"/products"}>
              Instant Quote
            </LinkButton>
          </div>
        </div>
        <div className={styles.formPositioner}>
          <ScreenPrintingForm serviceName={`Proof for ${location.name}`} />
        </div>
        <div
          className={styles.writeup}
          dangerouslySetInnerHTML={{ __html: location.contentHtml }}
        />
      </main>
    </div>
  );
};

export default LocationPage;
