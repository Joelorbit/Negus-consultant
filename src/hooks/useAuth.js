import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";

export const useRegister = () =>
  useMutation({
    mutationFn: async (userData) => {
      const res = await axios.post("/users/register", userData);
      // Registration returns a message; login returns the JWT token.
      return res.data;
    },
  });

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials) => {
      const res = await axios.post("/users/login", credentials);

      if (res.data.token) localStorage.setItem("token", res.data.token);
      return res.data.user || res.data;
    },
    onSuccess: (user) => queryClient.setQueryData(["me"], user),
  });
};

export const useGoogleAuth = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credential) => {
      const res = await axios.post("/users/google", { credential });
      if (res.data.token) localStorage.setItem("token", res.data.token);
      return res.data.user;
    },
    onSuccess: (user) => queryClient.setQueryData(["me"], user),
  });
};

export const useVerifyEmail = () =>
  useMutation({
    mutationFn: async (token) => {
      const res = await axios.post("/users/verify-email", { token });
      return res.data;
    },
  });

export const useResendVerification = () =>
  useMutation({
    mutationFn: async (email) => {
      const res = await axios.post("/users/resend-verification", { email });
      return res.data;
    },
  });

export const useUploadImage = (userId) => {
  return useMutation({
    mutationFn: async (base64EncodedImage) => {
      const res = await axios.post(`/users/upload/${userId}`, {
        data: base64EncodedImage,
      });
      return res.data;
    },
  });
};

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: () => axios.get("/users/me").then((res) => res.data),
    enabled: Boolean(localStorage.getItem("token")),
    retry: false,
  });

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      // call server logout for parity, but also clear client token
      try {
        const res = await axios.post("/users/logout");
        localStorage.removeItem("token");
        return res.data;
      } catch (err) {
        localStorage.removeItem("token");
        throw err;
      }
    },
    onSettled: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });
};
