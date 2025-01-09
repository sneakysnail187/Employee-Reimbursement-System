import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { EditSchema } from "../schema/edit-schema";

export function useEdit() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({reimbId, description, amount}: EditSchema) => {
            const resp = await axiosInstance.patch(`/reimbursement/edit/${reimbId}`,{description, amount}, {headers: {'Authorization': localStorage.getItem("token")}});
            return resp.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ticket-edit"], //check this later
            });
            toast.success("Ticket updated successfully.");
        },
        onError: () => {
            toast.error("Failed to update ticket.");
        },
        
    });
}