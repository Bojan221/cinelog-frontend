'use client'
import { useState } from "react";
import { applications } from "@/data/applications";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

function AppList() {

  const pathName = usePathname();
  const [isMoviesExpanded, setIsMoviesExpanded] = useState(true);
  const [isSeriesExpanded, setIsSeriesExpanded] = useState(true);
  const [isOtherExpanded, setIsOtherExpanded] = useState(false);

  return (
    <div className="px-6 py-2">
      <ul>
        {applications?.map((app, idx) => {
          return (
            <li key={idx}>
              <div className="flex justify-between items-center">
              <p className="mt-4 uppercase text-xs font-semibold tracking-widest text-foreground/40">
                {app.name}
              </p>
              <FaChevronDown className={`text-foreground/40 transition-all duration-300 ${isMoviesExpanded && 'rotate-90deg'}`}/>
              </div>
              <div className="mt-1 flex flex-col gap-1">
                {app.pages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <Link
                      key={page.name}
                      href={page.link}
                      className={`flex items-center gap-3 rounded-md px-2 py-2 text-sm text-foreground/90 transition  ${page.link === pathName ? "rounded-md bg-white/15 text-red-400/80":"hover:bg-foreground/5 hover:text-foreground"}`}
                    >
                      <Icon size={18} className={`shrink-0 ${page.link === pathName ? "text-red-400/80":"text-foreground/60"} `} />
                      <span>{page.name}</span>
                    </Link>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AppList;
