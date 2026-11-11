import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";

export const useAdminListMentorApplications = (status) =>
  useQuery({
    queryKey: ["admin-mentor-applications", status || "all"],
    queryFn: async () => {
      const res = await axios.get(
        `/mentors/admin/applications${status ? `?status=${status}` : ""}`
      );
      return res.data;
    },
    retry: false,
  });

export const useAdminScheduleVerification = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      const res = await axios.post(
        `/mentors/admin/applications/${id}/schedule`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["admin-mentor-applications"]);
    },
  });
};

export const useAdminApproveMentorApplication = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      const res = await axios.post(
        `/mentors/admin/applications/${id}/approve`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["admin-mentor-applications"]);
    },
  });
};

export const useAdminRejectMentorApplication = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      const res = await axios.post(
        `/mentors/admin/applications/${id}/reject`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["admin-mentor-applications"]);
    },
  });
};

// Admin: list documents for a specific mentor application
export const useAdminListMentorDocuments = (applicationId) =>
  useQuery({
    queryKey: ["admin-mentor-documents", applicationId],
    queryFn: async () => {
      if (!applicationId) return { data: [] };
      const res = await axios.get(
        `/mentors/admin/applications/${applicationId}/documents`
      );
      return res.data;
    },
    enabled: Boolean(applicationId),
    retry: false,
  });
