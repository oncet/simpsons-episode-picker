import Form from "./form";

async function getRandomEpisode() {
  const episodes: any = await import("../seasons/season-01.json");

  return JSON.parse(JSON.stringify(episodes));
}

export default async function Home() {
  const response = await getRandomEpisode();

  const data = response.default;

  return (
    <main className="max-w-screen-sm m-auto p-4">
      <Form />
      <h2 className="text-5xl font-extrabold mt-4">Moaning Lisa</h2>
      <p className="dark:text-slate-400 mt-2">S01E06</p>
    </main>
  );
}
