import { useQuery } from "@tanstack/react-query";
// import axios from "../lib/axiosInstance";
import axiosInstance from "../lib/axiosInstance";
export const useDailyActiveUsers = (days) => {
  return useQuery({
    queryKey: ["analytics", "dailyActiveUsers", days],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/analytics/daily", {
        day: days,
      });
      return data.data; // your controller returns { data: [...] }
    },
    keepPreviousData: true,
  });
};

//  Realtime users
export const useRealtimeUsers = () => {
  return useQuery({
    queryKey: ["analytics", "realtimeUsers"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/analytics/realtime");
      return data.data;
    },
    refetchInterval: 15000, // auto-refresh every 15 seconds
  });
};

// Aggregated users (daily, weekly, monthly)
export const useAggregatedUsers = (range) => {
  return useQuery({
    queryKey: ["analytics", "aggregatedUsers", range],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/analytics/aggregated", {
        range,
      });
      return data.data;
    },
    keepPreviousData: true,
  });
};
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });
};
