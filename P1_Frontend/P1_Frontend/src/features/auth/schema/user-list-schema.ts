import { z } from "zod";

export const userListSchema = z.array(z.object({
    userId: z.number(),
    username: z.string(),
    roleName: z.string(),
    fullName: z.string()
})
)

export type UserListSchema = z.infer<typeof userListSchema>;