import { useMutation } from "@tanstack/react-query";
import { RegisterSchema } from "../schema/register-schema";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";

export function useRegister() {
  return useMutation({
    mutationFn: async (values: RegisterSchema) => {
      const resp = await axiosInstance.post("/auth/register", values);
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Account created");
    },
    onError: () => {
      toast.error("Failed to create account");
    },
  });
}