import { SiteFooter, SiteNav, ServicesReel } from "components";

import { Suspense } from "react";

import { HowToSteps, WaveCta } from "pages/index";

const GalleryLayout = ({ children }) => {
  return (
    <>
      <SiteNav />
      <div style={{ paddingTop: "var(--navHeight)" }}>
        <Suspense>{children}</Suspense>
      </div>
      <HowToSteps title={"Ready to get started?"} titleAccent="get started?" />
      <WaveCta />
      <SiteFooter />
    </>
  );
};

export default GalleryLayout;
