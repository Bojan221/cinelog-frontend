'use client'
import { useState } from "react";
import { applications } from "@/data/applications";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

function AppList({ onNavigate }: { onNavigate?: () => void }) {

  const pathName = usePathname();
  const [expanded, setExpanded] = useState({
    movies: true,
    series: false,
    other: false
  })

  const handleExpandedClick = (type: 'movies'|'series'|'other') => { 
    
    const current = expanded[type]
    setExpanded({...expanded, [type]:!current } )
  }

  return (
    <div className="px-6 py-2">
      <ul>
        {applications?.map((app, idx) => {
          return (
            <li key={idx}>
              <div className="flex justify-between items-center rounded-md px-2 py-3 cursor-pointer transition-all duration-300 hover:bg-foreground/10" onClick={()=> handleExpandedClick(app.filter)}>
              <p className="uppercase text-xs font-semibold tracking-widest text-foreground/40">
                {app.name}
              </p>
              <FaChevronDown className={`text-foreground/40 text-xs transition-all duration-300 ${expanded[app.filter] && 'rotate-180'}`}/>
              </div>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  expanded[app.filter]
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mt-1 flex flex-col gap-1 pb-1">
                    {app.pages.map((page) => {
                      const Icon = page.icon;
                      return (
                        <Link
                          key={page.name}
                          href={page.link}
                          onClick={onNavigate}
                          className={`flex items-center gap-3 rounded-md px-2 py-2 text-sm transition ${page.link === pathName ? "bg-red-500/10 text-red-500 font-medium":"text-foreground/90 hover:bg-foreground/5 hover:text-foreground"}`}
                        >
                          <Icon size={18} className={`shrink-0 ${page.link === pathName ? "text-red-500":"text-foreground/60"} `} />
                          <span>{page.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AppList;
