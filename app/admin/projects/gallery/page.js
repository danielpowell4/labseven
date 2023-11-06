"use server";

import InfiniteScroll from "./InfiniteScroll";

export default async function GalleryPage() {
  const origin = process.env.VERCEL_URL || "http://localhost:3000";
  const endpoint = `${origin}/api/project/list`;
  console.log("endpoint");

  const firstPage = await fetch(`${origin}/api/project/list`, {
    cache: "no-cache",
  }).then((res) => res.json());

  if (!firstPage.items.length) {
    return <div>No projects found. Come back soon!</div>;
  }

  return <InfiniteScroll firstPage={firstPage} />;
}
