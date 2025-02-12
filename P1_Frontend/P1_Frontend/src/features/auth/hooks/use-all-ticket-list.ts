import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {protectedInstance} from "@/lib/axios-config";

/**
 * Custom hook for fetching all tickets in the system.
 * 
 * This hook returns a query object that makes a GET request
 * to the "/reimbursements/all" endpoint to retrieve all tickets.
 * 
 * On successful retrieval of the tickets:
 * - Returns the tickets array.
 * 
 * On failure to retrieve the tickets:
 * - Logs the error to the console.
 * - Returns null.
 * 
 * @returns {UseQueryResult<any[]>} - The query result containing the array of all tickets or null if the query fails.
 */
export function useAllTicketList(): UseQueryResult<any[]> {
    return useQuery({
        queryKey: ["all-ticket-list"],
        queryFn: async () => {
            try{
                const resp = await protectedInstance.get("/reimbursements/all", {headers: {'Authorization': localStorage.getItem("token")}});
                return resp.data;
            } catch (e) {
                console.error(e);
            }
            
        },
    });
}