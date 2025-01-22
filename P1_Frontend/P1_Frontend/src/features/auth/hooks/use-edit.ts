import { useMutation, useQueryClient } from "@tanstack/react-query";
import { protectedInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { EditSchema } from "../schema/edit-schema";
import { useRouter } from "@tanstack/react-router";

export function useEdit() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async ({reimbId, description, amount}: EditSchema) => {
            const resp = await protectedInstance.patch(`/reimbursement/edit/${reimbId}`,{description, amount});
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