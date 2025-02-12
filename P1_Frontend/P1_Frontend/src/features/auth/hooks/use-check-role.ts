import {protectedInstance} from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";


/**
 * Custom hook for checking the user's role.
 * 
 * This hook returns a query object that makes a GET request
 * to the "/role" endpoint to retrieve the user's role.
 * 
 * On successful retrieval of the role:
 * - Returns the role as a string.
 * 
 * On failure to retrieve the role:
 * - Logs the error to the console.
 * - Returns null (consider redirecting the user).
 * 
 * @returns {string | null} - The user's role or null if the query fails.
 */
export function useCheckRole(): any {

  return useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      try {
        const resp = await protectedInstance.get("/role", {headers: {'Authorization': localStorage.getItem("token")}});//check where to go instead
        return resp.data.role as string;
      } catch (e) {
        console.error(e);
        return null; // consider redirecting
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
