import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {protectedInstance, addInterceptors} from "@/lib/axios-config";

export function useAllTicketList(): UseQueryResult<any[]> {
    return useQuery({
        queryKey: ["all-ticket-list"],
        queryFn: async () => {
            try{
                addInterceptors(protectedInstance);
                const resp = await protectedInstance.get("/reimbursements/all");
                return resp.data;
            } catch (e) {
                console.error(e);
            }
            
        },
    });
}