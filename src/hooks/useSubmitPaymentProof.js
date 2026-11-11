import { useMutation } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";

export const useSubmitPaymentProof = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `/payments/${data.user_id}/${data.package_id}`,
        data
      );
      return response.data;
    },
  });
};
