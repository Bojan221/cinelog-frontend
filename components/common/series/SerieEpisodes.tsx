"use client";
import { useState } from "react";
import Image from "next/image";
import { SerieDetail } from "@/types/serie";
import { getYearFromDate } from "@/utils/helpers";
import { FaChevronDown, FaStar } from "react-icons/fa";

interface Props {
  serie: SerieDetail;
}

function SerieEpisodes({ serie }: Props) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const seasons =
    serie.seasons?.filter((season) => season.seasonNumber !== 0) ?? [];

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto px-4 py-3 thin-scrollbar sm:px-6">
      {seasons.length > 0 ? (
        seasons.map((season) => {
          const isOpen = expanded === season.id;
          return (
            <div
              key={season.id}
              className="w-full shrink-0 overflow-hidden rounded-lg border border-black/10 dark:border-white/15"
            >
              <button
                onClick={() => toggle(season.id)}
                className="flex w-full items-center gap-4 px-4 py-3 text-left cursor-pointer transition-colors duration-200 hover:bg-black/3 dark:hover:bg-white/5"
              >
                <div className="relative h-18 w-12 shrink-0 overflow-hidden rounded-md border border-black/10 dark:border-white/15">
                  {season.poster ? (
                    <Image
                      alt={season.name}
                      src={`${POST_URL}${season.poster}`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-black/5 text-[10px] text-black/40 dark:bg-white/5 dark:text-white/40">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
                    {season.name}
                  </span>
                  <span className="flex items-center gap-2 text-xs font-medium text-black/50 dark:text-white/50">
                    {season.airDate ? (
                      <>
                        <span>{getYearFromDate(season.airDate)}</span>
                        <span aria-hidden>·</span>
                      </>
                    ) : null}
                    <span>
                      {season.episodeCount}{" "}
                      {season.episodeCount === 1 ? "Episode" : "Episodes"}
                    </span>
                  </span>
                </div>
                <FaChevronDown
                  size={14}
                  className={`shrink-0 text-black/40 transition-transform duration-200 dark:text-white/40 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-3 border-t border-black/10 px-4 py-3 dark:border-white/15">
                    {season.vote ? (
                      <div className="flex items-center gap-1.5 text-sm">
                        <FaStar
                          className="text-amber-500 dark:text-amber-400"
                          size={14}
                        />
                        <span className="font-semibold text-black/80 dark:text-white/90">
                          {season.vote}
                        </span>
                        <span className="text-black/40 dark:text-white/40">
                          /10
                        </span>
                      </div>
                    ) : null}
                    <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">
                      {season.overview || "No overview available."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex h-full items-center justify-center text-2xl text-black/40 dark:text-white/40">
          No Seasons
        </div>
      )}
    </div>
  );
}

export default SerieEpisodes;
