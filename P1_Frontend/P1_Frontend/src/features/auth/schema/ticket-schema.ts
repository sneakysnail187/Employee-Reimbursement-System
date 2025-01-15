import { z } from "zod";

export const ticketSchema = z.object({
  project: z
    .string({
      message: "Project is required",
    })
    .min(1, "Project is required"),
  description: z
    .string({
      message: "Description is required",
    })
    .min(1, "Description is required"),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive(),
});

export type TicketSchema = z.infer<typeof ticketSchema>;
