import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

// ----------- BLOGS -----------

export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/blogs");
      return data.blogs;
    },
  });
};

export const useGetBlogById = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/blogs/${id}`);
      return data.blog;
    },
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBlog) => {
      const res = await axiosInstance.post("/blogs", newBlog);
      return res.data;
    },
    onSuccess: () => {
      // Refaetch blog after creation
      queryClient.invalidateQueries(["blogs"]);
    },
  });
};
// ----------- COMMENTS -----------

export const useGetComments = (id) => {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/blogs/${id}/comments`);
      return data.comments;
    },
  });
};
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newComment) => {
      const res = await axiosInstance.post("/blogs/comments", newComment);
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["comments", variables.post_id]);
    },
  });
};
// ----------- LIKES -----------
export const useGetLikesCount = (id, user_id) => {
  return useQuery({
    queryKey: ["likes", id, user_id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/blogs/${id}/${user_id}/likes`);
      return res.data;
    },
    enabled: !!(id && user_id), // Only run query if both id and user_id are provided
  });
};

export const useCreateLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ post_id, user_id }) => {
      const res = await axiosInstance.post("/blogs/likes", {
        post_id,
        user_id,
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate specific likes query
      queryClient.invalidateQueries([
        "likes",
        variables.post_id,
        variables.user_id,
      ]);
    },
  });
};
// export const useCreateLike = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({ post_id, user_id }) => {
//       const { data } = await axiosInstance.post("/likes", {
//         post_id,
//         user_id,
//       });
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["likes"] });
//     },
//   });
// };
//cv building
//online credit card payment sevice
//letest scholarship
export const useDeleteLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, user_id }) => {
      await axiosInstance.delete(`/blogs/${id}/${user_id}/likes`);
    },
    onSuccess: (data, variables) => {
      // Invalidate specific likes query
      queryClient.invalidateQueries(["likes", variables.id, variables.user_id]);
    },
  });
};
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedBlog }) => {
      const res = await axiosInstance.put(`/blogs/${id}`, updatedBlog);
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["blogs"]);
      queryClient.invalidateQueries(["blog", variables.id]);
    },
  });
};
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/blogs/${id}`);
      return res.data;
    },
    onSuccess: (data, id) => {
      // Refetch blog list after deletion
      queryClient.invalidateQueries(["blogs"]);
      // Optionally remove specific blog cache
      queryClient.removeQueries(["blog", id]);
    },
  });
};
