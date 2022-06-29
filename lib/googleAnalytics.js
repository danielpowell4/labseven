export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export const pageview = (url) => {
  if (GOOGLE_ANALYTICS_ID)
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
};
