import * as React from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { GOOGLE_ANALYTICS_ID, pageview } from "../lib/googleAnalytics";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  React.useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    router.events.on("hashChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
      router.events.off("hashChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <>
      <Component {...pageProps} />
      {!!GOOGLE_ANALYTICS_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');`}
          </Script>
        </>
      )}
    </>
  );
}

export default MyApp;
