import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { http } from "../../api/config";
import { useDebouncedValue } from "../useDebouncedValue";

export const useProjectSearch = ({
  minChars = 2,
  limit = 8,
  debounceMs = 250,
  endpoint = "/api/projects",
} = {}) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, debounceMs);
  const trimmed = debouncedQuery.trim();
  const enabled = trimmed.length >= minChars;

  const populate = "developerId,category,technologies,awards";

  const queryKey = useMemo(
    () => [
      "project-search",
      { endpoint, q: trimmed.toLowerCase(), limit, populate },
    ],
    [endpoint, trimmed, limit, populate]
  );

  const { data, isFetching, error } = useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      const { data: result } = await http.get(endpoint, {
        params: { q: trimmed, _limit: limit, populate },
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
    error: error ? "Failed to search projects. Please try again." : "",
    minChars,
    clear,
  };
};
