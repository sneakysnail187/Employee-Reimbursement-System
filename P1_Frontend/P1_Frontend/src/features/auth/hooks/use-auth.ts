import { axiosInstance } from "@/lib/axios-config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

interface User {
  username: string;
  role: string;
  fullName: string;
}

export function useAuth(): UseQueryResult<User> {
  const router = useRouter();

  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const resp = await axiosInstance.get("/reimbursements");
        return resp.data;
      } catch (e) {
        console.error(e);
        router.navigate({ to: "/" });
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 mins
    gcTime: 1000 * 60 * 10, // 10 mins
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
