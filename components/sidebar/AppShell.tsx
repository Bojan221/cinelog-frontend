"use client";

import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import SideBarMenu from "./SideBarMenu";
import Logo from "../core/Logo";
import ThemeToggle from "./ThemeToggle";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <SideBarMenu open={open} onClose={() => setOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar — sidebar lives behind the hamburger below lg. */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-black/10 bg-background/80 px-4 py-2.5 backdrop-blur-md lg:hidden dark:border-white/10">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-lg text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
          >
            <HiMenu size={24} />
          </button>
          <Logo size="md" />
          <ThemeToggle />
        </header>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
