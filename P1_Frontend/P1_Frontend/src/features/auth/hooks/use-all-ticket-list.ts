import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { ticketListSchema } from "../schema/ticket-list-schema";

export function useAllTicketList() {
    return useQuery({
        queryKey: ["all-ticket-list"],
        queryFn: async () => {
            const resp = await axiosInstance.get("/reimbursements/all", {headers: {'Authorization': localStorage.getItem("token")}});
            const data = ticketListSchema.parse(resp.data);
            return data;
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}