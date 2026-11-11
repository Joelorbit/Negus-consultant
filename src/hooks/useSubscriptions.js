import axiosInstance from "../lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const res = await axiosInstance.get("/subscriptions");
      return res.data;
    },
  });
};

export const useSubscriptionById = (user_id) => {
  return useQuery({
    queryKey: ["subscriptions", user_id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/subscriptions/${user_id}`);
      return res.data?.data || null;
    },
    enabled: !!user_id,
    //Becouse we dont want to anoy user proflie with 404 if not subscibed yet every second render
    retry: false,
  });
};

export const useCreateSubscriptions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newSubscription) => {
      const res = await axiosInstance.post("/subscriptions", newSubscription);
      return res.data;
    },
    onSuccess: () => {
      // Refaetch blog after creation
      queryClient.invalidateQueries(["subscriptions"]);
    },
  });
};
// Activate subscription (admin)

export const useActivateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.patch(`/subscriptions/${id}/activate`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["subscriptions"]);
    },
    onError: (e) => {
      console.error("Error activating subscription:", e);
    },
  });
};
// Update subscription
export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }) => {
      const res = await axiosInstance.patch(`/subscriptions/${id}`, updates);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["subscriptions"]),
    onError: (e) => console.error(e),
  });
};

// Delete subscription
export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subscriptionId) => {
      const res = await axiosInstance.delete(
        `/subscriptions/${subscriptionId}`
      );
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["subscriptions"]),
    onError: (e) => console.error(e),
  });
};
export const useReferrals = () => {
  return useQuery({
    queryKey: ["referrals"],
    queryFn: async () => {
      const res = await axiosInstance.get("/subscriptions/referrals"); // backend endpoint to get referral users
      return res.data?.data || [];
    },
  });
};
export const useReferralsTree = () => {
  return useQuery({
    queryKey: ["referralsTree"],
    queryFn: async () => {
      const res = await axiosInstance.get("/subscriptions/referrals/tree"); // backend endpoint to get referral tree
      return res.data?.data || [];
    },
  });
};

// Pay referral (admin action)
export const usePayReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      const res = await axiosInstance.patch(
        `/subscriptions/referrals/${userId}/pay`
      ); // backend endpoint to pay referral
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["referrals"]); // refresh referral users
    },
    onError: (e) => {
      console.error("Error paying referral:", e);
    },
  });
};
