import * as React from "react";
import Image from "next/image";
import styles from "./SiteNav.module.css";

import useScrollPosition from "@react-hook/window-scroll";

const SiteNav = () => {
  // call now flyout
  const callContainerRef = React.useRef();
  const [isFlyoutOpen, setIsFlyoutOpen] = React.useState(false);

  // show nav onScrollUp
  const prevScrollPos = React.useRef(0);
  const scrollY = useScrollPosition(); // defaults to 30fps
  const [navNisible, setNavNisible] = React.useState(true);
  React.useEffect(() => {
    const nearTop = scrollY < 100;
    const isScrollingUp = prevScrollPos.current > scrollY;

    const shouldShow = nearTop || isScrollingUp;
    if (!shouldShow) setIsFlyoutOpen(false); // close call now flyout
    setNavNisible(shouldShow);

    prevScrollPos.current = scrollY; // stash for next scroll
  }, [scrollY]);

  return (
    <div
      className={`${styles.SiteNav}${
        navNisible ? "" : ` ${styles.SiteNav__hidden}`
      }`}
    >
      <header className={styles.header}>
        <div className={styles.header__spacer}>
          <a className={styles.logo} href="//labseven.co">
            <img
              alt="Lab Seven Screen Printing Co. Logo"
              src="/assets/Lab-Seven-Logo.svg"
              height={40.5}
              width={220}
            />
          </a>
          <div
            className={`${styles.callNow} ${
              isFlyoutOpen ? styles.callNow__isFlyoutOpen : ""
            }`}
            ref={callContainerRef}
            onMouseLeave={() => setIsFlyoutOpen(false)}
          >
            <button
              className={styles.callNow__anchor}
              onMouseEnter={() => setIsFlyoutOpen(true)}
            >
              Call Now
            </button>
            <div className={styles.callNow__flyout}>
              <ul>
                <li>
                  <span className={styles.callNow__flyout__label}>
                    River Point
                    <sub className={styles.callNow__flyout__label__accent}>
                      HQ
                    </sub>
                  </span>
                  <a
                    href="tel:+13038143389"
                    className={styles.callNow__flyout__number}
                  >
                    {`(303) 814-3389`}
                  </a>
                </li>
                <li>
                  <span className={styles.callNow__flyout__label}>
                    Lakeside
                  </span>
                  <a
                    href="tel:+17207086192"
                    className={styles.callNow__flyout__number}
                  >
                    {`(720) 708-6192`}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.locales}>
          <Image
            src="/assets/Colorado-Flag.svg"
            alt="Colorado Flag"
            height={20}
            width={30}
            className={styles.locales__colorado}
          />
          <Image
            src="/assets/USA-Flag.svg"
            alt="USA Flag"
            height={20}
            width={30}
            className={styles.locales__america}
          />
        </div>
      </header>
    </div>
  );
};

export default SiteNav;
