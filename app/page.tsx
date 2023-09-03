"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

import Form, { Episode } from "./form";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export default function Home() {
  const [episode, setEpisode] = useState<Episode>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (selectedSeasons?: string) => {
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch("/get-random-episode", {
        method: "POST",
        body: JSON.stringify({
          seasons: selectedSeasons,
        }),
      });

      const episode = await res.json();

      setIsLoading(false);

      setEpisode(episode);
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <main className="max-w-screen-sm m-auto p-4">
      <Form onSubmit={onSubmit} isLoading={isLoading} />
      <div
        className={
          "transition duration-300 mt-4 " +
          (episode ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")
        }
      >
        <div className={isLoading ? "animate-pulse" : ""}>
          {episode ? (
            <>
              <h2 className="text-5xl font-extrabold dark:text-white">
                {episode.title}
              </h2>
              <p className="dark:text-slate-400 mt-2">{episode.code}</p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className={
          "transition duration-300 mt-4 " +
          (error ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")
        }
      >
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Failed to get a random episode</AlertTitle>
          <AlertDescription>Please try again.</AlertDescription>
        </Alert>
      </div>
    </main>
  );
}
