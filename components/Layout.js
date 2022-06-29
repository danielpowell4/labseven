import Head from "next/head";
import Script from "next/script";
import { SiteNav, SiteFooter } from ".";

import styles from "./layout.module.css";

export const siteTitle =
  "Denver Screen Printing & Custom T-Shirt Printing | Lab Seven Screen Printing Co.";
const description =
  "Lab Seven Screen Printing Co. is the leader in Denver Screen Printing,  Custom T-shirt Printing, Graphic Design, and Embroidery in Colorado.  Design your own t-shirt in our design studio or work with one of our artists to bring your custom tee to life.";

const Layout = ({ children, hideNav = false }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="shortcut_icon.png"
        />
        <title>{siteTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="og:title" content={siteTitle} />
        <meta name="og:description" content={description} />
        {/* fonts tied to Justin's account */}
        <link rel="stylesheet" href="https://use.typekit.net/fqt7rom.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap"
          rel="stylesheet"
        />
      </Head>
      {!hideNav && <SiteNav />}
      <div className={styles.container}>
        <main>{children}</main>
      </div>
      <SiteFooter />
      {!!process.env.NEXT_PUBLIC_ENV_VARIABLE && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_GOOGLE_ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${NEXT_GOOGLE_ANALYTICS_ID}');`}
          </Script>
        </>
      )}
    </>
  );
};

export default Layout;
