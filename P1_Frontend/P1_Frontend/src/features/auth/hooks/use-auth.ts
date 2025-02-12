import {protectedInstance} from "@/lib/axios-config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

/**
 * Custom hook for fetching authentication data.
 * 
 * This hook returns a query object that makes a GET request
 * to the "/auth/me" endpoint to retrieve the authenticated user's data.
 * 
 * On successful retrieval of the data:
 * - Returns the user data.
 * 
 * On failure to retrieve the data:
 * - Logs the error to the console.
 * - Returns null.
 * 
 * @returns {UseQueryResult<any>} - The query result containing user's authentication data or null if the query fails.
 */

export function useAuth(): UseQueryResult<any> {

  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const resp = await protectedInstance.get("/auth/me", {headers: {'Authorization': localStorage.getItem("token")}});
        return resp.data;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
