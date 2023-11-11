import { notFound } from "next/navigation";
import * as React from "react";
import Image from "next/image";

// components
import { CallLink, LinkButton, RotatingLogo } from "components";
import { ScreenPrintingForm } from "components/Services/ScreenPrinting";

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
        <div className={styles.formPositioner}>
          <ScreenPrintingForm />
        </div>
        <p>
          Discover Lab Seven Aurora, your local source for screen-printing,
          embroidery, and custom apparel. With unbeatable customer service and
          top quality t-shirt printing, we've been serving Aurora, Centennial,
          and Parker since 2006. Unparalleled Customer Service. Your
          Satisfaction, Our Priority: At Lab Seven, our customers come first. We
          go above and beyond to understand your unique project needs,
          preferences, and deadlines, ensuring that every aspect of your custom
          t-shirt order is managed with care and attention. Our friendly team is
          always ready to assist you, making your experience with us streamlined
          and enjoyable. Quality Blank Apparel Recommendations: Next Level
          Apparel, Bella+Canvas, and AS Colour: We know that the foundation of
          great custom apparel starts with the quality of the blank garments.
          That's why we proudly recommend brands like Next Level Apparel,
          Bella+Canvas, and AS Colour. These top-tier brands offer a wide range
          of comfortable and stylish blank apparel options, ensuring your custom
          designs look and feel fantastic. From soft and cozy t-shirts to
          stylish hoodies, we’re proud to offer the highest quality prints on
          the highest quality blanks. Custom Event Apparel. Make Your Occasions
          Special: Whether it's a corporate event, charity fundraiser,
          team-building activity, or family reunion, Lab Seven can help you
          create custom event apparel that adds a special touch to your
          gatherings. With our expert design team and premium printing
          techniques, your custom event apparel will leave a lasting impression.
          Company Uniforms. Present a Unified Image: Present your business with
          a unified and professional image through custom company uniforms. Lab
          Seven offers a wide range of styles and customization options to match
          your brand's identity. Elevate your team's morale and instill a sense
          of pride with comfortable and stylish printed or embroidered uniforms
          that embody your company's unique style. Expert Screen Printing and
          Embroidery. Craftsmanship You Can Trust: With Lab Seven's expert
          screen printing and embroidery services, you can be confident that
          your designs will come to life with outstanding precision and
          vibrancy. Our skilled artists and print technicians use high-quality
          inks and cutting-edge methods to create long-lasting and eye-catching
          products. Small Batch T-shirts or Bulk Apparel Printing. Affordable
          and Efficient: Lab Seven is your reliable partner for bulk t-shirt
          printing. Whether you need small or large quantity event t-shirts,
          company uniforms, or branded merch, our simple ordering process and
          comprehensive proofing protocols ensure accurate and timely delivery
          without compromising on quality. No surprises. Local and Trusted: As a
          Colorado owned and operated business, Lab Seven takes pride in being a
          local business in the Aurora community. We prioritize exceptional
          service and value the trust our customers place in us to deliver
          top-notch custom apparel.
        </p>
      </main>
    </div>
  );
};

export default LocationPage;
