"use client";

import { Dices } from "lucide-react";

import { Combobox } from "../components/combobox";
import { Button } from "../components/ui/button";

export type Episode = {
  title: string;
  code: string;
};

type Form = {
  onSubmit: (value?: string) => void;
  isLoading: boolean;
};

export default function Form({ onSubmit, isLoading }: Form) {
  return (
    <form
      onSubmit={(event: any) => {
        event.preventDefault();

        const data = new FormData(event.target);

        const selectedSeasons = data.get("seasons");

        onSubmit(selectedSeasons?.toString());
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
