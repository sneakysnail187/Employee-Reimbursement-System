import { toast } from "sonner";
import { TicketSchema } from "../schema/ticket-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {protectedInstance} from "@/lib/axios-config";
import { useRouter } from "@tanstack/react-router";

/**
 * Custom hook for handling ticket submission functionality.
 * 
 * This hook returns a mutation object that makes a POST request
 * to the "/reimbursement" endpoint using the provided ticket details.
 * It utilizes the Tanstack React Query `useMutation` hook to manage the mutation state.
 * 
 * On successful submission:
 * - Invalidates the "ticket-list" query to update any dependent components.
 * - Displays a success toast message.
 * - Navigates the user to the userTickets page.
 * 
 * On submission failure:
 * - Displays an error toast message.
 * 
 * @returns {UseMutationResult} - The mutation object for executing the submission.
 */
export function useTicket() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: TicketSchema) => {
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
