import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {protectedInstance} from "@/lib/axios-config";

/**
 * Custom hook for fetching the list of tickets for a user.
 * 
 * This hook returns a query object that makes a GET request
 * to the "/users/reimbursements" endpoint to retrieve the user's tickets.
 * 
 * On successful retrieval of tickets:
 * - Returns an array of tickets.
 * 
 * On failure to retrieve tickets:
 * - Logs the error to the console.
 * - Returns null.
 * 
 * @returns {UseQueryResult<any[]>} - The query result containing the array of user's tickets or null if the query fails.
 */

export function useTicketList(): UseQueryResult<any[]> {
    return useQuery({
        queryKey: ["ticket-list"],
        queryFn: async () => {
            try{
                const resp = await protectedInstance.get(`/users/reimbursements`, {headers: {'Authorization': localStorage.getItem("token")}});
                return resp.data;
            } catch (e) {
                console.error(e);
            }
        },
    })
}