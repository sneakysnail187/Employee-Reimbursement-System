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
import { ticketSchema, TicketSchema } from "../schema/ticket-schema";
import { useTicket } from "../hooks/use-ticket";

export function TicketForm() {
  const { mutate: addTicket, isPending } = useTicket();

  // 1. Define your form.
  const form = useForm<TicketSchema>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });

  function onSubmit(values: TicketSchema) {
    addTicket(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Submit Ticket
        </Button>
      </form>
    </Form>
  );
}
