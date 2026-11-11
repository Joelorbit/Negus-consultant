import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";

export const useMentor = ({
  page = 1,
  per_page = 12,
  search = "",
  categories = [],
  min_price,
  max_price,
}) =>
  useQuery({
    queryKey: [
      "mentors",
      page,
      per_page,
      search,
      categories,
      min_price,
      max_price,
    ],
    queryFn: async () => {
      const res = await axios.get("/mentors", {
        params: {
          page,
          per_page,
          search,
          categories: categories.join(","),
          min_price,
          max_price,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

export const useGetMentorById = (id) => {
  return useQuery({
    queryKey: ["mentors", id],
    queryFn: async () => {
      const res = await axios.get(`/mentors/${id}`);
      return res.data;
    },
  });
};

export const useCreateMentor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMentor) => {
      const res = await axios.post("/mentors", newMentor);
      return res.data;
    },
    onSuccess: () => {
      // Refaetch mentor after creation
      queryClient.invalidateQueries(["mentors"]);
    },
  });
};

export const useUpdateMentor = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMentor) => {
      const res = await axios.put(`/mentors/${id}`, newMentor);
      return res.data;
    },
    onSuccess: () => {
      // Refaetch mentor after creation
      queryClient.invalidateQueries(["mentors"]);
    },
  });
};

export const useGetMentorReviews = () => {
  return useQuery({
    queryKey: ["mentorsReviews"],
    queryFn: async () => {
      const res = await axios.get(`/mentors/reviews`);
      return res.data.data;
    },
  });
};

export const useGetMentorReview = (id) => {
  return useQuery({
    queryKey: ["mentorsReview", id],
    queryFn: async () => {
      const res = await axios.get(`/mentors/reviews/${id}`);
      return res.data.data;
    },
  });
};
export const useCreateMentorReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newReview) => {
      const res = await axios.post("/mentors/reviews", newReview);
      return res.data;
    },
    onSuccess: () => {
      // Refaetch mentor after creation
      queryClient.invalidateQueries(["mentors"]);
    },
  });
};

export const useDeleteMentor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/mentors/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mentors"]);
    },
  });
};
