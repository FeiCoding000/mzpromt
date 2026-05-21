import type { ContactData } from "@/lib/schemas/contactData";

export async function createClient(data: ContactData) {
  const response = await fetch(
    "/api/clients",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create client");
  }

  return await response.json();
}