import { useForm } from "react-hook-form";
import { editSchema, EditSchema } from "../schema/edit-schema";
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
import { useEdit } from "../hooks/use-edit";

interface EditFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function EditForm({ open, setOpen }: EditFormProps) {
  const { mutate: editTicket, isPending } = useEdit();

  const form = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      reimbId: 0,
      description: "",
      amount: 0
    },
  });

  function onSubmit(values: EditSchema) {
    editTicket(values);
  }

  return (
    <Dialog open={open} onOpenChange={() => {
      form.reset();
      setOpen(false)}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Ticket</DialogTitle>
          </DialogHeader>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="reimbId"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" {...field} />
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
          Submit Editted Ticket
        </Button>
      </form>
    </Form>
        </DialogContent>
    </Dialog>
  );
}
