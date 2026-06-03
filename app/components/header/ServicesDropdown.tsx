"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { services } from "@/lib/constants/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onPointerEnter={openMenu}
          onPointerLeave={closeMenu}
          className="h-full flex items-center border-b-2 border-t-2 border-t-transparent border-b-transparent hover:border-b-brand focus-visible:outline-none"
        >
          Services
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={0}
        className="z-[200] w-72 rounded-none border-white/10 bg-white p-2 text-black shadow-xl dark:bg-gray-800 dark:text-white"
        onPointerEnter={openMenu}
        onPointerLeave={closeMenu}
        onEscapeKeyDown={() => setOpen(false)}
        onPointerDownOutside={() => setOpen(false)}
      >
        {services.map((group) => (
          <DropdownMenuSub key={group.href}>
            <DropdownMenuSubTrigger className="cursor-pointer px-3 py-2 font-medium">
              {group.title}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="z-[200] w-72 rounded-none bg-white p-2 text-black shadow-xl dark:bg-gray-800 dark:text-white">
              {group.items.map((item) => (
                <DropdownMenuItem key={item.href} asChild className="cursor-pointer px-3 py-2">
                  <Link href={item.href}>{item.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
