import * as React from "react";

import { getAllLocationSlugs, getLocationMeta } from "lib/locations";

import Link from "next/link";

import { isMobile } from "lib/utils";
import { ClipboardCopy } from "components";

export async function getLocationProps() {
  const allSlugs = getAllLocationSlugs();

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

export default async function ContactPhoneWrapper({ locationSlug }) {
  const { hqPhoneFormatted, hqTelLink, metaLocationBySlug } =
    await getLocationProps();

  if (locationSlug in metaLocationBySlug) {
    const locationData = metaLocationBySlug[locationSlug];
    const { phoneFormatted, telLink } = locationData;

    if (isMobile()) {
      return (
        <>
          <Link href={telLink}>{phoneFormatted}</Link>
          <ClipboardCopy value={phoneFormatted} />
        </>
      );
    }

    return (
      <>
        {phoneFormatted} <ClipboardCopy value={hqPhoneFormatted} />
      </>
    );
  }

  if (isMobile()) {
    return (
      <>
        <Link href={hqTelLink}>{hqPhoneFormatted}</Link>
        <ClipboardCopy value={hqPhoneFormatted} />
      </>
    );
  }

  return (
    <>
      {hqPhoneFormatted} <ClipboardCopy value={hqPhoneFormatted} />
    </>
  );
}
