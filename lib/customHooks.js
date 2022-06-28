import * as React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
import { stringify } from "qs";

export const usePaginatedProducts = (
  defaultProducts,
  defaultPagination,
  delay = 350
) => {
  const { query, params, replace } = useRouter();
  const [debouncedQuery, setDebouncedQuery] = React.useState(query);
  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedQuery(query);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [query, delay] // Only re-call effect if value or delay changes
  );

  const endpoint =
    "/api/products?" + stringify({ ...debouncedQuery, ...params });
  const res = useSWR(endpoint, fetcher);
  const [quote, setQuote] = React.useState();

  const page = debouncedQuery.page || 1;

  let products, pagination;

  if (page == 1 && !query) {
    // use server props
    products = defaultProducts;
    pagination = defaultPagination;
  } else if (res?.data) {
    // use loaded data
    products = res.data.products;
    pagination = res.data.pagination;
  } else {
    // show loader while fetching new page
    products = Array(defaultPagination.perPage)
      .fill()
      .map(() => ({ isLoading: true }));
    pagination = { ...defaultPagination, page: page };
  }

  // augment products w/ quote
  if (quote && quote.Data) {
    products = products.map((p) => {
      const productQuote = quote.Data.find((q) => q.ProductId === p.ID);
      return productQuote
        ? { ...p, showPrice: true, UnitPrice: productQuote.EachProductTotal }
        : p;
    });
  }

  const isLoading = page !== 1 && !res.error && !res?.data;

  const setQuery = (nextValue) =>
    // change url via router.replace
    replace({ query: { ...query, ...nextValue } }, undefined, {
      shallow: true,
    });

  return {
    isLoading,
    data: { products, pagination },
    setQuote,
    error: res.error,
    query,
    setQuery,
  };
};
