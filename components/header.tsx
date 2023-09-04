import { Tv } from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "../components/mode-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-screen-sm items-center justify-between px-4 py-2 dark:text-slate-400">
        <h1>
          <Link
            href="/"
            className="group flex items-center text-slate-500 transition hover:text-slate-800 dark:text-slate-300 hover:dark:text-slate-100"
          >
            <Tv className="mr-2 h-4 w-4 stroke-[3px] text-blue-600 transition group-hover:-rotate-12 group-hover:scale-125 dark:text-yellow-400" />{" "}
            Simpsons episode picker
          </Link>
        </h1>
        <ModeToggle />
      </div>
    </header>
  );
}
