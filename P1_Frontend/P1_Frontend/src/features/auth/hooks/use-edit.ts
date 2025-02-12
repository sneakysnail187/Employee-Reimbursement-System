import { useMutation, useQueryClient } from "@tanstack/react-query";
import { protectedInstance} from "@/lib/axios-config";
import { toast } from "sonner";
import { EditSchema } from "../schema/edit-schema";
import { useRouter } from "@tanstack/react-router";

/**
 * Custom hook for handling ticket editing functionality.
 * 
 * This hook returns a mutation object that makes a PATCH request
 * to the "/reimbursement/edit/:reimbId" endpoint with user provided
 * ticket details. It utilizes the Tanstack React Query `useMutation` hook to
 * manage the mutation state.
 * 
 * On successful edit:
 * - Invalidates the "ticket-list" query to update any dependent components.
 * - Displays a success toast message.
 * - Navigates the user to the userTickets page.
 * 
 * On edit failure:
 * - Displays an error toast message.
 * 
 * @returns {UseMutationResult} - The mutation object for executing the edit.
 */
export function useEdit() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async ({reimbId, description, amount}: EditSchema) => {
            const resp = await protectedInstance.patch(`/reimbursement/edit/${reimbId}`,{description, amount}, {headers: {'Authorization': localStorage.getItem("token")}});
            return resp.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ticket-list"], //check this later
            });
            toast.success("Ticket updated successfully.");
            router.navigate({ to: "/tickets/userTickets" });
        },
        onError: () => {
            toast.error("Failed to update ticket.");
        },
    });
}