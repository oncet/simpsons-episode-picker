import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const selectedSeasons =
    body.seasons?.split("-") ||
    Array.from({ length: 33 }, (_, i) => String(i + 1).padStart(2, "0"));

  console.log("selectedSeasons", selectedSeasons);

  const episodes = [];

  for (const season of selectedSeasons) {
    const seasonEpisodes = Array.from(
      await import(`../../seasons/season-${season}.json`),
    ) as {
      title: string;
      code: string;
    }[];

    episodes.push(...Array.from(seasonEpisodes));
  }

  const randomEpisode = episodes[Math.floor(Math.random() * episodes.length)];

  return NextResponse.json(randomEpisode);
}
