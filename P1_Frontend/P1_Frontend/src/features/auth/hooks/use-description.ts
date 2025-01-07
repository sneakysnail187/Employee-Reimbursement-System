import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";

interface DescriptionSchema {
    reimbId: number;
    description: string;
}

export function useDescription() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({reimbId, description}: DescriptionSchema) => {
            const resp = await axiosInstance.patch("/reimbursement/description",{reimbId, description}, {headers: {'Authorization': localStorage.getItem("token")}});
            return resp.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ticket-description"], //check this later
            });
            toast.success("Description updated successfully.");
        },
        onError: () => {
            toast.error("Failed to update description.");
        },
        
    });
}