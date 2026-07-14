"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { ActorMovieCredit, ActorTvCredit } from "@/types/actor";
import { getYearFromDate } from "@/utils/helpers";
import { formatRate } from "@/utils/formatters";
import { usePreview } from "../usePreview";

interface Props {
  movieCredits: ActorMovieCredit[];
  tvCredits: ActorTvCredit[];
}

type CreditItem = {
  type: "movie" | "tv";
  tmdbId: number;
  title: string;
  character: string;
  poster: string | null;
  date?: string;
  vote: number;
};

function CreditCard({ credit }: { credit: CreditItem }) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const openPreview = usePreview();
  const year = getYearFromDate(credit.date);

  return (
    <button
      type="button"
      onClick={() => openPreview(credit.type, credit.tmdbId)}
      className="group flex gap-3 rounded-lg border border-black/10 p-2 text-left transition-all duration-200 hover:border-black/20 hover:bg-black/3 cursor-pointer dark:border-white/10 dark:hover:border-white/25 dark:hover:bg-white/5"
    >
      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-md border border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/5">
        {credit.poster ? (
          <Image
            alt={credit.title}
            src={`${POST_URL}${credit.poster}`}
            fill
            sizes="64px"
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
          {credit.title}
        </span>
        {credit.character ? (
          <span className="line-clamp-2 text-xs text-black/60 dark:text-white/70">
            as {credit.character}
          </span>
        ) : null}
        <div className="mt-auto flex items-center gap-2 text-[11px] font-medium text-black/40 dark:text-white/40">
          {year ? <span>{year}</span> : null}
          {credit.vote ? (
            <>
              {year ? <span aria-hidden>·</span> : null}
              <span className="flex items-center gap-1">
                <FaStar className="text-amber-500 dark:text-amber-400" size={10} />
                {formatRate(credit.vote)}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </button>
  );
}

function ActorCredits({ movieCredits, tvCredits }: Props) {
  const movies: CreditItem[] = [...(movieCredits ?? [])]
    .sort(
      (a, b) =>
        new Date(b.releaseDate || 0).getTime() -
        new Date(a.releaseDate || 0).getTime()
    )
    .map((c) => ({
      type: "movie",
      tmdbId: c.tmdbId,
      title: c.title,
      character: c.character,
      poster: c.poster,
      date: c.releaseDate,
      vote: c.vote,
    }));

  const tv: CreditItem[] = [...(tvCredits ?? [])]
    .sort(
      (a, b) =>
        new Date(b.firstAirDate || 0).getTime() -
        new Date(a.firstAirDate || 0).getTime()
    )
    .map((c) => ({
      type: "tv",
      tmdbId: c.tmdbId,
      title: c.name,
      character: c.character,
      poster: c.poster,
      date: c.firstAirDate,
      vote: c.vote,
    }));

  if (movies.length === 0 && tv.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-2xl text-black/40 dark:text-white/40">
        No Credits
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-3 thin-scrollbar sm:px-6">
      {movies.length > 0 ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Movies{" "}
            <span className="text-sm font-normal text-black/40 dark:text-white/40">
              ({movies.length})
            </span>
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {movies.map((credit,idx) => (
              <CreditCard key={idx} credit={credit} />
            ))}
          </div>
        </div>
      ) : null}

      {tv.length > 0 ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            TV Shows{" "}
            <span className="text-sm font-normal text-black/40 dark:text-white/40">
              ({tv.length})
            </span>
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {tv.map((credit) => (
              <CreditCard key={`tv-${credit.tmdbId}`} credit={credit} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ActorCredits;
