import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";

const fetchMessages = async ({
  page = 1,
  limit = 10,
  status = "all",
  search = "",
}) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  if (status && status !== "all") params.append("status", status);
  if (search) params.append("search", search);

  const res = await axios.get(`/contact?${params.toString()}`);
  return res.data;
};

export function useContactMessages({
  page = 1,
  limit = 10,
  status = "all",
  search = "",
}) {
  const queryClient = useQueryClient();

  const queryKey = ["contactMessages", page, limit, status, search];

  const query = useQuery({
    queryKey,
    queryFn: () => fetchMessages({ page, limit, status, search }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 1,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => axios.put(`/contact/${id}`, { status }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] }),
  });

  const removeMessage = useMutation({
    mutationFn: (id) => axios.delete(`/contact/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] }),
  });

  return {
    ...query,
    updateStatus,
    removeMessage,
  };
}

export function useCreateContactMessage() {
  return useMutation({
    mutationFn: (message) => axios.post("/contact", message).then((res) => res.data),
  });
}

export default useContactMessages;
