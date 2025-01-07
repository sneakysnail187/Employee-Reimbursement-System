import { toast } from "sonner";
import { LoginSchema } from "../schema/login-schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { useRouter } from "@tanstack/react-router";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: LoginSchema) => {
      const resp = await axiosInstance.post("/auth/login", values);
      console.log(resp.data);
      localStorage.setItem("token", resp.data);
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
      toast.success("Logged in successfully.");
      router.navigate({ to: "/tickets/userTickets" });
    },
    onError: () => {
      toast.error("Failed to login.");
    },
  });
}
