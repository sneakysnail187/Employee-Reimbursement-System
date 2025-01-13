import { useForm } from "react-hook-form";
import { editSchema, EditSchema } from "../schema/edit-schema";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

export function EditForm({ open, setOpen, data }: EditFormProps & { data?: EditSchema }) {
  const { mutate: editTicket } = useEdit();

  const form = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      reimbId: data?.reimbId,
      description: data?.description,
      amount: data?.amount
    },
  }); // MAY NEED TO CUT THIS IF I CANT AT LEAST GET A STACK TRACE

  function onSubmit(values: EditSchema) {
    console.log(values);
    editTicket(values, {
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
            <DialogTitle>Edit Ticket</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      The description of the ticket.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" {...field} 
                      onChange={(e) => onChange(e.target.valueAsNumber)}/>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      The amount to be reimbursed.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button type="submit" >
                Submit Editted Ticket
              </Button>
            </form>
          </Form>
        </DialogContent>
    </Dialog>
  );
}

