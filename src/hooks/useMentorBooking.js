import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

// Student requests a booking
export const useRequestMentorBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/mentor_bookings/request", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["studentBookings"]);
      queryClient.invalidateQueries(["mentorBookings"]);
    },
  });
};

// Get student bookings
export const useStudentBookings = () => {
  return useQuery({
    queryKey: ["studentBookings"],
    queryFn: async () => {
      const res = await axiosInstance.get("/mentor_bookings/student");
      return res.data.bookings || [];
    },
  });
};

// Get mentor bookings
export const useMentorBookings = (mentor_profile_id) => {
  return useQuery({
    queryKey: ["mentorBookings", mentor_profile_id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/mentor_bookings/mentor/${mentor_profile_id}`,
      );
      return res.data.bookings || [];
    },
    enabled: !!mentor_profile_id,
  });
};

// Upload payment
export const useUploadPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ booking_id, ...data }) => {
      const res = await axiosInstance.post(
        `/mentor_bookings/${booking_id}/payment`,
        data,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["studentBookings"]);
      queryClient.invalidateQueries(["mentorBookings"]);
    },
  });
};

// Mentor accepts booking
export const useAcceptBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking_id) => {
      const res = await axiosInstance.post(
        `/mentor_bookings/${booking_id}/accept`,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mentorBookings"]);
      queryClient.invalidateQueries(["studentBookings"]);
    },
  });
};

// Mentor rejects booking
export const useRejectBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ booking_id, reason }) => {
      const res = await axiosInstance.post(
        `/mentor_bookings/${booking_id}/reject`,
        { reason },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mentorBookings"]);
      queryClient.invalidateQueries(["studentBookings"]);
    },
  });
};

// Mentor confirms booking (adds meeting link)
export const useConfirmBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ booking_id, meeting_link }) => {
      const res = await axiosInstance.post(
        `/mentor_bookings/${booking_id}/confirm`,
        { meeting_link },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mentorBookings"]);
      queryClient.invalidateQueries(["studentBookings"]);
    },
  });
};

// Cancel booking
export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ booking_id, reason }) => {
      const res = await axiosInstance.post(
        `/mentor_bookings/${booking_id}/cancel`,
        { reason },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mentorBookings"]);
      queryClient.invalidateQueries(["studentBookings"]);
      queryClient.invalidateQueries(["walletBalance"]);
    },
  });
};

// Get wallet balance
export const useWalletBalance = () => {
  return useQuery({
    queryKey: ["walletBalance"],
    queryFn: async () => {
      const res = await axiosInstance.get("/mentor_bookings/wallet/balance");
      return res.data;
    },
  });
};

// Mentor marks session as completed
export const useCompleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking_id) => {
      const res = await axiosInstance.post(
        `/mentor_bookings/${booking_id}/complete`,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mentorBookings"]);
      queryClient.invalidateQueries(["studentBookings"]);
    },
  });
};
