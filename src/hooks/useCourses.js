import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";

// Get all courses with optional filters
export const useCourses = (filters = {}) => {
  return useQuery({
    queryKey: ["courses", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== "all") {
        params.append("category", filters.category);
      }

      if (filters.level) params.append("level", filters.level);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);

      const res = await axios.get(`/courses/public?${params}`);
      return res.data.data;
    },
  });
};

// Get course by ID
export const useCourseById = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axios.get(`/courses/public/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};

// Get categories
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("/courses/categories");
      return res.data.data;
    },
  });
};

// Admin functions (require authentication)
export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseData) => {
      const res = await axios.post("/courses", courseData);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, courseData }) => {
      const res = await axios.put(`/courses/${id}`, courseData);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/courses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

export const useAllCoursesAdmin = () => {
  return useQuery({
    queryKey: ["coursesAdmin"],
    queryFn: async () => {
      const res = await axios.get("/courses");
      return res.data.data;
    },
  });
};

export const useCourseComments = (courseId) => {
  return useQuery({
    queryKey: ["courseComments", courseId],
    queryFn: async () => {
      const res = await axios.get(`/courses/${courseId}/comments`);
      return res.data.data;
    },
    enabled: !!courseId,
  });
};

export const useCreateCourseComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user_id, course_id, comment }) => {
      const res = await axios.post("/courses/comments", {
        user_id,
        course_id,
        comment,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courseComments"]);
    },
  });
};
