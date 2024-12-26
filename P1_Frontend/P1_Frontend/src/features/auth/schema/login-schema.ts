import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .min(1, "Email is required"),
  password: z
    .string({
      message: "Password is required",
    })
    .min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
