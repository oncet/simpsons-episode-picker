"use client";

import { Dices } from "lucide-react";

import { Combobox } from "../components/combobox";
import { Button } from "../components/ui/button";

export default function Form() {
  return (
    <form
      onSubmit={(event: any) => {
        event.preventDefault();

        const data = new FormData(event.target);

        const selectedSeasons = data.get("seasons");

        console.log("selectedSeasons", selectedSeasons);

        const urlParams = new URLSearchParams(window.location.search);

        if (selectedSeasons) {
          urlParams.set("seasons", selectedSeasons.toString());

          history.pushState({}, "", `?${urlParams.toString()}`);
        } else {
          history.pushState({}, "", "/");
        }

        // onSubmit(selectedSeasons);
      }}
      className="flex flex-col gap-4"
    >
      <Combobox />
      <Button size="lg" className="uppercase font-extrabold tracking-tight">
        <Dices className="mr-2 h-4 w-4" />
        Get random episode
      </Button>
    </form>
  );
}
