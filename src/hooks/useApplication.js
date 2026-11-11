import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";

// ----------- APPLICATIONS -----------

export const useGetApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data } = await axios.get("/applications");
      return data.applications;
    },
  });
};

export const useGetApplicationById = (id) => {
  return useQuery({
    queryKey: ["application", id],
    queryFn: async () => {
      const { data } = await axios.get(`/applications/${id}`);
      return data.application;
    },
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newApp) => {
      // Accept either the raw form object or an object with { formData }
      const payload = newApp.formData ? newApp.formData : newApp;
      // Map client keys to server snake_case
      const mapped = {
        user_id: payload.user_id,
        phone: payload.phone,
        telegram: payload.telegram,
        dob: payload.dob,
        referral: payload.referral,
        academic_status: payload.academicStatus || payload.academic_status,
        school: payload.school,
        gpa: payload.gpa,
        transcript: payload.transcript,
        matric_certificate:
          payload.matricCertificate || payload.matric_certificate,
        exam_score: payload.examScore || payload.exam_score,
        class_rank: payload.classRank || payload.class_rank,
        tests: payload.tests,
        scores: payload.scores,
        top_universities: payload.topUniversities || payload.top_universities,
        family_contribution:
          payload.familyContribution || payload.family_contribution,
        screenshot_string: payload.screenshot_string,
        package_id: payload.package_id,
      };
      const res = await axios.post("/applications", mapped);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
    },
  });
};
