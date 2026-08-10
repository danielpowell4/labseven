import * as React from "react";

import { getAllLocationSlugs, getLocationMeta } from "lib/locations";

import { isMobile } from "lib/utils";
import { ClipboardCopy } from "components";
import TrackedPhoneLink from "./TrackedPhoneLink";

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
  };
}

/**
 * Every location shares the main Englewood number, so the `location` search
 * param only affects call tracking, not the number we show.
 */
export default async function ContactPhoneWrapper({ locationSlug }) {
  const { hqPhoneFormatted, hqTelLink } = await getLocationProps();

  if (isMobile()) {
    return (
      <>
        <TrackedPhoneLink href={hqTelLink} location={locationSlug || "englewood"}>
          {hqPhoneFormatted}
        </TrackedPhoneLink>
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
