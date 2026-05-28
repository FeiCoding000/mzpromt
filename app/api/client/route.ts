import { NextResponse } from "next/server";
import { createClient } from "@/lib/services/clientService";


export async function POST(request: Request) {

  try {
    const requestData = await request.json();
    const responseData = await createClient(requestData);
    return NextResponse.json(
      {ok: true, data: responseData},
      { status: 201 }
    );
  } catch (error) {
    return error instanceof Error
      ? NextResponse.json({ ok: false, error: error.message }, { status: 400 })
      : NextResponse.json({ ok: false, error: "An unknown error occurred" }, { status: 500 });
  }
}
