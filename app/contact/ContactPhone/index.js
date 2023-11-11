import * as React from "react";

import { getAllLocationSlugs, getLocationMeta } from "lib/locations";

import ClientDisplay from "./ClientDisplay";

export async function getLocationProps() {
  const allSlugs = getAllLocationSlugs();
  console.log("allSlugs", allSlugs);

  const allLocationMeta = await Promise.all(
    allSlugs.map((slug) => getLocationMeta(slug))
  );

  const defaultLocation = allLocationMeta.find(
    (location) => location.isHeadquarters
  );

  return {
    hqPhoneFormatted: defaultLocation.phoneFormatted,
    hqTelLink: defaultLocation.telLink,
    metaLocationBySlug: allLocationMeta.reduce((acc, location) => {
      acc[location.slug] = location;
      return acc;
    }, {}),
  };
}

export default async function ContactPhoneWrapper() {
  const locationProps = await getLocationProps();

  return <ClientDisplay {...locationProps} />;
}
