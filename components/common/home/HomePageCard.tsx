"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { normalizeDate, formatRate } from "@/utils/formatters";
import { usePreview } from "../usePreview";

interface Episode {
  created_at: string;
  episode_number: number;
  episode_poster: string;
  id: number;
  overview: string;
  poster: string;
  releaseDate: string;
  runtime: number | null;
  season_number: number;
  title: string;
  tmdbId: number;
  type: string;
  vote: string | number;
  watched_at: string;
}

function HomePageCard({ episode }: { episode: Episode }) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const preview = usePreview();

  const openPreview = () => {
    preview(
      "episode",
      `${episode.tmdbId}-${episode.season_number}-${episode.episode_number}`
    );
  };

  const seasonEpisode = `S${String(episode.season_number).padStart(
    2,
    "0"
  )}E${String(episode.episode_number).padStart(2, "0")}`;

  return (
    <div
      onClick={openPreview}
      className="group flex w-56 shrink-0 cursor-pointer snap-start flex-col gap-3 rounded-xl border border-black/10 transition-all duration-300 ease-out dark:border-white/10 sm:w-64"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 transition duration-300 group-hover:shadow-lg group-hover:shadow-black/20 group-hover:ring-black/25 dark:bg-white/5 dark:ring-white/10 dark:group-hover:shadow-black/40 dark:group-hover:ring-white/25">
        {episode.episode_poster ? (
          <Image
            alt={episode.title ?? String(episode.tmdbId)}
            fill
            sizes="256px"
            src={`${POST_URL}${episode.episode_poster}`}
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-black/40 dark:text-white/40">
            No image
          </div>
        )}

        <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[11px] font-semibold leading-tight text-white/90 backdrop-blur-sm">
          {seasonEpisode}
        </span>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="flex flex-col gap-1.5 px-2 pb-2">
        <h3 className="truncate text-[15px] font-semibold text-black dark:text-white">
          {episode.title ?? "Untitled"}
        </h3>

        {episode.vote !== null && (
          <div className="flex items-center gap-1.5 text-sm">
            <FaStar className="text-amber-500 dark:text-amber-400" size={14} />
            <span className="font-medium text-black/80 dark:text-white/90">
              {formatRate(Number(episode.vote))}
            </span>
            <span className="text-black/40 dark:text-white/40">/10</span>
          </div>
        )}

        {episode.watched_at && (
          <p className="text-xs text-black/50 dark:text-white/50">
            Watched on {normalizeDate(episode.watched_at)}
          </p>
        )}
      </div>
    </div>
  );
}

export default HomePageCard;
