"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import fav from "@/app/favicon.ico";

const links = ["/home", "/destinations", "/gallery"];

export function Header() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image src={fav} height={24} alt="logo" />
          <span className="font-bold text-xl">Bonanza</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link: string, index: number) => {
            const title = link.split("/")[1];
            const disply = `${title.charAt(0).toUpperCase()}${title.slice(1)}`;
            return (
              <Link
                key={index}
                href={link}
                className="text-sm font-medium aria-selected:text-muted-foreground hover:text-primary transition-colors"
                aria-selected={path === link}
              >
                {disply}
              </Link>
            );
          })}
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
