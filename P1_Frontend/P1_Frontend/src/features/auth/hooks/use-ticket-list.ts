import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {protectedInstance, addInterceptors} from "@/lib/axios-config";

export function useTicketList(): UseQueryResult<any[]> {
    return useQuery({
        queryKey: ["ticket-list"],
        queryFn: async () => {
            try{
                addInterceptors(protectedInstance);
                const resp = await protectedInstance.get(`/users/reimbursements`);
                return resp.data;
            } catch (e) {
                console.error(e);
            }
        },
    })
}