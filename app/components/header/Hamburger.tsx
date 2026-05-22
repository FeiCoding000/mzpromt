import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Menu } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/business", label: "Business Services" },
  { href: "/services/entity", label: "Entity Setup Services" },
  { href: "/services/tax", label: "Individual Tax Services" },
];

const mobileLinkClass = "rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100";

export default function Hamburger() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="md:hidden rounded p-2 hover:bg-gray-300 hover:text-black cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu />
        </button>
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription className="sr-only">
            Mobile navigation menu
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col gap-2 px-6">
          <SheetClose asChild>
            <Link href="/" className={mobileLinkClass}>
              Home
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/about" className={mobileLinkClass}>
              About
            </Link>
          </SheetClose>

          <Collapsible>
            <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100">
              Services
              <ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 flex flex-col gap-1 pl-4">
              {serviceLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {navLinks.slice(2).map((link) => (
            <SheetClose asChild key={link.href}>
              <Link href={link.href} className={mobileLinkClass}>
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
