import styles from "./layout.module.css";
import Head from "next/head";
import { SiteNav } from ".";

export const siteTitle =
  "Denver Screen Printing & Custom T-Shirt Printing | Lab Seven Screen Printing Co.";
const description =
  "Lab Seven Screen Printing Co. is the leader in Denver Screen Printing,  Custom T-shirt Printing, Graphic Design, and Embroidery in Colorado.  Design your own t-shirt in our design studio or work with one of our artists to bring your custom tee to life.";

// pick random emoji as favicon
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
const EMOJI_OF_BUILD = ["🐕", "👨‍🚀", "👨‍💻", "🖼", "🚀"];

const Layout = ({ children, hideNav = false }) => {
  return (
    <>
      <Head>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${sample(
            EMOJI_OF_BUILD
          )}</text></svg>`}
        />
        <title>{siteTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="og:title" content={siteTitle} />
        <meta name="og:description" content={description} />
        {/* fonts tied to Justin's account */}
        <link rel="stylesheet" href="https://use.typekit.net/fqt7rom.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap"
          rel="stylesheet"
        />
      </Head>
      {!hideNav && <SiteNav />}
      <div className={styles.container}>
        <main>{children}</main>
      </div>
      <footer className={styles.footer}> Colorado Proud 🏔</footer>
    </>
  );
};

export default Layout;
