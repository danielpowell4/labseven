import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Layout,
  RotatingLogo,
  TestimonialsReel,
  CtaForm,
  InstaReel,
  NewsletterForm,
  DesignIFrame,
} from "../../components";

/* images */
/* - welcome */
import Welcome_LibertyLadies from "../../public/assets/Home/Welcome_LibertyLadies.png";
import Welcome_Arrow from "../../public/assets/Home/Welcome_Arrow.svg";
/* - steps */
import Step1_Shirt from "../../public/assets/Home/Step1_Shirt.svg";
import Step2_Sizes from "../../public/assets/Home/Step2_Sizes.svg";
import Step3_Upload from "../../public/assets/Home/Step3_Upload.svg";
import ThatsIt_Hoodie from "../../public/assets/Home/ThatsIt_Hoodie.svg";
/* - services */
import Services_World from "../../public/assets/Home/Services_World.svg";
import Services_Handshake from "../../public/assets/Home/Services_Handshake.svg";
import Services_PiggyBank from "../../public/assets/Home/Services_PiggyBank.svg";
import Services_Star from "../../public/assets/Home/Services_Star.svg";
import Background_Wavy from "../../public/assets/Home/Background_Wavy.svg";
import UniformMan from "../../public/assets/Home/UniformMan.png";
/* - design */
import Design_Paint from "../../public/assets/Home/Design_Paint.svg";
import Design_BlueArrow from "../../public/assets/Home/Design_BlueArrow.svg";
import Design_Blob1 from "../../public/assets/Home/Design_Blob1.svg";
import Design_Blob2 from "../../public/assets/Home/Design_Blob2.svg";
/* - reviews */
import Reviews_Megaphone from "../../public/assets/Home/Reviews_Megaphone.svg";
import Reviews_Arrow from "../../public/assets/Home/Reviews_Arrow.svg";
/* - cta */
import Consultation_Phone from "../../public/assets/Home/Consultation_Phone.svg";
import Green_Wave from "../../public/assets/Home/Green_Wave.svg";
import CTA_Namaste from "../../public/assets/Home/CTA_Namaste.png";

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
        <div className={styles.hero__spacer}>
          <div className={styles.hero__text}>
            <h1>
              <div className={styles.verbsContainer}>
                <div className={styles.verbsContainer__reel}>
                  {ACTION_VERBS.map((verb, vIndex) => (
                    <div
                      key={vIndex}
                      className={styles.verbsContainer__reel__item}
                    >
                      {verb}
                    </div>
                  ))}
                </div>
                <span>your brand proudly.</span>
              </div>
            </h1>
            <h2>Get Quality Custom Apparel Locally and Affordably.</h2>
            <div className={styles.linkContainer}>
              <Link href="/products" className={styles.LinkButton}>
                Browse Catalog
              </Link>
              <Link href="/contact" className={styles.LinkButtonAlternate}>
                Contact Printing Pro
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.welcomeWrap}>
        <div className={styles.welcome__image}>
          <Image
            src={Welcome_LibertyLadies}
            alt="Happy customers wearing sweatshirts"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className={styles.welcome}>
          <div className={styles.welcome__block}>
            <div className={styles.welcome__block__header}>
              <h3 className={styles.welcome__block__heading}>
                Welcome to Lab Seven.
              </h3>
              <RotatingLogo />
            </div>
            <p>
              Founded in 2006, now with 6 front-range locations – We've been
              helping local businesses, schools, and churches successfully
              market their brands in style for nearly 15 years.
            </p>
            <p>
              Like you, we understand the challenges of standing out in a busy
              and competitive market.
            </p>
            <p>
              <strong>That's why we believe:</strong>
            </p>
            <div style={{ position: "absolute" }}>
              <Image
                src={Welcome_Arrow}
                alt="Arrow pointing to next section"
                aria-hidden="true"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.youDeserve}>
        <div className={styles.youDeserve__spacer}>
          <div className={styles.youDeserve__block}>
            <p>
              You deserve quality apparel that reflects the legitimacy of your
              brand.
            </p>
            <Link href="/products" className={styles.LinkButton}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.howTo}>
        <h2 className={styles.howTo__heading}>
          <span className={styles.Underline1}>Your plan</span>
          {` for awesome apparel:`}
        </h2>
        <ol className={styles.howTo__steps}>
          <li>
            <Image
              src={Step1_Shirt}
              alt="Hand drawn sketch of a t-shirt"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <h4>Pick your products</h4>
          </li>
          <li>
            <Image
              src={Step2_Sizes}
              alt="Hand drawn chart of sizes"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <h4>Fill out the size breakdown</h4>
          </li>
          <li>
            <Image
              src={Step3_Upload}
              alt="Upload logo to cloud"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <h4>Upload your logo idea</h4>
          </li>
        </ol>
        <div className={styles.howTo__block}>
          <div className={styles.howTo__block__text}>
            <h3 className={styles.howTo__block__heading}>
              <span className={styles.Underline2}>That's it!</span>
            </h3>
            <p>
              We'll send you a no-commitment proposal, complete with pricing,
              product recommendations, and digital mockups!
            </p>
            <div className={styles.linkContainer}>
              <Link href="/products" className={styles.LinkButton}>
                Ok, let's go!
              </Link>
              <Link href="/contact" className={styles.LinkButtonAlternate}>
                Talk to a person
              </Link>
            </div>
          </div>
          <Image
            src={ThatsIt_Hoodie}
            width={200}
            alt="Cool hoodie and beanie"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <div className={styles.servicesWrap}>
        <Image
          className={styles.services__bg}
          src={Background_Wavy}
          alt="Background images"
          aria-hidden={true}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
        <div className={styles.services}>
          <h2 className={styles.services__heading}>
            <span className={styles.Underline3}>Real world</span>
            <div style={{ display: "inline-flex", margin: 10 }}>
              <Image
                src={Services_World}
                alt={"Sketch of globe"}
                aria-hidden={true}
                height={60}
                width={60}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
            <br />
            marketing solutions.
          </h2>

          <p className={styles.services__flyingText}>
            <strong>T-shirts aren't going out of style.</strong>
            {` Custom apparel is a tried-and-true business investment, and it's
            never been easier to order retail-quality apparel and promotional
            materials on a budget!`}
          </p>

          <div className={styles.services__uniformMan}>
            <Image
              src={UniformMan}
              alt="Man wearing branded polo shirt"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>

          <ul className={styles.services__points}>
            <li>
              <Image
                src={Services_PiggyBank}
                alt="Hand drawn sketch of piggy bank"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
              <div>
                <h5>Monetize Your Brand</h5>
                <p>
                  Apparel sales offer your customers a fun and affordable way to
                  show their support, while creating a new source of income for
                  your business or company.
                </p>
              </div>
            </li>
            <li>
              <Image
                src={Services_Handshake}
                alt="Hand drawn sketch of handshake"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
              <div>
                <h5>Connect With Your Crowd</h5>
                <p>
                  Build positive relationships with your most important team
                  members and clientele. One T-shirt at a time!
                </p>
              </div>
            </li>
            <li>
              <Image
                src={Services_Star}
                alt="Hand drawn sketch of star"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
              <div className={styles.services__points__textWrap}>
                <h5>Outfit Employees in Style</h5>
                <p>
                  Affordable t-shirts no longer have to feel cheap. Outfitting
                  your team with trendy, retail-quality styles goes a long way
                  in representing your brand.
                </p>
              </div>
            </li>
          </ul>

          <div className={styles.services__block}>
            <h3 className={styles.services__block__heading}>
              What does <span className={styles.Underline4}>your business</span>{" "}
              need?
            </h3>
            <div className={styles.services__block__carousel}>
              {["Screen Printing", "Embroidery", "Stickers & Decals"].map(
                (serviceName, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    style={{
                      flex: 1,
                      height: "10rem",
                      background: "grey",
                      padding: "1rem",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <h4 style={{ margin: 0 }}>{serviceName}</h4>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.designWrap}>
        <Image
          src={Design_Paint}
          alt="Sketch of Artist's Color Palette"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
        <div className={styles.design__header}>
          <div id={styles.design__arrow}>
            <Image
              src={Design_BlueArrow}
              alt="Arrow towards design studio"
              aria-hidden="true"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
          <h2 className={styles.design__heading}>Design Your Own Shirt</h2>
        </div>
        <div className={styles.design__container}>
          <div id={styles.design__blob1}>
            <Image
              src={Design_Blob1}
              alt="Decorative blue blob"
              aria-hidden="true"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
          <DesignIFrame id={styles.design__studio} />
          <div id={styles.design__blob2}>
            <Image
              src={Design_Blob2}
              alt="Decorative yellow blob"
              aria-hidden="true"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.testimonialsWrap}>
        <Image
          src={Reviews_Megaphone}
          alt="Sketch of happy customer with megaphone"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
        <h2 className={styles.testimonials__heading}>
          What Lab Seven Customers are Saying:
          <div className={styles.testimonials__arrow}>
            <Image
              src={Reviews_Arrow}
              alt="Arrow towards customer reviews"
              aria-hidden="true"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        </h2>
        <TestimonialsReel />
      </div>
      <div className={styles.ctaWrap}>
        <Image
          className={styles.cta__bg}
          src={Green_Wave}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div className={styles.cta__header}>
          <h3 className={styles.cta__heading}>
            Stop wasting your marketing budget on throwaway apparel.
          </h3>
          <h3 className={styles.cta__heading}>
            Get t-shirts you'll <span className={styles.Underline5}>want</span>{" "}
            to wear.
          </h3>
        </div>
        <div className={styles.cta__namaste}>
          <Image
            src={CTA_Namaste}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className={styles.cta__form}>
          <div className={styles.cta__form__header}>
            <Image
              src={Consultation_Phone}
              alt="Sketch of happy customer on the phone"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <h4 className={styles.cta__form__heading}>
              Schedule Your Free
              <br />
              10 Minute Consultation
            </h4>
          </div>
          <CtaForm />
        </div>
        <div className={styles.cta__footer}>
          <InstaReel />
          <div className={styles.newsletterWrap}>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
