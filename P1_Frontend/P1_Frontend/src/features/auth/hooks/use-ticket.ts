import { toast } from "sonner";
import { TicketSchema } from "../schema/ticket-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {protectedInstance, addInterceptors} from "@/lib/axios-config";
import { useRouter } from "@tanstack/react-router";

export function useTicket() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: TicketSchema) => {
      //addInterceptors(protectedInstance);
      const resp = await protectedInstance.post("/reimbursement", values, {headers: {'Authorization': localStorage.getItem("token")}});
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ticket-list"],
      });
      toast.success("Submitted ticket successfully.");
      router.navigate({ to: "/tickets/userTickets" });
    },
    onError: () => {
      toast.error("Failed to submit ticket.");
    },
  });
}
