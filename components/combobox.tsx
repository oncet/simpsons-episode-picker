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
  ...Array.from({ length: 33 }, (_, i) => ({
    value: `season-${i + 1}`,
    label: `Season ${i + 1}`,
  })),
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([
    "all",
  ]);

  let label;

  if (selectedOptions[0] === "all") {
    label = seasons[0].label;
  } else if (selectedOptions.length < 4) {
    label = seasons
      .filter((season) => selectedOptions.includes(season.value))
      .map((season) => season.label)
      .join(", ");
  } else {
    label = selectedOptions.length + " seasons selected";
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
        <Command>
          <CommandInput placeholder="Search seasons..." />
          <CommandEmpty>No season found.</CommandEmpty>
          <CommandGroup>
            {seasons.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  if (selectedOptions.includes(currentValue)) {
                    if (currentValue !== "all") {
                      setSelectedOptions(
                        selectedOptions.filter(
                          (option) => option !== currentValue
                        )
                      );
                    }
                  } else {
                    if (currentValue === "all") {
                      setSelectedOptions(["all"]);
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
                    selectedOptions.includes(framework.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
