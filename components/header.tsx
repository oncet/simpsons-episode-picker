import { Tv } from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "../components/mode-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="dark:text-slate-400 mx-auto max-w-screen-sm px-4 py-2 flex items-center justify-between">
        <h1>
          <Link
            href="/"
            className="flex items-center text-slate-500 dark:text-slate-300 hover:text-slate-800 hover:dark:text-slate-100 group transition"
          >
            <Tv className="mr-2 h-4 w-4 text-blue-600 dark:text-yellow-400 group-hover:scale-125 group-hover:-rotate-12 stroke-[3px] transition" />{" "}
            Simpsons episode picker
          </Link>
        </h1>
        <ModeToggle />
      </div>
    </header>
  );
}
