/*import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStatus } from "../hooks/use-status";
import { useDescription } from "../hooks/use-description";
import { useAmount } from "../hooks/use-amount";

interface EditFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function EditForm({ open, setOpen }: EditFormProps) {
  const { mutate: editTicket, isPending } = useStatus();

  // 1. Define your form.
  const form = useForm<StatusSchema>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      reimbursementid: 0,
      status: "",
    },
  });

  function onSubmit(values: StatusSchema) {
    editTicket(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="reimbursementid"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Submit Editted Ticket
        </Button>
      </form>
    </Form>
  );
}*/
