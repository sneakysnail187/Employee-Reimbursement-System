import { useMutation } from "@tanstack/react-query";
import { RegisterSchema } from "../schema/register-schema";
import { axiosInstance } from "@/lib/axios-config";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

/**
 * Custom hook for handling user registration functionality.
 * 
 * This hook returns a mutation object that makes a POST request
 * to the "/auth/register" endpoint using the provided user details.
 * It utilizes the Tanstack React Query `useMutation` hook to manage the mutation state.
 * 
 * On successful registration:
 * - Displays a success toast message.
 * - Navigates the user to the login page.
 * 
 * On registration failure:
 * - Displays an error toast message.
 * 
 * @returns {UseMutationResult} - The mutation object for executing the registration.
 */
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