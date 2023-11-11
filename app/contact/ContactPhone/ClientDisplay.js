"use client";

import Link from "next/link";

import { isMobile } from "lib/utils";

import { useSearchParams } from "next/navigation";

import * as React from "react";

export default function ContactPhone({
  hqPhoneFormatted,
  hqTelLink,
  metaLocationBySlug,
}) {
  const searchParams = useSearchParams();
  const locationSlug = searchParams.get("location");

  if (locationSlug in metaLocationBySlug) {
    const locationData = metaLocationBySlug[locationSlug];
    const { phoneFormatted, telLink } = locationData;

    if (isMobile()) {
      return <Link href={telLink}>{phoneFormatted}</Link>;
    }

    return phoneFormatted;
  }

  if (isMobile()) {
    return <Link href={hqTelLink}>{hqPhoneFormatted}</Link>;
  }

  return hqPhoneFormatted;
}
