import * as React from "react";
import Head from "next/head";

import { SiteNav, SiteFooter, FixedFooter } from ".";
import styles from "./layout.module.css";
import { Montserrat } from "next/font/google";
import useScrollPosition from "@react-hook/window-scroll";

const montserrat = Montserrat({
  weights: [700],
  subsets: ["latin"],
  variable: "--montserrat",
  display: "swap",
});

const siteTitle =
  "Denver Screen Printing & Custom T-Shirt Printing | Lab Seven Screen Printing Co.";
const description =
  "Lab Seven Screen Printing Co. is the leader in Denver Screen Printing, Custom T-shirt Printing, Graphic Design, and Embroidery in Colorado. Design your own t-shirt in our design studio or work with one of our artists to bring your custom tee to life.";

const Layout = ({ children, className, ...rest }) => {
  const hasMounted = React.useRef(false);

  // check if is first mount
  React.useEffect(() => {
    hasMounted.current = true;
  });

  // show nav onScrollUp
  const prevScrollPos = React.useRef();
  const scrollY = useScrollPosition(); // defaults to 30fps
  const [navVisible, setNavVisible] = React.useState(true);
  React.useEffect(() => {
    const justLoaded =
      !hasMounted.current || typeof prevScrollPos.current === "undefined";
    const nearTop = scrollY < 100;
    const isScrollingUp = prevScrollPos?.current > scrollY;

    const shouldShow = justLoaded || nearTop || isScrollingUp;
    setNavVisible(shouldShow);

    if (hasMounted.current) {
      prevScrollPos.current = scrollY; // stash for next scroll
    }
  }, [scrollY]);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="og:title" content={siteTitle} />
        <meta name="og:description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        className={montserrat.variable}
        style={{
          "--navTop": navVisible ? "0px" : "calc(0px - var(--navHeight))",
          "--fixedNavBottom": navVisible
            ? "0px"
            : "calc(0px - var(--fixedNavHeight))",
          "--headingFont": "var(--montserrat), var(--bodyFont)",
        }}
      >
        <SiteNav />
        <div
          {...rest}
          className={[styles.container, className].filter(Boolean).join(" ")}
          style={{ paddingTop: `var(--navHeight)` }}
        >
          {children}
        </div>
        <SiteFooter />
        <FixedFooter />
      </div>
    </>
  );
};

export default Layout;
