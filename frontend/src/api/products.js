import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { http } from "./config";

const buildParams = ({ search, page, limit, start } = {}) => {
  const params = {};
  if (search) params.q = search;
  if (typeof start === "number") params._start = start;
  if (typeof limit === "number") params._limit = limit;
  if (typeof page === "number") params.page = page;
  return params;
};

const fetchProducts = async ({ search, page, limit, start, signal }) => {
  const { data } = await http.get("/products", {
    params: buildParams({ search, page, limit, start }),
    signal,
  });
  return data;
};

export const useProducts = ({ search = "", page, limit = 20, start } = {}) =>
  useQuery({
    queryKey: ["products", { search, page, limit, start }],
    queryFn: ({ signal }) =>
      fetchProducts({ search, page, limit, start, signal }),
  });

export const useInfiniteProducts = ({ search = "", limit = 6 } = {}) =>
  useInfiniteQuery({
    queryKey: ["products", { search, limit, mode: "infinite" }],
    queryFn: ({ pageParam = 0, signal }) =>
      fetchProducts({
        search,
        limit,
        start: pageParam,
        signal,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!Array.isArray(lastPage)) return undefined;
      if (lastPage.length < limit) return undefined;
      return allPages.length * limit;
    },
    initialPageParam: 0,
  });

export const useProduct = (id) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: async ({ signal }) => {
      const { data } = await http.get(`/products/${id}`, { signal });
      return data;
    },
    enabled: Boolean(id),
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await http.post("/products", payload);
      return data;
    },
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (created?.id || created?._id) {
        queryClient.setQueryData(
          ["product", created.id || created._id],
          created
        );
      }
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await http.patch(`/products/${id}`, payload);
      return data;
    },
    onSuccess: (updated, variables) => {
      if (variables?.id) {
        queryClient.setQueryData(["product", variables.id], updated);
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await http.delete(`/products/${id}`);
      return data;
    },
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

