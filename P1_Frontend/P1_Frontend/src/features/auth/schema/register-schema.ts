import { z } from "zod";

export const registerFormSchema = z.object({
  email: z
    .string({
      message: "Please enter a valid email address.",
    })
    .min(1, "Please enter a valid email address.")
    .max(50)
    .regex(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please enter a valid email address."
    ),
  password: z
    .string({
      message: "Please enter a valid password.",
    })
    .min(8, "Password must be at least 8 characters long.")
    .max(50),
  confirmPassword: z
    .string({
      message: "Please confirm your password.",
    })
    .min(1, "Please confirm your password."),
});

export type RegisterSchema = z.infer<typeof registerFormSchema>;