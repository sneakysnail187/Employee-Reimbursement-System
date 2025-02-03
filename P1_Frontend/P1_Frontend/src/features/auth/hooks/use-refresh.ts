/*import { useMutation } from "@tanstack/react-query";
import {protectedInstance, addInterceptors} from "@/lib/axios-config";

export function useRefresh() {
  return useMutation({
    mutationFn: async () => {
      addInterceptors(protectedInstance);
      console.log("token");
      console.log(localStorage.getItem("token"));
      const ref = localStorage.getItem("refresh");
      const resp = await protectedInstance.post("/auth/refresh", {refreshToken: ref}, {headers: {'Authorization': localStorage.getItem("token")}});
      localStorage.setItem("token", resp.data.token);
      return resp.data;
    }
  });//this shouldnt exist
}*/