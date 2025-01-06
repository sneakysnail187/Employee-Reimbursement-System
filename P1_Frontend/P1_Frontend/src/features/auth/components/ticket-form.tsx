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
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ticketSchema, TicketSchema } from "../schema/ticket-schema";
import { useTicket } from "../hooks/use-ticket";


interface TicketFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function TicketForm({ open, setOpen }: TicketFormProps) {
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
    addTicket(values, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={() => {
      form.reset();
      setOpen(false)}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Ticket</DialogTitle>
          </DialogHeader>
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
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={(e) => onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">
                Submit Ticket
              </Button>
            </form>
          </Form>
        </ DialogContent>
    </Dialog>
  );
}

