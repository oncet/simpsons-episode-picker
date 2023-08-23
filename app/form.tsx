"use client";

import { Dices } from "lucide-react";

import { ComboboxDemo } from "../components/combobox";
import { Button } from "../components/ui/button";

export default function Form() {
  return (
    <form
      onSubmit={(event: any) => {
        event.preventDefault();

        const data = new FormData(event.target);

        const selectedSeasons = data.get("seasons");

        console.log("selectedSeasons", selectedSeasons);

        // onSubmit(selectedSeasons);
      }}
      className="flex flex-col gap-4"
    >
      <ComboboxDemo />
      <Button size="lg" className="uppercase font-extrabold tracking-tight">
        <Dices className="mr-2 h-4 w-4" />
        Get random episode
      </Button>
    </form>
  );
}
