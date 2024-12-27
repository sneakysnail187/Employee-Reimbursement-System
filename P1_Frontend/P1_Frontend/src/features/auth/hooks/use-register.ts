import { useMutation } from "@tanstack/react-query";
import { RegisterSchema } from "../schema/register-schema";
import { registerInstance } from "@/lib/axios-config";
import { toast } from "sonner";

export function useRegister() {
  return useMutation({
    mutationFn: async (values: RegisterSchema) => {
      const resp = await registerInstance.post("/auth/register", values);
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