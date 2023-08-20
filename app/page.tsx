import Form from "./form2";

async function getData(searchParams: any) {
  if (searchParams instanceof FormData) {
    searchParams = searchParams.get("query");
  }

  return ["foo", "bar", "baz"].filter((item) => item.includes(searchParams));
}

export default async function Page({ searchParams }: { searchParams: any }) {
  const data = await getData(searchParams.query);

  async function myAction(searchParams: any) {
    "use server";

    const result = await getData(searchParams);

    return result;
  }

  return (
    <>
      <Form myAction={myAction} data={data} />
    </>
  );
}

// import Form from "./form";

// async function getData() {
//   const episodes: any = await import("../seasons/season-01.json");

//   return JSON.parse(JSON.stringify(episodes));
// }

// export default async function Home() {
//   const data = await getData();

//   return (
//     <main className="max-w-screen-sm m-auto p-4">
//       <Form data={data} />
//       <h2 className="text-5xl font-extrabold mt-4">Moaning Lisa</h2>
//       <p className="dark:text-slate-400 mt-2">S01E06</p>
//     </main>
//   );
// }
