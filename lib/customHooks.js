import * as React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
import { stringify } from "qs";

export const usePaginatedProducts = (defaultProducts, defaultPagination) => {
  const { query, params } = useRouter();
  const endpoint = "/api/products?" + stringify({ ...query, ...params });
  const res = useSWR(endpoint, fetcher);
  const [quote, setQuote] = React.useState();

  const page = query.page || 1;

  let products, pagination;

  if (page == 1) {
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

  return {
    isLoading,
    data: { products, pagination },
    setQuote,
    error: res.error,
  };
};
