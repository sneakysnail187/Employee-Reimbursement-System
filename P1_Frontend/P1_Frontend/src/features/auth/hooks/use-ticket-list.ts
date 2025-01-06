import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { ticketListSchema } from "../schema/ticket-list-schema";



export function useTicketList(): UseQueryResult<any> {
    return useQuery({
        queryKey: ["ticket-list"],
        queryFn: async () => {
            try{
                const resp = await axiosInstance.get(`/users/reimbursements`, {headers: {'Authorization': localStorage.getItem("token")}});
                return resp;
            } catch (e) {
                console.error(e);
            }
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}