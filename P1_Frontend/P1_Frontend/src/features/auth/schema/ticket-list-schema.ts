import {z} from "zod";

export const ticketListSchema = z.array(z.object({
    reimbId: z.number(),
    amount: z.number(),
    description: z.string(),
    status: z.string(),
    user: z.object({
        userId: z.number(),
        username: z.string(),
        roleName: z.string(),
        fullName: z.string()
    })
}))

export type TicketListSchema = z.infer<typeof ticketListSchema>;
