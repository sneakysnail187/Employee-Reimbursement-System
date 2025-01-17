import { axiosInstance } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const deadToken = localStorage.getItem("token");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      const resp = await axiosInstance.post("/auth/logout", {deadToken}); 
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });
}
