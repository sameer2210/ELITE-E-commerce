import { useCallback, useEffect, useRef, useState } from "react";
import axios from "../../api/config";

export const useProductSearch = ({
  minChars = 2,
  limit = 8,
  debounceMs = 250,
} = {}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const abortRef = useRef(null);
  const debounceRef = useRef(null);
  const cacheRef = useRef(new Map());

  const clear = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    setQuery("");
    setResults([]);
    setLoading(false);
    setError("");
  }, []);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < minChars) {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      setResults([]);
      setLoading(false);
      setError("");
      return;
    }

    const normalized = trimmed.toLowerCase();
    if (cacheRef.current.has(normalized)) {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      setResults(cacheRef.current.get(normalized));
      setLoading(false);
      setError("");
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setLoading(true);
    setError("");

    debounceRef.current = setTimeout(async () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const { data } = await axios.get("/products", {
          params: {
            q: trimmed,
            _limit: limit,
          },
          signal: controller.signal,
        });
        cacheRef.current.set(normalized, data);
        setResults(data);
      } catch (err) {
        if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") {
          return;
        }
        console.error("Product search failed:", err);
        setResults([]);
        setError("Failed to search products. Please try again.");
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, minChars, limit, debounceMs]);

  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    minChars,
    clear,
  };
};
