import { useQuery } from "@tanstack/react-query";
import { userListSchema } from "../schema/user-list-schema";
import { axiosInstance } from "@/lib/axios-config";

export function useUserList() {
    return useQuery({
        queryKey: ["userList"],
        queryFn: async () => {
            const resp = await axiosInstance.get("/users", {headers: {'Authorization': localStorage.getItem("token")}});
            const data = userListSchema.parse(resp.data);
            return data;
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}