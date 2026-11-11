import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

const hasAuthToken = () => {
  try {
    return Boolean(localStorage.getItem("token"));
  } catch {
    return false;
  }
};

// Submit mentor application (form data + optional availability + optional documents)
export const useSubmitMentorApplication = () => {
  const qc = useQueryClient();
  return useMutation({
    // payload: { form, availability, documents, whatsapp_phone }
    mutationFn: async ({ form, availability, documents, whatsapp_phone }) => {
      // 1) Submit the mentor application form + availability JSON
      const appRes = await axiosInstance.post("/mentors/applications", {
        form_data: form,
        availability,
        whatsapp_phone: whatsapp_phone || null,
      });

      const application = appRes.data?.data;
      const applicationId = application?.id;

      // 2) If we have files to upload and a valid application id, upload documents once.
      const docsWithFiles = Array.isArray(documents)
        ? documents.filter((d) => d && d.file)
        : [];

      if (applicationId && docsWithFiles.length > 0) {
        const formData = new FormData();
        const types = [];

        for (const doc of docsWithFiles) {
          formData.append("documents", doc.file);
          types.push(doc.type || "other");
        }

        formData.append("types", JSON.stringify(types));

        await axiosInstance.post(
          `/mentors/applications/${applicationId}/documents`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
      }

      return appRes.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["mentor-application"], { exact: false });
    },
  });
};

// Upload documents for a given application id (standalone use)
export const useUploadMentorDocuments = (applicationId) => {
  const qc = useQueryClient();
  return useMutation({
    // payload: { files: File[], types?: string[] }
    mutationFn: async ({ files, types }) => {
      if (!applicationId) {
        throw new Error("applicationId is required to upload documents");
      }

      const formData = new FormData();
      const safeFiles = Array.isArray(files) ? files.filter(Boolean) : [];
      const resolvedTypes = Array.isArray(types) ? types : [];

      safeFiles.forEach((file, idx) => {
        formData.append("documents", file);
        // Default to "other" if type is missing
        const t = resolvedTypes[idx] || "other";
        resolvedTypes[idx] = t;
      });

      if (safeFiles.length > 0) {
        formData.append("types", JSON.stringify(resolvedTypes));
      }

      const res = await axiosInstance.post(
        `/mentors/applications/${applicationId}/documents`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["mentor-application"], { exact: false });
    },
  });
};

// Fetch current user's latest application with documents + verification
export const useMyMentorApplication = () =>
  useQuery({
    queryKey: ["mentor-application", "me"],
    queryFn: async () => {
      const res = await axiosInstance.get("/mentors/applications/me");
      return res.data;
    },
    enabled: hasAuthToken(),
    retry: false,
  });

export const useMentor = ({
  page = 1,
  per_page = 12,
  search = "",
  min_price,
  max_price,
}) =>
  useQuery({
    queryKey: [
      "mentors",
      page,
      per_page,
      search,
      min_price,
      max_price,
    ],
    queryFn: async () => {
      const res = await axiosInstance.get("/mentors", {
        params: {
          page,
          per_page,
          search,
          min_price,
          max_price,
        },
      });
      return res.data;
    },
    placeholderData: keepPreviousData,
    retry: false,
  });

// Mentor profile
export const useMyMentorProfile = () =>
  useQuery({
    queryKey: ["mentor-profile", "me"],
    queryFn: async () => {
      const res = await axiosInstance.get("/mentors/profile/me");
      return res.data;
    },
    enabled: hasAuthToken(),
    retry: false,
  });

export const useUpsertMentorProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("/mentors/profile", payload);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["mentor-profile", "me"]);
    },
  });
};

// Connections
export const useRequestMentorConnection = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("/mentors/connections", payload);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["mentor-connections", "me"]);
    },
  });
};

export const useMyConnections = () =>
  useQuery({
    queryKey: ["mentor-connections", "me"],
    queryFn: async () => {
      const res = await axiosInstance.get("/mentors/connections/me");
      return res.data;
    },
    enabled: hasAuthToken(),
  });

export const useRespondConnection = (id) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (status) => {
      const res = await axiosInstance.patch(`/mentors/connections/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["mentor-connections", "me"]);
    },
  });
};
