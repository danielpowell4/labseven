import Head from "next/head";

import { SiteNav, SiteFooter } from ".";
import styles from "./layout.module.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weights: [800],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const siteTitle =
  "Denver Screen Printing & Custom T-Shirt Printing | Lab Seven Screen Printing Co.";
const description =
  "Lab Seven Screen Printing Co. is the leader in Denver Screen Printing, Custom T-shirt Printing, Graphic Design, and Embroidery in Colorado. Design your own t-shirt in our design studio or work with one of our artists to bring your custom tee to life.";

const Layout = ({ children, hideNav = false }) => {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="og:title" content={siteTitle} />
        <meta name="og:description" content={description} />
      </Head>
      <div className={`${montserrat.variable}`}>
        {!hideNav && <SiteNav />}
        <div
          className={styles.container}
          style={!hideNav ? { paddingTop: `var(--navHeight)` } : {}}
        >
          {children}
        </div>
        <SiteFooter />
      </div>
    </>
  );
};

export default Layout;
