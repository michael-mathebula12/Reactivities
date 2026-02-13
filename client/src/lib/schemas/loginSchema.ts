import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6) //minimum 6 chars
})

export type LoginSchema = z.infer<typeof loginSchema>;
//check why we do this^