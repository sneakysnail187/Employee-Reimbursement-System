import { useMutation } from "@tanstack/react-query";
import {protectedInstance, addInterceptors} from "@/lib/axios-config";

export function useRefresh() {
  return useMutation({
    mutationFn: async () => {
      addInterceptors(protectedInstance);
      const resp = await protectedInstance.post("/auth/refresh", localStorage.getItem("refresh"), {headers: {'Authorization': localStorage.getItem("token")}});
      localStorage.setItem("token", resp.data.token);
      return resp.data;
    }
  });
}