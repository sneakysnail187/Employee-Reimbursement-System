import { axiosInstance } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (token : string) => {
      const resp = await axiosInstance.post("/auth/logout", {token});
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
      router.navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });
}
