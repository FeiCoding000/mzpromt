import type { ContactData } from "@/lib/schemas/contactData";

type CreateClientSuccess = {
  ok: true;
  data: unknown;
};

type CreateClientErrorMessage = {
  ok: false;
  status?: number;
  message: string;
};

export type CreateClientResult = CreateClientSuccess | CreateClientErrorMessage;

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
    console.log("API Response:", responseData);

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        message: responseData?.details?.message ?? "Failed to create client"
      };
    }

    return {
      ok: true,
      data: responseData,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Network error",
    };
  }
}