import { useMutation, useQueryClient } from "@tanstack/react-query";
import {protectedInstance, addInterceptors} from "@/lib/axios-config";
import { toast } from "sonner";

interface StatusSchema {
    reimbId: number;
    status: string;
}

export function useStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({reimbId, status}: StatusSchema) => {
            addInterceptors(protectedInstance);
            const resp = await protectedInstance.patch(`/reimbursement/status/${reimbId}`,{status});
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