import { useQuery } from "@tanstack/react-query";
import { userListSchema } from "../schema/user-list-schema";
import { axiosInstance } from "@/lib/axios-config";

export function useUserList() {
    return useQuery({
        queryKey: ["userList"],
        queryFn: async () => {
            const resp = await axiosInstance.get("/users");
            const data = userListSchema.parse(resp.data);
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 mins
        gcTime: 1000 * 60 * 10, // 10 mins
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}