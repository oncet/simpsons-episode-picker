import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const seasons = body.seasons?.split("-");

  console.log(seasons);

  return NextResponse.json({
    title: "Moaning Lisa",
    code: "S01E06",
  });
}
