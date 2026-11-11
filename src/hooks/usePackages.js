import axios from "../lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const usePackages = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axios.get("/packages");
      return res.data;
    },
  });
};
export const usePackageById = (id) => {
  return useQuery({
    // make it unique per package
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axios.get(`/packages/${id}`);
      return res.data;
    },
    // only fetch if id is truthy
    enabled: !!id,
  });
};

export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPackage) => {
      const res = await axios.post("/packages", newPackage);
      return res.data;
    },
    onSuccess: () => {
      // Refetch packages after creation
      queryClient.invalidateQueries(["packages"]);
    },
  });
};
export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/packages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["packages"]);
    },
  });
};
