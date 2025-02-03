import { useMutation, useQueryClient } from "@tanstack/react-query";
import { protectedInstance , addInterceptors} from "@/lib/axios-config";
import { toast } from "sonner";

interface RoleTarget {
    userId: number;
}

export function useRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId }: RoleTarget) => {
            //addInterceptors(protectedInstance);
            const resp = await protectedInstance.patch(`/user/role/${userId}`, {headers: {'Authorization': localStorage.getItem("token")}});
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