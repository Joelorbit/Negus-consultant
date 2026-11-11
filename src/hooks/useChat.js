import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

/**
 * Get messages for a booking's chat room
 */
export const useChatMessages = (bookingId, enabled = true) => {
  return useQuery({
    queryKey: ["chatMessages", bookingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/chat/${bookingId}/messages`);
      return res.data.messages || [];
    },
    enabled: enabled && !!bookingId,
    refetchInterval: 4000, // Poll every 4 seconds
  });
};

/**
 * Send a message (text and/or file)
 */
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, message, file }) => {
      const formData = new FormData();
      
      if (message) {
        formData.append("message", message);
      }
      
      if (file) {
        formData.append("file", file);
      }

      const res = await axiosInstance.post(
        `/chat/${bookingId}/message`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries(["chatMessages", variables.bookingId]);
    },
  });
};




