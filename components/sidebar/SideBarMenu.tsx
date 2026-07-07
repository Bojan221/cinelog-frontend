"use client";

import ThemeToggle from "./ThemeToggle";
import Logo from "../core/Logo";
import AppList from "./AppList";
import UserData from "./UserData";
import { IoClose } from "react-icons/io5";

interface Props {
  open: boolean;
  onClose: () => void;
}

function SideBarMenu({ open, onClose }: Props) {
  return (
    <>
      {/* Backdrop — mobile only, behind the drawer. */}
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[86%] max-w-80 flex-col border-r border-black/10 bg-neutral-50 transition-transform duration-300 ease-out lg:sticky lg:z-auto lg:w-80 lg:max-w-none lg:translate-x-0 dark:border-white/10 dark:bg-background lg:dark:bg-transparent ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <Logo size="lg" />
          {/* Theme toggle on desktop, close button on mobile. */}
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-lg text-foreground/60 transition hover:bg-foreground/10 hover:text-foreground lg:hidden"
          >
            <IoClose size={26} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto sleek-scrollbar">
          <AppList onNavigate={onClose} />
        </div>
        <UserData />
      </aside>
    </>
  );
}

export default SideBarMenu;
