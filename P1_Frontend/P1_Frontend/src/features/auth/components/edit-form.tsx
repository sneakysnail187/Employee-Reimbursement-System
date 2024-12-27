import { useForm } from "react-hook-form";

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
import { editSchema, EditSchema } from "../schema/edit-schema";
import { useTicket } from "../hooks/use-edit";

export function EditForm() {
  const { mutate: editTicket, isPending } = useTicket();

  // 1. Define your form.
  const form = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      reimbursementid: 0,
      status: "",
    },
  });

  function onSubmit(values: EditSchema) {
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
}
