"use client";

import styles from "./gallery.module.css";

import useInfiniteScroll from "react-infinite-scroll-hook";
import useSWRInfinite from "swr/infinite";

import { ThreeDotLoader } from "components";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function InfiniteScroll({ firstPage }) {
  const {
    data: pages = [],
    size,
    setSize,
    isLoading,
    error,
  } = useSWRInfinite((index, previousPageData) => {
    const cursor =
      index === 0 ? firstPage.nextCursor : previousPageData?.nextCursor;
    if (!cursor) return null; // reached end of list

    return `/api/project/list?cursor=${cursor}`;
  }, fetcher);

  const hasNextPage = Boolean(
    firstPage.nextCursor && pages[pages.length - 1]?.nextCursor
  );

  const [loadMoreRef] = useInfiniteScroll({
    disabled: Boolean(error),
    hasNextPage,
    loading: isLoading,
    onLoadMore: () => setSize((prev) => prev + 1),
    rootMargin: "0px 0px 400px 0px",
  });

  // gather projects
  let projects = [...firstPage.items];

  for (const page of pages) {
    for (const item of page.items) {
      if (Boolean(item)) projects.push(item);
    }
  }
  const isLoadingMore =
    isLoading || (size > 1 && pages && typeof pages[size - 2] === "undefined");

  return (
    <ul className={styles.galleryGrid}>
      {projects.map((project) => {
        return (
          <li key={project.id} style={{ overflow: "hidden" }}>
            <pre>{JSON.stringify(project, null, 2)}</pre>
          </li>
        );
      })}
      {isLoadingMore || hasNextPage ? (
        <li ref={loadMoreRef} style={{ gridColumn: "1/-1" }}>
          <ThreeDotLoader />
        </li>
      ) : null}
    </ul>
  );
}
