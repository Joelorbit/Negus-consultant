import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

// Fetch paginated scholarships
export const useScholarships = (page = 1) => {
  return useQuery({
    queryKey: ["scholarships", page],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/scholarships?page=${page}`);
      return data;
    },
    keepPreviousData: true,
  });
};

// Fetch single scholarship by id
export const useScholarshipById = (id) => {
  return useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/scholarships/${id}`);
      return data.scholarship;
    },
    enabled: !!id,
  });
};

// Fetch comments for a scholarship
export const useScholarshipComments = (id) => {
  return useQuery({
    queryKey: ["scholarship-comments", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/scholarships/${id}/comments`);
      return data.comments;
    },
    enabled: !!id,
  });
};

// Fetch likes info (count + whether current user liked)
export const useScholarshipLikes = (id) => {
  return useQuery({
    queryKey: ["scholarship-likes", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/scholarships/${id}/likes`);
      return data;
    },
    enabled: !!id,
  });
};

// Toggle like/unlike for a scholarship
export const useToggleScholarshipLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosInstance.post(`/scholarships/${id}/like`);
      return data;
    },
    onSuccess: (_data, variables) => {
      // Refresh likes info and scholarship lists
      queryClient.invalidateQueries(["scholarship-likes", variables.id]);
      queryClient.invalidateQueries({ queryKey: ["scholarships"] });
      queryClient.invalidateQueries(["scholarship", variables.id]);
    },
  });
};

// Add a comment to a scholarship
export const useAddScholarshipComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, content }) => {
      const { data } = await axiosInstance.post(
        `/scholarships/${id}/comments`,
        { content },
      );
      return data.comment;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(["scholarship-comments", variables.id]);
      queryClient.invalidateQueries(["scholarships"]);
    },
  });
};

// Admin/semiadmin: create scholarship
export const useCreateScholarship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post("/scholarships", payload);
      return data.scholarship;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholarships"] });
    },
  });
};

// Admin: update scholarship
export const useUpdateScholarship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await axiosInstance.put(`/scholarships/${id}`, payload);
      return data.scholarship;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(["scholarship", variables.id]);
      queryClient.invalidateQueries({ queryKey: ["scholarships"] });
    },
  });
};

// Admin: delete scholarship
export const useDeleteScholarship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/scholarships/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholarships"] });
    },
  });
};
