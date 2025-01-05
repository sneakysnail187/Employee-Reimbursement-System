import { toast } from "sonner";
import { TicketSchema } from "../schema/ticket-schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { useRouter } from "@tanstack/react-router";

export function useTicket() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: TicketSchema) => {
      const resp = await axiosInstance.post("/reimbursement", values);
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
      toast.success("Submitted ticket successfully.");
      router.navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Failed to submit ticket.");
    },
  });
}
