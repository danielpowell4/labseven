import { FixedFooter, SiteFooter, SiteNav, ServicesReel } from "components";

import styles from "./location.module.css";

import { Suspense } from "react";

import { WaveCta } from "pages/index";

const LocationLayout = ({ children }) => {
  return (
    <>
      <SiteNav />
      <div style={{ marginTop: "var(--navHeight)" }}>
        <Suspense>{children}</Suspense>
      </div>
      <div className={styles.reelPositioner}>
        <ServicesReel
          title="Your local one-stop shop for merch"
          titleAccent="local"
          itemSize="14rem"
          disabledOffset={4}
        />
      </div>
      <WaveCta />
      <SiteFooter />
      <FixedFooter />
    </>
  );
};

export default LocationLayout;
