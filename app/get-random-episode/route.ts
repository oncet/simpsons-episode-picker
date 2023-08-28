import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const selectedSeasons = body.seasons?.split("-");

  const episodes = [];

  for (const season of selectedSeasons) {
    const path = `../../seasons/season-${season}.json`;

    const seasonEpisodes = Array.from(
      await import(`../../seasons/season-${season}.json`)
    ) as {
      Title: string;
      ["No. inseason"]: string;
    }[];

    episodes.push(
      ...Array.from(seasonEpisodes).map((episode) => ({
        title: episode.Title,
        code: `S${season}E${episode["No. inseason"]}`,
      }))
    );
  }

  const randomEpisode = episodes[Math.floor(Math.random() * episodes.length)];

  return NextResponse.json(randomEpisode);
}
