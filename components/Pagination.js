import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import pageStyles from "./Pagination.module.css";

const PageItem = ({ pageNumber, active, children, placeholder = false }) => {
  const router = useRouter();

  return (
    <li
      className={`${pageStyles.pageItem} ${
        active ? pageStyles.pageItemIsActive : ""
      } ${placeholder ? pageStyles.pageItemWithNoAction : ""}`}
    >
      {placeholder ? (
        <a>{children}</a>
      ) : (
        <Link
          href={{
            pathname: router.pathname,
            query: { ...router.query, page: pageNumber },
          }}
          shallow
          replace
        >
          <a>{children}</a>
        </Link>
      )}
    </li>
  );
};

const PageNumber = ({ pageNumber, currentPage }) => {
  return (
    <PageItem pageNumber={pageNumber} active={pageNumber == currentPage}>
      {pageNumber}
    </PageItem>
  );
};

const Pagination = ({ pagination, inGrid = false }) => {
  // hide if page undefined or irrelevant
  if (!pagination || !pagination.totalPages || pagination.totalPages === 1) {
    return null;
  }

  return (
    <ul
      className={pageStyles.pagination}
      style={inGrid ? { gridColumn: "1/-1" } : {}}
    >
      {/* back arrow */}
      <PageItem pageNumber={pagination.prevPage || 1}>
        <span role="img" aria-label="Previous Page">
          ⬅️
        </span>
      </PageItem>
      {/* first page */}
      <PageNumber pageNumber={1} currentPage={pagination.currentPage} />
      {/* build range of pageNumbers from start + 1 --> end - 1 */}
      {Array(pagination.totalPages - 2)
        .fill("")
        .map((_, i) => {
          let pageNumber = i + 2;
          let diff = Math.abs(pageNumber - pagination.currentPage);
          let distanceFromEnd = pagination.totalPages - pagination.currentPage;
          let spacer =
            pagination.currentPage < 5 // on left end
              ? 6 - pagination.currentPage
              : distanceFromEnd < 4 // on right end
              ? 5 - distanceFromEnd
              : 2; // typical case

          // skip if not close to currentPage
          if (diff > spacer) {
            return null;
          }
          // render '...' if 2 away (typically) and not first or last in range
          if (
            diff === spacer &&
            ![2, pagination.totalPages - 1].includes(pageNumber)
          ) {
            return (
              <PageItem placeholder key={pageNumber}>
                ...
              </PageItem>
            );
          }

          // render page number
          return (
            <PageNumber
              key={pageNumber}
              pageNumber={pageNumber}
              currentPage={pagination.currentPage}
            />
          );
        })}
      {/* last page */}
      <PageNumber
        pageNumber={pagination.totalPages}
        currentPage={pagination.currentPage}
      />
      {/* next page */}
      <PageItem pageNumber={pagination.nextPage || pagination.totalPages}>
        <span role="img" aria-label="Next Page">
          ➡️
        </span>
      </PageItem>
    </ul>
  );
};

export default Pagination;
