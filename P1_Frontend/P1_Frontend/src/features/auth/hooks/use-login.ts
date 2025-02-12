import { toast } from "sonner";
import { LoginSchema } from "../schema/login-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { useRouter } from "@tanstack/react-router";
import { jwtDecode } from "jwt-decode";

/**
 * Custom hook for handling user login functionality.
 * 
 * This hook returns a mutation object that makes a POST request
 * to the "/auth/login" endpoint with user credentials. It utilizes
 * the Tanstack React Query `useMutation` hook to manage the mutation state.
 * 
 * On successful login:
 * - Decodes the JWT token and stores the role, token, and refresh token in localStorage.
 * - Displays a success toast message.
 * - Invalidates the "auth" query to update any dependent components.
 * - Navigates the user to the appropriate page based on their role.
 * 
 * On login failure:
 * - Displays an error toast message.
 * 
 * @returns {UseMutationResult} - The mutation object for executing the login.
 */

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: LoginSchema) => {
      const resp = await axiosInstance.post("/auth/login", values);
      
      const { data } = resp;
      const { role, ...decoded } = jwtDecode(data.token) as { role: string };
      localStorage.setItem("role", role);
      localStorage.setItem("token", data.token);//eventually store these in cookies
      localStorage.setItem("refresh", data.refreshToken);
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
