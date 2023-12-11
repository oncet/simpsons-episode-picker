"use client";

import { useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

import Form, { Episode } from "./form";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [episode, setEpisode] = useState<Episode>();
  const [isLoading, setIsLoading] = useState(false);
  const toastIdRef = useRef<string | null>(null);

  const { toast, dismiss } = useToast();

  const onSubmit = async (selectedSeasons?: string) => {
    setIsLoading(true);

    if (toastIdRef.current) {
      dismiss(toastIdRef.current);
    }

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
      const { id } = toast({
        title: (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Failed to get a random episode
          </div>
        ),
        description: "Please try again.",
        variant: "destructive",
      });

      setIsLoading(false);

      toastIdRef.current = id;
    }
  };

  return (
    <main className="m-auto max-w-screen-sm p-4">
      <Form onSubmit={onSubmit} isLoading={isLoading} />
      {episode ? (
        <div className="mt-4 animate-fade-in">
          <div className={isLoading ? "animate-pulse" : ""}>
            <>
              <h2 className="text-5xl font-extrabold dark:text-white">
                {episode.title}
              </h2>
              <p className="mt-2 dark:text-slate-400">{episode.code}</p>
            </>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
