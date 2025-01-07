import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";

export function useAllTicketList(): UseQueryResult<any[]> {
    return useQuery({
        queryKey: ["all-ticket-list"],
        queryFn: async () => {
            try{
                const resp = await axiosInstance.get("/reimbursements/all", {headers: {'Authorization': localStorage.getItem("token")}});
                return resp.data;
            } catch (e) {
                console.error(e);
            }
            
        },
    });
}