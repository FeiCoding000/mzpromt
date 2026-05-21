import { z } from "zod";

export const contactDataSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    organisation: z.string().optional(),
    preferredTime: z.string().optional(),
    serviceType: z.string().optional(),
    message: z.string().optional(),
});

export type ContactData = z.infer<typeof contactDataSchema>;
