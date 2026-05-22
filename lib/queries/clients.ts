import type { ContactData } from "@/lib/schemas/contactData";

type CreateClientSuccess = {
  ok: true;
  data: unknown;
};

type CreateClientError = {
  ok: false;
  status?: number;
  error: string;
  details?: unknown;
};

export type CreateClientResult = CreateClientSuccess | CreateClientError;

export async function createClient(
  data: ContactData
): Promise<CreateClientResult> {
  try {
    const response = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: responseData?.error ?? "Failed to create client",
        details: responseData?.details,
      };
    }

    return {
      ok: true,
      data: responseData,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}