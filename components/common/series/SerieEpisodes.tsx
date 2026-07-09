"use client";
import { useState } from "react";
import Image from "next/image";
import axiosPrivate from "@/app/api/axiosPrivate";
import { SerieDetail, Episode } from "@/types/serie";
import { getYearFromDate } from "@/utils/helpers";
import { FaChevronDown, FaStar } from "react-icons/fa";
import { showToast } from "../Toast";

interface Props {
  serie: SerieDetail;
}

function SerieEpisodes({ serie }: Props) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [episodes, setEpisodes] = useState<Record<number, Episode[]>>({});
  const [loading, setLoading] = useState<Set<number>>(new Set());

  const fetchEpisodes = async (seasonNumber: number) => {
    if (episodes[seasonNumber]) return;
    try {
      setLoading((prev) => new Set(prev).add(seasonNumber));
      const response = await axiosPrivate.get(
        `/series/${serie.tmdbId}/season/${seasonNumber}`
      );
      setEpisodes((prev) => ({
        ...prev,
        [seasonNumber]: response.data.season?.episodes ?? [],
      }));
    } catch (err) {
      showToast("error", "Error fetching episodes");
    } finally {
      setLoading((prev) => {
        const next = new Set(prev);
        next.delete(seasonNumber);
        return next;
      });
    }
  };

  const toggle = (id: number, seasonNumber: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        fetchEpisodes(seasonNumber);
      }
      return next;
    });
  };

  const seasons =
    serie.seasons?.filter((season) => season.seasonNumber !== 0) ?? [];

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto px-4 py-3 thin-scrollbar sm:px-6">
      {seasons.length > 0 ? (
        seasons.map((season) => {
          const isOpen = expanded.has(season.id);
          const isLoading = loading.has(season.seasonNumber);
          const seasonEpisodes = episodes[season.seasonNumber];
          return (
            <div
              key={season.id}
              className="w-full shrink-0 overflow-hidden rounded-lg border border-black/10 dark:border-white/15"
            >
              <button
                onClick={() => toggle(season.id, season.seasonNumber)}
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
                    {season.overview ? (
                      <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">
                        {season.overview}
                      </p>
                    ) : null}

                    {isLoading ? (
                      <div className="flex flex-col gap-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex gap-3 rounded-lg border border-black/5 p-2 dark:border-white/10"
                          >
                            <div className="h-14 w-24 shrink-0 animate-pulse rounded-md bg-black/10 dark:bg-white/10" />
                            <div className="flex flex-1 flex-col gap-2 py-1">
                              <div className="h-3 w-1/2 animate-pulse rounded bg-black/10 dark:bg-white/10" />
                              <div className="h-3 w-full animate-pulse rounded bg-black/10 dark:bg-white/10" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : seasonEpisodes && seasonEpisodes.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {seasonEpisodes.map((episode) => (
                          <div
                            key={episode.id}
                            className="flex flex-col gap-3 rounded-lg border border-black/5 p-2 dark:border-white/10 sm:flex-row"
                          >
                            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md border border-black/10 dark:border-white/15 sm:h-16 sm:w-28">
                              {episode.still ? (
                                <Image
                                  alt={episode.name}
                                  src={`${POST_URL}${episode.still}`}
                                  fill
                                  sizes="(max-width: 640px) 100vw, 112px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-black/5 text-[10px] text-black/40 dark:bg-white/5 dark:text-white/40">
                                  No image
                                </div>
                              )}
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-sm font-semibold text-black/90 dark:text-white/90">
                                  <span className="text-black/40 dark:text-white/40">
                                    {episode.episodeNumber}.
                                  </span>{" "}
                                  {episode.name}
                                </span>
                                {episode.vote ? (
                                  <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-black/70 dark:text-white/80">
                                    <FaStar
                                      className="text-amber-500 dark:text-amber-400"
                                      size={11}
                                    />
                                    {episode.vote.toFixed(1)}
                                  </span>
                                ) : null}
                              </div>
                              <span className="flex items-center gap-2 text-[11px] font-medium text-black/40 dark:text-white/40">
                                {episode.airDate ? (
                                  <span>{episode.airDate}</span>
                                ) : null}
                                {episode.runtime ? (
                                  <>
                                    <span aria-hidden>·</span>
                                    <span>{episode.runtime} min</span>
                                  </>
                                ) : null}
                              </span>
                              {episode.overview ? (
                                <p className="line-clamp-3 text-xs leading-relaxed text-black/60 dark:text-white/70">
                                  {episode.overview}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : seasonEpisodes ? (
                      <p className="text-sm text-black/40 dark:text-white/40">
                        No episodes available.
                      </p>
                    ) : null}
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
