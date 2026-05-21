import { NextResponse } from "next/server";

import { contactDataSchema } from "@/lib/schemas/contactData";

export async function POST(request: Request) {
  const clientsApiUrl = process.env.CLIENTS_API_URL;

  if (!clientsApiUrl) {
    return NextResponse.json(
      { error: "CLIENTS_API_URL is not set" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const result = contactDataSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid contact data", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const response = await fetch(clientsApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result.data),
  });

  if (!response.ok) {
    let details: unknown = null;

    try {
      details = await response.json();
    } catch {
      details = await response.text();
    }

    return NextResponse.json(
      { error: "Failed to create client", details },
      { status: 502 }
    );
  }

  const responseData = await response.json();

  return NextResponse.json(responseData, { status: 201 });
}
