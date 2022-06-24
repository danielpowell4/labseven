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

  const data = React.useMemo(() => {
    let { products, pagination } = res?.data || {
      products: defaultProducts,
      pagination: defaultPagination,
    };

    if (quote && quote.Data) {
      products = products.map((p) => {
        const productQuote = quote.Data.find((q) => q.ProductId === p.ID);
        return productQuote
          ? { ...p, showPrice: true, UnitPrice: productQuote.EachProductTotal }
          : p;
      });
    }

    return { products, pagination };
  }, [res?.data, defaultProducts, defaultPagination, quote]);

  const page = query.page || 1;
  const isLoading = page == 1 ? false : !res.error && !data;

  return {
    isLoading,
    data,
    setQuote,
    error: res.error,
  };
};
