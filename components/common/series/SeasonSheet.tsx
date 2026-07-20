"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axiosPrivate from "@/app/api/axiosPrivate";
import { SeasonDetail } from "@/types/serie";
import { MovieLoader } from "../../core/SheetLoader";
import { FaStar, FaCalendarDays, FaChevronRight } from "react-icons/fa6";
import { normalizeDate, formatRate } from "@/utils/formatters";
import { getYearFromDate } from "@/utils/helpers";
import CastCard from "../movies/detail/CastCard";
import NoDataIndicator from "../NoDataIndicator";
import { usePreview } from "../usePreview";

interface Props {
  serieId: string | null;
  seasonNumber: string | null;
}

function SeasonSheet({ serieId, seasonNumber }: Props) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const openPreview = usePreview();
  const [season, setSeason] = useState<SeasonDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeason = async () => {
      try {
        setLoading(true);
        const { data } = await axiosPrivate.get(
          `/series/${serieId}/season/${seasonNumber}`
        );
        setSeason(data.season);
      } catch {
        setSeason(null);
      } finally {
        setLoading(false);
      }
    };
    if (serieId && seasonNumber) fetchSeason();
  }, [serieId, seasonNumber]);

  if (loading) return <MovieLoader />;

  if (!season) {
    return (
      <NoDataIndicator
        title="Season unavailable"
        text="This season couldn't be loaded."
      />
    );
  }

  const year = getYearFromDate(season.airDate);

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto px-4 py-3 thin-scrollbar sm:px-6">
      {/* Header */}
      <div className="flex gap-4">
        <div className="relative h-42 w-28 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/5">
          {season.poster ? (
            <Image
              alt={season.name}
              src={`${POST_URL}${season.poster}`}
              fill
              sizes="112px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-black/40 dark:text-white/40">
              No image
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
            {season.name}
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-black/60 dark:text-white/60">
            {year ? (
              <span className="flex items-center gap-1.5">
                <FaCalendarDays size={13} />
                {year}
              </span>
            ) : null}
            {season.vote ? (
              <span className="flex items-center gap-1.5">
                <FaStar className="text-amber-500 dark:text-amber-400" size={13} />
                {formatRate(season.vote)}
              </span>
            ) : null}
            <span>
              {season.episodes?.length ?? 0}{" "}
              {season.episodes?.length === 1 ? "Episode" : "Episodes"}
            </span>
          </div>
        </div>
      </div>

      {season.overview ? (
        <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">
          {season.overview}
        </p>
      ) : null}

      {/* Season cast */}
      {season.cast?.length ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Cast
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2 thin-scrollbar">
            {season.cast.map((c) => (
              <CastCard key={c.id} actor={c} />
            ))}
          </div>
        </div>
      ) : null}

      {/* Episodes */}
      {season.episodes?.length ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Episodes{" "}
            <span className="text-sm font-normal text-black/40 dark:text-white/40">
              ({season.episodes.length})
            </span>
          </h3>
          <div className="flex flex-col gap-2">
            {season.episodes.map((ep) => (
              <button
                key={ep.id}
                type="button"
                onClick={() =>
                  openPreview(
                    "episode",
                    `${serieId}-${seasonNumber}-${ep.episodeNumber}`
                  )
                }
                className="group flex gap-3 rounded-lg border border-black/10 p-2 text-left transition-all duration-200 hover:border-black/20 hover:bg-black/3 cursor-pointer dark:border-white/10 dark:hover:border-white/25 dark:hover:bg-white/5"
              >
                <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-md border border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/5">
                  {ep.still ? (
                    <Image
                      alt={ep.name}
                      src={`${POST_URL}${ep.still}`}
                      fill
                      sizes="112px"
                      className="object-cover transition duration-300 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-black/40 dark:text-white/40">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1 py-0.5">
                  <span className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
                    <span className="text-black/40 dark:text-white/40">
                      {ep.episodeNumber}.
                    </span>{" "}
                    {ep.name}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-medium text-black/40 dark:text-white/40">
                    {ep.airDate ? <span>{normalizeDate(ep.airDate)}</span> : null}
                    {ep.runtime ? (
                      <>
                        <span aria-hidden>·</span>
                        <span>{ep.runtime} min</span>
                      </>
                    ) : null}
                    {ep.vote ? (
                      <>
                        <span aria-hidden>·</span>
                        <span className="flex items-center gap-1">
                          <FaStar
                            className="text-amber-500 dark:text-amber-400"
                            size={10}
                          />
                          {formatRate(ep.vote)}
                        </span>
                      </>
                    ) : null}
                  </div>
                  {ep.overview ? (
                    <p className="line-clamp-2 text-xs leading-relaxed text-black/60 dark:text-white/70">
                      {ep.overview}
                    </p>
                  ) : null}
                </div>
                <FaChevronRight
                  size={14}
                  className="mt-1 shrink-0 self-center text-black/25 transition group-hover:text-black/50 dark:text-white/25 dark:group-hover:text-white/50"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SeasonSheet;
