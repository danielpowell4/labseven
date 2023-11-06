"use server";

import InfiniteScroll from "./InfiniteScroll";

export default async function GalleryPage() {
  const origin =
    process.env.VERCEL_ENV === "development"
      ? "http://localhost:3000"
      : "https://labseven.co";

  const firstPage = await fetch(`${origin}/api/project/list`, {
    next: { tags: ["projects"] },
  }).then((res) => res.json());

  if (!firstPage.items.length) {
    return <div>No projects found. Come back soon!</div>;
  }

  return <InfiniteScroll firstPage={firstPage} />;
}
