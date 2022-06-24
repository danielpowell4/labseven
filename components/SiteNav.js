import * as React from "react";
import Image from "next/image";
import styles from "./SiteNav.module.css";

const SiteNav = () => {
  const callContainerRef = React.useRef();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = (event) => {
    setIsOpen(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/assets/Lab-Seven-Logo.svg" height="auto" width={220} />
      </div>
      <div
        className={`${styles.callNow} ${isOpen ? styles.callNow__isOpen : ""}`}
        ref={callContainerRef}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          className={styles.callNow__anchor}
          onMouseEnter={() => setIsOpen(true)}
        >
          Call Now
        </button>
        <div className={styles.callNow__flyout}>
          <ul>
            <li>
              <span className={styles.callNow__flyout__label}>
                River Point
                <sub className={styles.callNow__flyout__label__accent}>HQ</sub>
              </span>
              <a
                href="tel:+13038413389"
                className={styles.callNow__flyout__number}
              >
                {`(303) 841-3389`}
              </a>
            </li>
            <li>
              <span className={styles.callNow__flyout__label}>Lakeside</span>
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
      <div className={styles.locales}>
        <Image src="/assets/Colorado-Flag.svg" height={20} width={30} />
        <Image src="/assets/USA-Flag.svg" height={20} width={30} />
      </div>
    </header>
  );
};

export default SiteNav;
