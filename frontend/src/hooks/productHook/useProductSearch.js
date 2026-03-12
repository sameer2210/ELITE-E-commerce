import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { http } from "../../api/config";
import { useDebouncedValue } from "../useDebouncedValue";

export const useProductSearch = ({
  minChars = 2,
  limit = 8,
  debounceMs = 250,
} = {}) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, debounceMs);
  const trimmed = debouncedQuery.trim();
  const enabled = trimmed.length >= minChars;

  const queryKey = useMemo(
    () => ["product-search", { q: trimmed.toLowerCase(), limit }],
    [trimmed, limit]
  );

  const { data, isFetching, error } = useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      const { data: result } = await http.get("/products", {
        params: { q: trimmed, _limit: limit },
        signal,
      });
      return result;
    },
    enabled,
  });

  const clear = useCallback(() => {
    setQuery("");
  }, []);

  return {
    query,
    setQuery,
    results: enabled ? data || [] : [],
    loading: isFetching,
    error: error ? "Failed to search products. Please try again." : "",
    minChars,
    clear,
  };
};
