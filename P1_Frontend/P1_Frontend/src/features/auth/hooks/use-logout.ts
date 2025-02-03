import { protectedInstance } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const token = localStorage.getItem("token") as string | null;

  return useMutation({
    mutationFn: async () => {
      console.log(token); 
      const resp = await protectedInstance.post("/auth/logout", {headers: {'Authorization': token}});
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
