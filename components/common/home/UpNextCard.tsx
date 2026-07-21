"use client";

import Image from "next/image";
import { FaCheck, FaStar, FaPlay } from "react-icons/fa";
import { usePreview } from "../usePreview";
import { formatRate } from "@/utils/formatters";

export interface UpNextItem {
  tmdbId: number;
  serieTitle: string;
  seasonNumber: number;
  episodeNumber: number;
  episodeName: string;
  still: string | null;
  runtime: number | null;
  airDate: string;
  vote: number;
  watchedCount: number;
  totalEpisodes: number;
}

interface Props {
  item: UpNextItem;
  busy: boolean;
  onMarkWatched: () => void;
}

function UpNextCard({ item, busy, onMarkWatched }: Props) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const preview = usePreview();

  const code = `S${String(item.seasonNumber).padStart(2, "0")}E${String(
    item.episodeNumber
  ).padStart(2, "0")}`;

  const pct =
    item.totalEpisodes > 0
      ? Math.min(100, Math.round((item.watchedCount / item.totalEpisodes) * 100))
      : 0;

  const openEpisode = () =>
    preview(
      "episode",
      `${item.tmdbId}-${item.seasonNumber}-${item.episodeNumber}`
    );

  return (
    <div className="flex w-72 shrink-0 snap-start flex-col gap-3 rounded-xl border border-black/10 p-2 transition-all duration-300 dark:border-white/10 sm:w-80">
      <button
        type="button"
        onClick={openEpisode}
        className="group relative aspect-video w-full overflow-hidden rounded-lg bg-black/5 ring-1 ring-black/10 transition duration-300 hover:ring-black/25 cursor-pointer dark:bg-white/5 dark:ring-white/10 dark:hover:ring-white/25"
      >
        {item.still ? (
          <Image
            alt={item.episodeName}
            fill
            sizes="320px"
            src={`${POST_URL}${item.still}`}
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-black/40 dark:text-white/40">
            No image
          </div>
        )}

        <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] font-bold leading-tight text-white backdrop-blur-sm">
          {code}
        </span>

        <span className="absolute inset-0 grid place-items-center bg-black/30 opacity-0 transition group-hover:opacity-100">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-black shadow-lg">
            <FaPlay size={15} className="ml-0.5" />
          </span>
        </span>
      </button>

      <div className="flex flex-col gap-2 px-1">
        <div className="flex flex-col">
          <span className="truncate text-[15px] font-semibold text-black dark:text-white">
            {item.serieTitle}
          </span>
          <span className="truncate text-xs text-black/50 dark:text-white/50">
            {code}
            {item.episodeName ? ` · ${item.episodeName}` : ""}
          </span>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-linear-to-r from-emerald-500 to-green-600 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-medium text-black/40 dark:text-white/40">
            <span>
              {item.watchedCount}/{item.totalEpisodes} episodes
            </span>
            {item.vote ? (
              <span className="flex items-center gap-1">
                <FaStar className="text-amber-500 dark:text-amber-400" size={10} />
                {formatRate(Number(item.vote))}
              </span>
            ) : item.runtime ? (
              <span>{item.runtime} min</span>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={onMarkWatched}
          disabled={busy}
          className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-500/90 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {busy ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <FaCheck size={12} />
          )}
          Mark watched
        </button>
      </div>
    </div>
  );
}

export default UpNextCard;
