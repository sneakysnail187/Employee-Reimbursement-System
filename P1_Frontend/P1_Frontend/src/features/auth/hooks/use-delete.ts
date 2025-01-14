import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";

export function useDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const resp = await axiosInstance.delete(`/user/${id}`, {headers: {'Authorization': localStorage.getItem("token")}});
            return resp.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user-list"],
            });
            toast.success("User deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete user");
        },
    });
}