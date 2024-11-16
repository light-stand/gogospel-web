import React, { useState } from "react";
import clsx from "clsx";
import colors from "tailwindcss/colors";
import { Icon, MaterialIconType } from "../../foundation";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AutoCompleteProps {
  options: { value: string; label: string }[];
  emptyMessage?: string;
  inputPlaceholder?: string;
  placeholder?: string;
  onSearch: (input: string) => void;
  onSelect: (value: string) => void;
  className?: string;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  onSearch,
  onSelect,
  emptyMessage,
  inputPlaceholder,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command onChange={(e) => onSearch((e.target as any).value)} shouldFilter={false}>
          <CommandInput placeholder={inputPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onSelect(currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AutoComplete;
