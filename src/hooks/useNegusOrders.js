// src/hooks/useNegusOrders.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

export const useCreateEssayOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post("/orders/essay", payload);
      return data; // { order, invoice }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
};

export const useCreateFixedServiceOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post(
        "/orders/fixed-service",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
};

export const useCreateMentorshipOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post("/orders/mentorship", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
};

export const useCreateApplicationPackageOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post(
        "/orders/application-package",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
};

export const useOrder = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/orders/${orderId}`);
      return data; // { ...order, invoices }
    },
    enabled: !!orderId,
  });
};

export const useMyOrders = () => {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/orders/mine");
      return data;
    },
  });
};

// admin — mirrors the pattern of your existing Applications/Packages dashboard pages
export const useAdminOrders = (status) => {
  return useQuery({
    queryKey: ["admin-orders", status],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/orders", {
        params: status ? { status } : {},
      });
      return data;
    },
  });
};

export const useGenerateNextRoundInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, roundNumber }) => {
      const { data } = await axiosInstance.post(`/orders/${orderId}/rounds`, {
        roundNumber,
      });
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });
};
