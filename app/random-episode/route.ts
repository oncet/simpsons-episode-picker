import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("GET request", request);

  return NextResponse.json({ data: { message: "Hello from the API!" } });
}
