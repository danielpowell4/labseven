"use client";

import Image from "next/image";
import Link from "next/link";

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
      {projects.map((project, projectIndex) => {
        return (
          <li key={project.id} className={styles.galleryGrid__item}>
            <Link href={`/gallery/${project.slug}`}>
              <Image
                src={project.primary_blob_url}
                width={375}
                height={563}
                priority={projectIndex < 6}
                className={styles.primaryImage}
              />
              <Image
                src={project.secondary_blob_url}
                width={375}
                height={563}
                priority={false}
                className={styles.secondaryImage}
              />
            </Link>
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
