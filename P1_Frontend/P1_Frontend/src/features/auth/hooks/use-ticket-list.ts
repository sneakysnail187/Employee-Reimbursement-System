import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { ticketListSchema } from "../schema/ticket-list-schema";


export function useTicketList() {
    return useQuery({
        queryKey: ["ticket-list"],
        queryFn: async () => {
            console.log(localStorage.getItem("token"));
            const resp = await axiosInstance.get(`/users/reimbursements`, {headers: {'Authorization': localStorage.getItem("token")}});
            const data = ticketListSchema.parse(resp.data);
            return data;
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}