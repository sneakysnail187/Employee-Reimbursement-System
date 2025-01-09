import { z } from "zod";

export const editSchema = z.object({
  reimbId: z
    .number({
      required_error: "ID is required",
      invalid_type_error: "ID must be an integer",
    })
    .int()
    .positive(),
  description: z
    .string({
      message: "Enter description",
    }),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive(),
});

export type EditSchema = z.infer<typeof editSchema>;
