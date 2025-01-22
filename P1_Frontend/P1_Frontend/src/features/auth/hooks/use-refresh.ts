import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";

export function useRefresh() {
  return useMutation({
    mutationFn: async () => {
      const resp = await axiosInstance.post("/auth/refresh", localStorage.getItem("refresh"), {headers: {'Authorization': localStorage.getItem("token")}});
      localStorage.setItem("token", resp.data.token);
      return resp.data;
    }
  });
}