import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { protectedInstance } from "@/lib/axios-config";

export function useUserList(): UseQueryResult<any[]> {
    return useQuery({
        queryKey: ["user-list"],
        queryFn: async () => {
            try {
                const resp = await protectedInstance.get(`/user`);
                return resp.data;
            } catch (error) {
                console.error(error);
            }
        },
    });
}