"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const seasons = [
  {
    value: "all",
    label: "All seasons",
  },
  ...Array.from({ length: 33 }, (_, i) => {
    const season = String(i + 1);

    return {
      value: season.padStart(2, "0"),
      label: `Season ${season}`,
    };
  }),
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([
    seasons[0].value,
  ]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select seasons"
            className="w-full justify-between"
          >
            <span className="text-ellipsis overflow-hidden whitespace-nowrap">
              {selectedOptions[0] === "all"
                ? seasons[0].label
                : seasons
                    .filter((season) => selectedOptions.includes(season.value))
                    .map((season) => season.label)
                    .join(", ")}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
          <Command>
            {/* <CommandInput placeholder="Search seasons..." className="" /> */}
            <CommandEmpty>No season found.</CommandEmpty>
            <CommandGroup>
              {seasons.map((season) => (
                <CommandItem
                  key={season.value}
                  value={season.value}
                  onSelect={(currentValue) => {
                    const all = seasons[0].value;

                    // Remove clicked option
                    if (selectedOptions.includes(currentValue)) {
                      // Remove clicked option if it's not the only one
                      if (currentValue !== all && selectedOptions.length > 1) {
                        setSelectedOptions(
                          selectedOptions.filter(
                            (option) => option !== currentValue
                          )
                        );
                      }

                      // Select all if none is left selected
                      else if (currentValue !== all) {
                        setSelectedOptions([all]);
                      }
                    }

                    // Add clicked option
                    else {
                      if (currentValue === all) {
                        setSelectedOptions([all]);
                      } else {
                        setSelectedOptions([
                          ...selectedOptions.filter(
                            (selectedOption) => selectedOption !== "all"
                          ),
                          currentValue,
                        ]);
                      }
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedOptions.includes(season.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {season.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedOptions[0] !== "all" ? (
        <input
          type="hidden"
          name="seasons"
          value={selectedOptions.sort().join("-")}
        />
      ) : null}
    </>
  );
}
