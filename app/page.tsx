import { Dices } from "lucide-react";

import { ComboboxDemo } from "../components/combobox";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <main className="max-w-screen-sm m-auto p-4">
      <form className="flex flex-col gap-4">
        <ComboboxDemo />
        <Button size="lg" className="uppercase font-extrabold tracking-tight">
          <Dices className="mr-2 h-4 w-4" />
          Get random episode
        </Button>
      </form>
      <h1 className="text-5xl font-extrabold mt-4">Moaning Lisa</h1>
      <p className="dark:text-slate-500 mt-2">S01E06</p>
    </main>
  );
}
