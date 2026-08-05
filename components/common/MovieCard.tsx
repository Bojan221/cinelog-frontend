"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
import { FaCheck, FaTrashCan } from "react-icons/fa6";
import { normalizeDate, formatRate } from "@/utils/formatters";
import { Movie } from "@/types/movie";
import { Serie } from "@/types/serie";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axiosPrivate from "@/app/api/axiosPrivate";
import { showToast } from "./Toast";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

interface CardProps {
  media: Movie | Serie;
  type: 'movie' | 'tv';
  loading: "eager" | "lazy";
  actionBusy?: boolean;
  isExiting?: boolean;
  watchedAt?: string;
  moveLabel?: string;
  onMove?: () => void;
  onRemove?: () => void;
  onUnfavorite?: () => void;
}

function Spinner() {
  return (
    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  );
}

function MovieCard({
  media,
  loading,
  type,
  actionBusy = false,
  isExiting = false,
  watchedAt,
  moveLabel,
  onMove,
  onRemove,
  onUnfavorite,
}: CardProps) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openPreview = (content: string) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set("preview", content);
    router.push(`${pathname}?${urlParams.toString()}`, { scroll: false });
  };

  const isMovie = type === "movie";
  const [isFavorite, setIsFavorite] = useState<boolean>(
    Boolean((media as Movie).favorites)
  );
  const [favLoading, setFavLoading] = useState(false);

  const toggleFavorite = async () => {
    if (favLoading) return;

    const next = !isFavorite;
    setIsFavorite(next);
    setFavLoading(true);

    const base = isMovie ? "/movies/lists" : "/series/lists";

    try {
      if (next) {
        const item = media as Movie;
        await axiosPrivate.post(base, {
          [isMovie ? "movieId" : "serieId"]: item.tmdbId,
          listName: "Favorites",
          title: item.title,
          overview: item.overview,
          poster: item.poster,
          vote: item.vote,
          releaseDate: item.releaseDate,
          runtime: item.runtime ?? null,
        });
        showToast("success", "Added to favorites");
      } else {
        await axiosPrivate.delete(`${base}/Favorites/${media.tmdbId}`);
        showToast("success", "Removed from favorites");
        onUnfavorite?.();
      }
    } catch {
      setIsFavorite(!next);
      showToast("error", "Something went wrong");
    } finally {
      setFavLoading(false);
    }
  };

  const hasListActions = Boolean(onRemove);
  const canMove = Boolean(onMove && moveLabel);

  return (
    <div
      className={`group relative flex flex-col gap-3 border rounded-xl border-black/10 dark:border-white/10 transition-all duration-300 ease-out ${
        isExiting
          ? "scale-90 opacity-0 pointer-events-none"
          : "scale-100 opacity-100"
      }`}
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 transition duration-300 group-hover:ring-black/25 group-hover:shadow-lg group-hover:shadow-black/20 dark:bg-white/5 dark:ring-white/10 dark:group-hover:ring-white/25 dark:group-hover:shadow-black/40">
        {media.poster ? (
          <Image
            alt={media.title ?? String(media.tmdbId)}
            fill
            sizes="(max-width: 768px) 45vw, 224px"
            src={`${POST_URL}${media.poster ? media.poster : media.backdrop}`}
            className="object-cover transition duration-300 group-hover:scale-[1.03] cursor-pointer"
            loading={loading}
            onClick={() => openPreview(`${type}-${media.tmdbId}`)}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-sm text-black/40 dark:text-white/40 cursor-pointer"
            onClick={() => openPreview(`movie-${media.tmdbId}`)}
          >
            No image
          </div>
        )}

        {watchedAt && (
          <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-medium leading-tight text-white/90 backdrop-blur-sm">
            Watched on {normalizeDate(watchedAt)}
          </span>
        )}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

        <button
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
          disabled={favLoading}
          onClick={toggleFavorite}
          className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" size={16} />
          ) : (
            <FaRegHeart className="text-white" size={16} />
          )}
        </button>

        {hasListActions && (
          <div className="absolute inset-x-2 bottom-2 flex gap-2 opacity-0 translate-y-2 transition duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 focus-within:opacity-100 focus-within:translate-y-0 max-md:opacity-100 max-md:translate-y-0">
            {canMove && (
              <button
                type="button"
                aria-label={`Move to ${moveLabel}`}
                disabled={actionBusy}
                onClick={onMove}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-500/90 px-2 py-2 text-xs font-semibold text-white shadow-lg shadow-black/20 backdrop-blur-sm transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {actionBusy ? <Spinner /> : <FaCheck size={12} />}
                {moveLabel}
              </button>
            )}
            <button
              type="button"
              aria-label="Remove from list"
              disabled={actionBusy}
              onClick={onRemove}
              className={`flex items-center justify-center gap-1.5 rounded-lg bg-black/55 px-2 py-2 text-xs font-semibold text-white shadow-lg shadow-black/20 backdrop-blur-sm transition hover:bg-red-500/90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer ${
                canMove ? "w-10 shrink-0" : "flex-1"
              }`}
            >
              {actionBusy && !canMove ? <Spinner /> : <FaTrashCan size={12} />}
              {!canMove && "Remove"}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 px-2 pb-2">
        <h3 className="truncate text-[15px] font-semibold text-black dark:text-white">
          {media.title ?? "Untitled"}
        </h3>

        {media.vote !== null && (
          <div className="flex items-center gap-1.5 text-sm">
            <FaStar className="text-amber-500 dark:text-amber-400" size={14} />
            <span className="font-medium text-black/80 dark:text-white/90">
              {formatRate(Number(media.vote))}
            </span>
            <span className="text-black/40 dark:text-white/40">/10</span>
          </div>
        )}

        {media.releaseDate && (
          <p className="text-xs text-black/50 dark:text-white/50">
            {normalizeDate(media.releaseDate)}
          </p>
        )}
      </div>

      <button
        type="button"
        aria-label="Open details page"
        onClick={() =>
          router.push(`/${type === "tv" ? "series" : "movies"}/${media.tmdbId}`)
        }
        className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full text-black/40 transition-colors hover:bg-black/5 hover:text-black cursor-pointer dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <FaArrowUpRightFromSquare size={13} />
      </button>
    </div>
  );
}

export default MovieCard;
