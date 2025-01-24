import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {protectedInstance,addInterceptors} from "@/lib/axios-config";

export function useUserList(): UseQueryResult<any[]> {
    return useQuery({
        queryKey: ["user-list"],
        queryFn: async () => {
            try {
                addInterceptors(protectedInstance);
                const resp = await protectedInstance.get(`/user`, {headers: {'Authorization': localStorage.getItem("token")}});
                return resp.data;
            } catch (error) {
                console.error(error);
            }
        },
    });
}