import { SiteFooter, SiteNav } from "components";

import { HowToSteps, WaveCta } from "pages/index";

const GalleryLayout = ({ children }) => {
  return (
    <>
      <SiteNav />
      <div style={{ paddingTop: "var(--navHeight)" }}>{children}</div>
      <HowToSteps title={"Ready to get started?"} titleAccent="get started?" />
      <WaveCta />
      <SiteFooter />
    </>
  );
};

export default GalleryLayout;
