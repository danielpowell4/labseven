import { notFound } from "next/navigation";
import * as React from "react";

const locationParams = {
  englewood: {
    isHeadquarters: true,
    name: "Englewood",
    slug: "englewood",
    possessive: "Englewood's",
    callCta: "Call Lab Seven Englewood",
    phoneFormatted: "(303) 814-3389",
    phoneTel: "+13038143389",
    position: 1,
  },
  denver: {
    isHeadquarters: false,
    name: "Denver",
    slug: "denver",
    possessive: "Denver's",
    callCta: "Call Lab Seven Denver",
    phoneFormatted: "(720) 708-6192",
    phoneTel: "+17207086192",
    position: 2,
  },
  aurora: {
    isHeadquarters: false,
    name: "Aurora",
    slug: "aurora",
    possessive: "Aurora's",
    callCta: "Call Lab Seven Aurora",
    phoneFormatted: "(303) 529-6583",
    phoneTel: "+13035296583",
    position: 3,
  },
  boulder: {
    isHeadquarters: false,
    name: "Boulder",
    slug: "boulder",
    possessive: "Boulder's",
    callCta: "Call Lab Seven Boulder",
    phoneFormatted: "(720) 780-1205",
    phoneTel: "+17207801205",
    position: 4,
  },
  coloradoSprings: {
    isHeadquarters: false,
    name: "Colorado Springs",
    slug: "colorado-springs",
    possessive: "Colorado Springs'",
    callCta: "Call Our Springs Office",
    phoneFormatted: "(719) 283-3160",
    phoneTel: "+17192833160",
    position: 5,
  },
  fortCollins: {
    isHeadquarters: false,
    name: "Fort Collins",
    possessive: "Fort Collins'",
    callCta: "Call Lab Seven FoCo",
    slug: "fort-collins",
    phoneFormatted: "(720) 730-5435",
    phoneTel: "+17207305435",
    position: 6,
  },
};

export async function generateStaticParams() {
  const locationSlugs = Object.keys(locationParams);
  return locationSlugs.map((slug) => ({ slug }));
}

const LocationPage = async ({ params }) => {
  const slug = params.slug;
  const fields = locationParams[slug];

  if (!fields) {
    return notFound();
  }

  return (
    <div>
      <pre>{JSON.stringify(fields, null, 2)}</pre>
    </div>
  );
};

export default LocationPage;
