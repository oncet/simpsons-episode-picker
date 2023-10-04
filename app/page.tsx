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
    <main className="m-auto max-w-screen-sm p-4">
      <Form onSubmit={onSubmit} isLoading={isLoading} />
      {episode ? (
        <div
          className={
            "mt-4 " + (episode ? "animate-fade-in" : "animate-fade-out")
          }
        >
          <div className={isLoading ? "animate-pulse" : ""}>
            {episode ? (
              <>
                <h2 className="text-5xl font-extrabold dark:text-white">
                  {episode.title}
                </h2>
                <p className="mt-2 dark:text-slate-400">{episode.code}</p>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {error ? (
        <div
          className={"mt-4 " + (error ? "animate-fade-in" : "animate-fade-out")}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Failed to get a random episode</AlertTitle>
            <AlertDescription>Please try again.</AlertDescription>
          </Alert>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
