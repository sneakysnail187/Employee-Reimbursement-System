import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {protectedInstance} from "@/lib/axios-config";

/**
 * Custom hook for fetching the list of users in the system.
 * 
 * This hook returns a query object that makes a GET request
 * to the "/user" endpoint to retrieve the list of users.
 * 
 * On successful retrieval of the users:
 * - Returns the users array.
 * 
 * On failure to retrieve the users:
 * - Logs the error to the console.
 * - Returns null.
 * 
 * @returns {UseQueryResult<any[]>} - The query result containing the array of users or null if the query fails.
 */
export function useUserList(): UseQueryResult<any[]> {
    return useQuery({
        queryKey: ["user-list"],
        queryFn: async () => {
            try {
                const resp = await protectedInstance.get(`/user`, {headers: {'Authorization': localStorage.getItem("token")}});
                return resp.data;
            } catch (error) {
                console.error(error);
            }
        },
    });
}