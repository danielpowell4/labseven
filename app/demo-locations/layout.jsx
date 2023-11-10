import { SiteFooter, SiteNav, ServicesReel } from "components";

import styles from "./location.module.css";
import Link from "next/link";

import { Suspense } from "react";

import { WaveCta } from "pages/index";

const LocationLayout = ({ children }) => {
  return (
    <>
      <SiteNav />
      <div style={{ marginTop: "var(--navHeight)" }}>
        <Suspense>{children}</Suspense>
      </div>
      <div style={{ position: "relative" }}>
        <ServicesReel />
      </div>
      <WaveCta />
      <SiteFooter />
    </>
  );
};

export default LocationLayout;
