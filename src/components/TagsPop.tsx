"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Tags } from "@/app/types/Tags";

const tagsList: Tags[] = [
  { tag: "Praca" },
  { tag: "Dom" },
  { tag: "Studia" },
  { tag: "Zdrowie" },
  { tag: "Finanse" },
  { tag: "None" },
];

interface TagsPopProps {
  selectedTag: Tags | null;
  onChange: (tag: Tags) => void;
}

export function TagsPop({ selectedTag, onChange }: TagsPopProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      <p className="text-muted-foreground text-sm sm:block">Choose tag</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[150px] justify-start sm:w-[180px] md:w-[200px]"
          >
            {selectedTag ? selectedTag.tag : "+ Set Tag"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 max-w-[90vw] sm:max-w-[200px]"
          side={isMobile ? "bottom" : "right"}
          align="start"
        >
          <Command>
            <CommandInput placeholder="Change tag..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {tagsList.map((tag) => (
                  <CommandItem
                    key={tag.tag}
                    value={tag.tag}
                    onSelect={(value) => {
                      const newTag =
                        tagsList.find((t) => t.tag === value) || null;
                      if (newTag) onChange(newTag);
                      setOpen(false);
                    }}
                  >
                    {tag.tag}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
