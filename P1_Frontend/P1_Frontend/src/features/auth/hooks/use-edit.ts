import { toast } from "sonner";
import { EditSchema } from "../schema/edit-schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTicketInstance } from "@/lib/axios-config";
import { useRouter } from "@tanstack/react-router";

export function useTicket() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: EditSchema) => {
      const resp = await editTicketInstance.post("/editTicket", values);
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
      toast.success("Submitted ticket edit successfully.");
      router.navigate({ to: "/dashboard" });
    },
    onError: () => {
      toast.error("Failed to edit ticket.");
    },
  });
}
