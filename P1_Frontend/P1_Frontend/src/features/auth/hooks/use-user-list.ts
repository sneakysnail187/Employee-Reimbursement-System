import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";

export function useUserList(): UseQueryResult<any[]> {
    return useQuery({
        queryKey: ["user-list"],
        queryFn: async () => {
            try {
                const resp = await axiosInstance.get(`/users/allUsers`, {headers: {'Authorization': localStorage.getItem("token")}});
                return resp.data;
            } catch (error) {
                console.error(error);
            }
        },
    });
}