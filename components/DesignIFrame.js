import * as React from "react";
import Script from "next/script";

import { ThreeDotLoader } from ".";

const launchSettings = {
  DesignerLocation: "https://images.inksoft.com/designer/html5",
  EnforceBoundaries: "1",
  Background: "",
  VectorOnly: true,
  DigitalPrint: false,
  ScreenPrint: true,
  Embroidery: false,
  MaxScreenPrintColors: "6",
  RoundPrices: false,
  StoreID: "57819",
  PublisherID: "7257",
  SessionID: "",
  SessionToken: "",
  CartRetailItemID: "",
  UserID: "",
  UserName: "",
  UserEmail: "",
  DesignID: "",
  DefaultProductID: "1001484",
  DefaultProductStyleID: "1016394",
  ProductID: "1001484",
  ProductStyleID: "1016394",
  ProductCategoryID: "",
  ClipArtGalleryID: "",
  DisableAddToCart: false,
  DisableUploadImage: false,
  DisableClipArt: false,
  DisableUserArt: false,
  DisableProducts: false,
  DisableDesigns: false,
  DisableDistress: true,
  DisableResolutionMeter: true,
  DisableUploadVectorArt: false,
  DisableUploadRasterArt: false,
  StartPage: "",
  StartPageCategoryID: "",
  StartPageHTML: "",
  StartBanner: "",
  OrderID: "",
  CartID: "",
  ArtID: "",
  FontID: "",
  Domain: "stores.inksoft.com",
  SSLEnabled: true,
  SSLDomain: "stores.inksoft.com",
  StoreURI: "Lab_Seven_Screen_Printing_Co",
  Admin: "",
  NextURL: "",
  CartURL: "https://stores.inksoft.com/Lab_Seven_Screen_Printing_Co/Cart",
  OrderSummary: true,
  VideoLink: "http://www.youtube.com/watch?v=EfXICdRwt4E",
  Phone: "303-814-3389",
  WelcomeScreen: "",
  ContactUsLink: "/Lab_Seven_Screen_Printing_Co/Stores/Contact",
  WelcomeVideo: "",
  GreetBoxSetting: "LANDING",
  HelpVideoOverview: "",
  AutoZoom: false,
  EnableNameNumbers: true,
  AddThisPublisherId: "xa-4fccb0966fef0ba7",
  EnableCartPricing: true,
  EnableCartCheckout: false,
  EnableCartBilling: false,
  EnableCartShipping: true,
  PaymentDisabled: true,
  PaymentRequired: false,
  BillingAddressRequired: true,
  PasswordLength: "4",
  DefaultCountryCode: "US",
  CurrencyCode: "USD",
  CurrencySymbol: "$",
  HideProductPricing: true,
  HideClipArtNames: true,
  HideDesignNames: true,
  ThemeName: "flat",
  FullScreen: false,
  Version: "4.9.0",
  BackgroundColor: "",
  StoreLogo:
    "//stores.inksoft.com/images/publishers/7257/stores/Lab_Seven_Screen_Printing_Co/img/logo.png",
  StoreName: "Lab Seven Screen Printing Co.",
  StoreEmail: "info@labseven.co",
  EnableEZD: false,
  EmbedType: "iframe",
};

const DesignIFrame = ({ id }) => {
  const designerRef = React.useRef();
  const [frameState, setFrameState] = React.useState({ state: "initial" });

  return (
    <>
      <div id={id} ref={designerRef}>
        {["initial", "loaded"].includes(frameState.state) && <ThreeDotLoader />}
        {frameState.state === "error" && (
          <div>
            <h3>Oh no! Something went wrong.</h3>
            <p>
              An error occurred while loading our design suite. Contact our
              in-house team of professional designers to get your project
              started today.
            </p>
            <details>
              <summary style={{ color: `var(--danger)` }}>
                Error Summary
              </summary>
              Error: {frameState.error}
            </details>
          </div>
        )}
        {/* frameState.state === "ready" => rendered via inkSoft */}
      </div>
      <Script
        type="text/javascript"
        language="javascript"
        src="https://stores.inksoft.com/designer/html5/common/js/launcher.js"
        strategy={"lazyOnload"} // after assets loaded per https://nextjs.org/docs/api-reference/next/script#lazyonload
        onLoad={() => {
          setFrameState({ state: "loaded" });
        }}
        onReady={() => {
          setFrameState({ state: "ready" });
          launchDesigner("HTML5DS", launchSettings, designerRef.current);
        }}
        onError={(error) => {
          setFrameState({ state: "error", error: error });
        }}
      />
    </>
  );
};

export default DesignIFrame;
