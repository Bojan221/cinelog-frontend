"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { normalizeDate, formatRate } from "@/utils/formatters"; 

function MovieCard({ movie,loading }: { movie: any,loading:"eager" | "lazy" }) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const [favorite, setFavorite] = useState<boolean>(!!movie.favorite);

  return (
    <div className="group flex flex-col gap-3 border rounded-xl border-black/10 dark:border-white/10">
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 transition duration-300 group-hover:ring-black/25 group-hover:shadow-lg group-hover:shadow-black/20 dark:bg-white/5 dark:ring-white/10 dark:group-hover:ring-white/25 dark:group-hover:shadow-black/40">
        {movie.poster_path ? (
          <Image
            alt={movie.title ?? String(movie.id)}
            fill
            sizes="(max-width: 768px) 45vw, 224px"
            src={`${POST_URL}${movie.poster_path}`}
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            loading={loading}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-black/40 dark:text-white/40">
            No image
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setFavorite((f) => !f);
          }}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
        >
          {favorite ? (
            <FaHeart className="text-red-500" size={16} />
          ) : (
            <FaRegHeart className="text-white" size={16} />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-1.5 px-2 pb-2">
        <h3 className="truncate text-[15px] font-semibold text-black dark:text-white">
          {movie.title ?? "Untitled"}
        </h3>

        {movie.vote_average !== null && (
          <div className="flex items-center gap-1.5 text-sm">
            <FaStar className="text-amber-500 dark:text-amber-400" size={14} />
            <span className="font-medium text-black/80 dark:text-white/90">
              {formatRate(movie.vote_average)}
            </span>
            <span className="text-black/40 dark:text-white/40">/10</span>
          </div>
        )}
 
        {movie.release_date && <p className="text-xs text-black/50 dark:text-white/50">{normalizeDate(movie.release_date)}</p>}
      </div>
    </div>
  );
}

export default MovieCard;
