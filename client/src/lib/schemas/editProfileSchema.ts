import { z } from "zod";

export const editProfileSchema = z.object({
    displayName: z.string().min(6), //display is required
    bio: z.string().max(255).optional()
})

export type EditProfileSchema = z.infer<typeof editProfileSchema>;