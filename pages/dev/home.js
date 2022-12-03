import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Layout, RotatingLogo } from "../../components";

/* images */
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
          <div className={styles.welcome__block__header}>
            <h3 className={styles.welcome__block__heading}>
              Welcome to Lab Seven.
            </h3>
            <RotatingLogo />
          </div>
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
      <div className={styles.servicesWrap}>
        <Image
          className={styles.services__bg}
          src={Background_Wavy}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className={styles.services}>
          <h2 className={styles.services__heading}>
            <span className="highlight">Real world</span>
            <div style={{ display: "inline-flex", margin: 10 }}>
              <Image src={Services_World} height={60} width={60} />
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
            <Image src={UniformMan} />
          </div>

          <ul className={styles.services__points}>
            <li>
              <Image src={Services_PiggyBank} alt="Hand drawn chart of sizes" />
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
              <Image src={Services_Handshake} alt="Hand drawn chart of sizes" />
              <div>
                <h5>Connect With Your Crowd</h5>
                <p>
                  Build positive relationships with your most important team
                  members and clientele. One T-shirt at a time!
                </p>
              </div>
            </li>
            <li>
              <Image src={Services_Star} alt="Hand drawn chart of sizes" />
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
              What does <span className="highlight">your business</span> need?
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
    </Layout>
  );
};

export default HomePage;
