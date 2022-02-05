import { useRouter } from "next/router";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
import { stringify } from "querystring";

export const usePaginatedProducts = (defaultProducts, defaultPagination) => {
  const { query } = useRouter();
  const { data, error } = useSWR("/api/products?" + stringify(query), fetcher);

  return {
    error,
    data: data || { products: defaultProducts, pagination: defaultPagination },
    isLoading: !error && !data,
  };
};
