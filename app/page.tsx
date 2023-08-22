import Form from "./form";

async function getData() {
  const episodes: any = await import("../seasons/season-01.json");

  return JSON.parse(JSON.stringify(episodes));
}

export default async function Home() {
  const response = await getData();

  const data = response.default;

  const onSubmit = async (selectedSeasons: any) => {
    "use server";

    console.log("selectedSeasons", selectedSeasons);
    console.log("data", data);

    // data.forEach((episode: any) => {
    //   console.log("episode", episode);
    // });

    // const filteredData = data.filter((episode: any) => {
    //   console.log("episode", episode);
    // });

    // console.log("filteredData", filteredData);

    return { foo: "bar" };
  };

  return (
    <main className="max-w-screen-sm m-auto p-4">
      <Form onSubmit={onSubmit} />
      <h2 className="text-5xl font-extrabold mt-4">Moaning Lisa</h2>
      <p className="dark:text-slate-400 mt-2">S01E06</p>
    </main>
  );
}
