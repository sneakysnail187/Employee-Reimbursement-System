import {protectedInstance , addInterceptors} from "@/lib/axios-config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useAuth(): UseQueryResult<any> {

  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        addInterceptors(protectedInstance);
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
