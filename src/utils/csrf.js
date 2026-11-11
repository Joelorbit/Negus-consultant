import axios from "../lib/axiosInstance";

let cachedToken = null;

export async function getCsrfToken() {
  if (cachedToken) return cachedToken;

  const response = await axios.get("/csrf-token", {
    withCredentials: true,
  });

  cachedToken = response.data.csrfToken;
  return cachedToken;
}
