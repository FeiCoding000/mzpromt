import { contactDataSchema } from "@/lib/schemas/contactData";
import type { ContactData } from "@/lib/schemas/contactData";

export async function createClient (contactData: ContactData) {
    const createClientURL = process.env.CLIENTS_API_URL;
    if (!createClientURL) {
        throw new Error("CLIENTS_API_URL is not defined in environment variables");
    }

    const validatedData = contactDataSchema.parse(contactData);

    if (!validatedData) {
        throw new Error("Invalid contact data");
    }

    const response = await fetch(createClientURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create client: ${errorData.message || response.statusText}`);
    }

    return await response.json();
}