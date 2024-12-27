import { z } from "zod";

export const editSchema = z.object({
  reimbursementid: z
    .number({
      required_error: "ID is required",
      invalid_type_error: "ID must be an integer",
    })
    .int()
    .positive(),
  status: z
    .string({
      message: "Status is required",
    })
    .min(1, "Status is required"),
});

export type EditSchema = z.infer<typeof editSchema>;
