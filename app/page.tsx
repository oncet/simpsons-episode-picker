"use client";

import { useEffect, useState } from "react";
import Form, { Episode } from "./form";

export default function Home() {
  const [episode, setEpisode] = useState<Episode>();
  const [isLoading, setIsLoading] = useState(false);

  console.log(episode);

  const onSubmit = (selectedSeasons?: string) => {
    setEpisode({
      title: "Moaning Lisa",
      code: "S01E06",
    });
  };

  return (
    <main className="max-w-screen-sm m-auto p-4">
      <Form
        onSubmit={onSubmit}
        onLoading={setIsLoading}
        isLoading={isLoading}
      />
      <div
        className={
          "transition duration-300 mt-4   " +
          (episode ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")
        }
      >
        <div className={isLoading ? "animate-pulse" : ""}>
          <h2 className="text-5xl font-extrabold">Moaning Lisa</h2>
          <p className="dark:text-slate-400 mt-2">S01E06</p>
        </div>
      </div>
    </main>
  );
}
