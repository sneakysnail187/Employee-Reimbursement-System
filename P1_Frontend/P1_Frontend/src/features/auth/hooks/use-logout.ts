import { protectedInstance } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

/**
 * Custom hook for handling user logout functionality.
 * 
 * This hook returns a mutation object that makes a POST request
 * to the "/auth/logout" endpoint using a provided token. It utilizes
 * the React Query `useMutation` hook to manage the mutation state.
 * 
 * On successful logout:
 * - Displays a success toast message.
 * - Invalidates the "auth" query to update any dependent components.
 * - Navigates the user to the login page.
 * 
 * On logout failure:
 * - Displays an error toast message.
 * 
 * @returns {UseMutationResult} - The mutation object for executing the logout.
 */

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (token: string) => {
      console.log(localStorage.getItem("token")); 
      const resp = await protectedInstance.post("/auth/logout", token, {headers: {'Authorization': localStorage.getItem("token")}});
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
