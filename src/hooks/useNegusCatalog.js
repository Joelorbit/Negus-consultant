// src/hooks/useNegusCatalog.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

export const usePackageOffer = () =>
  useQuery({
    queryKey: ["package-offer"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/catalog/package-offer");
      return data;
    },
    retry: false,
  });

export const useUpdatePackageOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (discountPercent) => {
      const { data } = await axiosInstance.put("/catalog/package-offer", {
        discountPercent,
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["package-offer"], data);
    },
  });
};

export const useFixedServices = () => {
  return useQuery({
    queryKey: ["fixed-services"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/catalog/fixed-services");
      return data;
    },
  });
};

export const useEssayPricingRates = () => {
  return useQuery({
    queryKey: ["essay-pricing-rates"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/catalog/essay-pricing-rates");
      return data;
    },
  });
};

// Live price quote as the user fills out an essay order form
export const useEssayQuote = ({ serviceType, turnaroundDays, wordCount }) => {
  return useQuery({
    queryKey: ["essay-quote", serviceType, turnaroundDays, wordCount],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/catalog/essay-quote", {
        params: { serviceType, turnaroundDays, wordCount },
      });
      return data;
    },
    enabled: !!serviceType && !!turnaroundDays && !!wordCount && wordCount > 0,
  });
};

export const useMentorshipPackages = () => {
  return useQuery({
    queryKey: ["mentorship-packages"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/catalog/mentorship-packages");
      return data;
    },
  });
};

export const useApplicationPackages = () => {
  return useQuery({
    queryKey: ["application-packages"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/catalog/application-packages");
      return data;
    },
  });
};
