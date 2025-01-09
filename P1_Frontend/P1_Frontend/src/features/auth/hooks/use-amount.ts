import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";

interface AmountSchema {
    reimbId: number;
    amount: number;
}

export function useAmount() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({reimbId, amount}: AmountSchema) => {
            const resp = await axiosInstance.patch(`/reimbursement/amount/${reimbId}`,{amount}, {headers: {'Authorization': localStorage.getItem("token")}});
            return resp.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ticket-amount"], //check this later
            });
            toast.success("Amount updated successfully.");
        },
        onError: () => {
            toast.error("Failed to update amount.");
        },
        
    });
}