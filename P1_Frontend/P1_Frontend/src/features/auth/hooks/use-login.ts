import { toast } from "sonner";
import { LoginSchema } from "../schema/login-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { useRouter } from "@tanstack/react-router";
import { jwtDecode } from "jwt-decode";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: LoginSchema) => {
      const resp = await axiosInstance.post("/auth/login", values);
      const { data } = resp;
      const { role, ...decoded } = jwtDecode(data) as { role: string };
      localStorage.setItem("role", role);
      localStorage.setItem("token", resp.data);
      return { ...decoded, role };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
      toast.success("Logged in successfully.");
      if(localStorage.getItem("role") === "Employee") router.navigate({ to:"/tickets/userTickets" });
      else{
        router.navigate({ to:"/tickets/allTickets" });
      }
    },
    onError: () => {
      toast.error("Failed to login.");
    },
  });
}
