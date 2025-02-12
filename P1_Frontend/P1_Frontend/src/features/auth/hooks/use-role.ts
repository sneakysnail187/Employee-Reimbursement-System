import { useMutation, useQueryClient } from "@tanstack/react-query";
import { protectedInstance} from "@/lib/axios-config";
import { toast } from "sonner";

interface RoleTarget {
    userId: number;
}

/**
 * Custom hook for handling user role updating functionality.
 * 
 * This hook returns a mutation object that makes a PATCH request
 * to the "/user/role/:userId" endpoint using the provided user ID. It utilizes
 * the Tanstack React Query `useMutation` hook to manage the mutation state.
 * 
 * On successful update:
 * - Invalidates the "users-list" query to update any dependent components.
 * - Displays a success toast message.
 * 
 * On update failure:
 * - Displays an error toast message.
 * 
 * @returns {UseMutationResult} - The mutation object for executing the update.
 */
export function useRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId }: RoleTarget) => {
            //addInterceptors(protectedInstance);
            const resp = await protectedInstance.patch(`/user/role/${userId}`, {headers: {'Authorization': localStorage.getItem("token")}});
            return resp.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users-list"],
            });
            toast.success("Role updated successfully.");
        },
        onError: () => {
            toast.error("Failed to update role.");
        },
    });
}