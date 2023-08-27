"use client";

import { Dices, Loader2 } from "lucide-react";
import { useState } from "react";

import { Combobox } from "../components/combobox";
import { Button } from "../components/ui/button";

const updateSearchParams = (value?: string) => {
  const urlParams = new URLSearchParams(window.location.search);

  if (value) {
    urlParams.set("seasons", value);
  } else {
    urlParams.delete("seasons");
  }

  history.pushState(
    {},
    "",
    urlParams.size > 0 ? "?" + urlParams.toString() : "."
  );
};

export type Episode = {
  title: string;
  code: string;
};

type Form = {
  onSubmit: (value?: string) => void;
  onLoading: (value: boolean) => void;
  isLoading: boolean;
};

export default function Form({ onSubmit, onLoading, isLoading }: Form) {
  return (
    <form
      onSubmit={(event: any) => {
        onLoading(true);

        event.preventDefault();

        const data = new FormData(event.target);

        const selectedSeasons = data.get("seasons");

        updateSearchParams(selectedSeasons?.toString());

        setTimeout(() => {
          onLoading(false);
          onSubmit(selectedSeasons?.toString());
        }, 2000);
      }}
      className="flex flex-col gap-4"
    >
      <Button
        size="lg"
        disabled={isLoading}
        className="uppercase font-extrabold tracking-tight [-webkit-tap-highlight-color:transparent]"
      >
        <Dices
          className={"mr-2 h-4 w-4 " + (isLoading ? "animate-pulse" : "")}
        />
        <span className={isLoading ? "animate-pulse" : ""}>
          Get random episode
        </span>
      </Button>
      <div className={isLoading ? "animate-pulse" : ""}>
        <Combobox />
      </div>
    </form>
  );
}
