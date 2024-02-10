"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

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
import { cn } from "@/lib/utils";

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
  const [shiftKey, setShiftKey] = React.useState(false);
  const [lastSelectedOption, setLastSelectedOption] =
    React.useState<string>("");

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey) {
        setShiftKey(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.shiftKey) {
        setShiftKey(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  React.useEffect(() => {
    if (!open) {
      setLastSelectedOption("");
    }
  }, [open]);

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
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
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
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Search seasons..." />
            <CommandEmpty>No season found.</CommandEmpty>
            <CommandGroup>
              {seasons.map((season) => (
                <CommandItem
                  key={season.value}
                  value={season.value}
                  onSelect={(selectedValue) => {
                    const all = seasons[0].value;

                    // Remove clicked option
                    if (selectedOptions.includes(selectedValue)) {
                      // Remove clicked option if it's not the only one
                      if (selectedValue !== all && selectedOptions.length > 1) {
                        setSelectedOptions(
                          selectedOptions.filter(
                            (option) => option !== selectedValue,
                          ),
                        );
                      }

                      // Select all if none is left selected
                      else if (selectedValue !== all) {
                        setSelectedOptions([all]);
                      }
                    }

                    // Add clicked option
                    else {
                      if (selectedValue === all) {
                        setSelectedOptions([all]);
                      } else {
                        setLastSelectedOption(selectedValue);

                        if (shiftKey && lastSelectedOption) {
                          const lastSelectedOptionIndex = seasons.findIndex(
                            (season) => season.value === lastSelectedOption,
                          );

                          const selectedValueIndex = seasons.findIndex(
                            (season) => season.value === selectedValue,
                          );

                          const start = Math.min(
                            lastSelectedOptionIndex,
                            selectedValueIndex,
                          );
                          const end = Math.max(
                            lastSelectedOptionIndex,
                            selectedValueIndex,
                          );

                          setSelectedOptions([
                            ...selectedOptions,
                            ...seasons
                              .slice(start, end + 1)
                              .map((season) => season.value),
                          ]);
                        } else {
                          setSelectedOptions([
                            ...selectedOptions.filter(
                              (selectedOption) => selectedOption !== "all",
                            ),
                            selectedValue,
                          ]);
                        }
                      }
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedOptions.includes(season.value)
                        ? "opacity-100"
                        : "opacity-0",
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
