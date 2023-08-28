import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const selectedSeasons = body.seasons?.split("-");

  const episodes = [];

  for (const season of selectedSeasons) {
    const seasonEpisodes = Array.from(
      await import(`../../seasons/season-${season}.json`)
    ) as {
      Title: string;
      ["No. inseason"]: number;
    }[];

    episodes.push(
      ...Array.from(seasonEpisodes).map((episode) => ({
        title: episode.Title,
        code: `S${season}E${episode["No. inseason"]
          .toString()
          .padStart(2, "0")}`,
      }))
    );
  }

  const randomEpisode = episodes[Math.floor(Math.random() * episodes.length)];

  return NextResponse.json(randomEpisode);
}
