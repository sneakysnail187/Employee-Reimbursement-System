import { useMutation, useQueryClient } from "@tanstack/react-query";
import { protectedInstance } from "@/lib/axios-config";
import { toast } from "sonner";

interface RoleTarget {
    userId: number;
}

export function useRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId }: RoleTarget) => {
            const resp = await protectedInstance.patch(`/user/role/${userId}`);//make backend endpoint
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