import { useMutation } from "@tanstack/react-query";
import { RegisterSchema } from "../schema/register-schema";
import { axiosInstance } from "@/lib/axios-config";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: RegisterSchema) => {
      const resp = await axiosInstance.post("/auth/register", values);
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Account created");
      router.navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Failed to create account");
    },
  });
}