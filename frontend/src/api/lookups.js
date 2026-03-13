import { useQuery } from "@tanstack/react-query";
import { http } from "./config";

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async ({ signal }) => {
      const { data } = await http.get("/api/categories", { signal });
      return data;
    },
  });

export const useTechnologies = () =>
  useQuery({
    queryKey: ["technologies"],
    queryFn: async ({ signal }) => {
      const { data } = await http.get("/api/technologies", { signal });
      return data;
    },
  });

