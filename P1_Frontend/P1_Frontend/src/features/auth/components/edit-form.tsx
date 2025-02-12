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

/**
 * Component for editing a ticket.
 * 
 * This component renders a dialog with a form for the user to input the new ticket details.
 * It utilizes the Tanstack React Query `useEdit` hook to make a PATCH request to the "/reimbursement/edit/:reimbId" endpoint with the user provided ticket details.
 * If the submission is successful, the form is reset and the dialog is closed.
 * If the submission fails, the error message is displayed below the submit button.
 * 
 * @param open - A boolean indicating whether the dialog is open or not.
 * @param setOpen - A function to set the `open` state of the dialog.
 * 
 * @returns The react component for editing a ticket.
 */
export function EditForm({ open, setOpen }: EditFormProps) {
  const { mutate: editTicket } = useEdit();

  const form = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      reimbId: 0,
      description: "",
      amount: 0
    },
  }); 

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
                name="reimbId"
                render={({ field: { onChange, ...field} }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" 
                      {...field}
                      onChange={(e) => onChange(e.target.valueAsNumber)}
                       />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      The ID of the ticket.
                    </FormDescription>
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

