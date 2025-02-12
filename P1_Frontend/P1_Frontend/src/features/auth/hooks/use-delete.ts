import { useMutation, useQueryClient } from "@tanstack/react-query";
import {protectedInstance} from "@/lib/axios-config";
import { toast } from "sonner";

/**
 * Custom hook for handling user deletion functionality.
 * 
 * This hook returns a mutation object that makes a DELETE request
 * to the "/user/:id" endpoint using the provided user ID. It utilizes
 * the Tanstack React Query `useMutation` hook to manage the mutation state.
 * 
 * On successful deletion:
 * - Invalidates the "user-list" and "all-ticket-list" queries to update any dependent components.
 * - Displays a success toast message.
 * 
 * On deletion failure:
 * - Displays an error toast message.
 * 
 * @returns {UseMutationResult} - The mutation object for executing the deletion.
 */

export function useDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const resp = await protectedInstance.delete(`/user/${id}`, {headers: {'Authorization': localStorage.getItem("token")}});
            return resp.data;
        },
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({
                queryKey: ["user-list"],
            }),
            queryClient.invalidateQueries({
                queryKey: ["all-ticket-list"],
            }),
            toast.success("User deleted successfully")
        ]),
        onError: () => {
            toast.error("Failed to delete user");
        },
    });
}