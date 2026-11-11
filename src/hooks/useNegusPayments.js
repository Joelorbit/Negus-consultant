// src/hooks/useNegusPayments.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

export const useSubmitPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ invoiceId, amountClaimed, data: base64Data }) => {
      const { data } = await axiosInstance.post("/package-payments", {
        invoiceId,
        amountClaimed,
        data: base64Data, // "data:image/png;base64,..."
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
};

// admin
export const usePendingPayments = () => {
  return useQuery({
    queryKey: ["pending-payments"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/package-payments/pending");
      return data;
    },
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (paymentId) => {
      const { data } = await axiosInstance.patch(
        `/package-payments/${paymentId}/verify`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-payments"] });
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });
};

export const useRejectPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ paymentId, reason }) => {
      const { data } = await axiosInstance.patch(
        `/package-payments/${paymentId}/reject`,
        { reason },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-payments"] });
    },
  });
};
