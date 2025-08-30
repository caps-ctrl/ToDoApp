"use client";
import type { Status } from "@/app/types/Status";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
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

const statuses: Status[] = [
  { status: "Backlog" },
  { status: "Todo" },
  { status: "In Progress" },
  { status: "Done" },
  { status: "Canceled" },
  { status: "None" },
];

interface StatusPopProps {
  selectedStatus: Status | null;
  onChange: (status: Status) => void;
}

export function StatusPop({ selectedStatus, onChange }: StatusPopProps) {
  const [open, setOpen] = React.useState(false);
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
      <p className="text-muted-foreground text-sm  sm:block">Choose status</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[150px] justify-start sm:w-[180px] md:w-[200px]"
          >
            {selectedStatus ? selectedStatus.status : "+ Set status"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 max-w-[90vw] sm:max-w-[200px]"
          side={isMobile ? "bottom" : "right"}
          align="start"
        >
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.status}
                    value={status.status}
                    onSelect={(value) => {
                      const newStatus =
                        statuses.find((s) => s.status === value) || null;
                      if (newStatus) onChange(newStatus);
                      setOpen(false);
                    }}
                  >
                    {status.status}
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
