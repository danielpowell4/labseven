"use server";

import InfiniteScroll from "./InfiniteScroll";
import styles from "./gallery.module.css";

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

  return (
    <main className={styles.main}>
      <h2>Our Work</h2>
      <InfiniteScroll firstPage={firstPage} />
    </main>
  );
}
