import { useMutation, useQueryClient } from "@tanstack/react-query";
import {protectedInstance} from "@/lib/axios-config";
import { toast } from "sonner";

interface StatusSchema {
    reimbId: number;
    status: string;
}

/**
 * Custom hook for handling the status update functionality of a reimbursement ticket.
 * 
 * This hook returns a mutation object that makes a PATCH request
 * to the "/reimbursement/status/:reimbId" endpoint with the provided
 * status and reimbursement ID. It utilizes the Tanstack React Query `useMutation` hook
 * to manage the mutation state.
 * 
 * On successful status update:
 * - Invalidates the "ticket-list" query to update any dependent components.
 * - Displays a success toast message.
 * 
 * On update failure:
 * - Displays an error toast message.
 * 
 * @returns {UseMutationResult} - The mutation object for executing the status update.
 */

export function useStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({reimbId, status}: StatusSchema) => {
            const resp = await protectedInstance.patch(`/reimbursement/status/${reimbId}`,{status}, {headers: {'Authorization': localStorage.getItem("token")}});
            return resp.data;
        },
        
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ticket-list"], //check this later
            });
            toast.success("Status updated successfully.");
        },
        onError: () => {
            toast.error("Failed to update status.");
        },
        
    });
}