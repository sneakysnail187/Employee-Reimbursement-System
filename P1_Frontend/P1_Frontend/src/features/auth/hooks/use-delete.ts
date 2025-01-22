import { useMutation, useQueryClient } from "@tanstack/react-query";
import { protectedInstance } from "@/lib/axios-config";
import { toast } from "sonner";

export function useDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const resp = await protectedInstance.delete(`/user/${id}`);
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