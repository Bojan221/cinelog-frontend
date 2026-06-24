'use client'
import Avatar from "../core/Avatar";
import { useState } from "react";

const stats = [
  { label: "Movies Watched", value: 32 },
  { label: "TV Shows Watched", value: 12 },
  { label: "Favorites", value: 21 },
];

const tabs = [
  { id: "user", label: "User" },
  { id: "stats", label: "Stats" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function UserData() {
  const [activeTab, setActiveTab] = useState<TabId>("user");
  const activeIndex = tabs.findIndex((t) => t.id === activeTab);

  return (
    <div className="border-t border-black/10 dark:border-white/10 p-4">
      
      <div className="flex border-b border-black/10 dark:border-white/10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 pb-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "text-red-500"
                  : "text-foreground/50 hover:text-foreground/80"
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 overflow-hidden">
        <div
          className="flex items-start transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          <div className="w-full shrink-0 px-0.5" inert={activeTab !== "user"}>
            <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white shadow-sm dark:bg-foreground/3 dark:shadow-none p-3">
              <Avatar size="lg" fullName="Bojan Andzic" />
              <button className="mt-3 w-full rounded-lg border border-red-500/30 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/10 cursor-pointer">
                View Profile
              </button>
            </div>
          </div>

          <div className="w-full shrink-0 px-0.5" inert={activeTab !== "stats"}>
            <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white shadow-sm dark:bg-foreground/3 dark:shadow-none divide-y divide-black/5 dark:divide-white/5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between px-3 py-2.5 text-sm transition-colors hover:bg-foreground/5"
                >
                  <span className="text-foreground/70">{stat.label}</span>
                  <span className="font-semibold tabular-nums">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserData;
