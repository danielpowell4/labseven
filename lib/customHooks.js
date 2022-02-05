import { useRouter } from "next/router";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
import { stringify } from "querystring";

export const usePaginatedProducts = (defaultProducts, defaultPagination) => {
  const { query, params } = useRouter();
  const { data, error } = useSWR(
    "/api/products?" + stringify(query) + stringify(params),
    fetcher
  );

  const page = query.page || 1;
  const isLoading = page == 1 ? false : !error && !data;

  return {
    error,
    data: data || { products: defaultProducts, pagination: defaultPagination },
    isLoading: isLoading,
  };
};
