"use client";

import Image from "next/image";
import { useState } from "react";
import { Movie } from "@/types/movie";
import { Genre } from "@/types/genre";
import { getYearFromDate } from "@/utils/helpers";
import { FaStar } from "react-icons/fa";
import { formatRate, normalizeDate } from "@/utils/formatters";
import DragScroll from "./DragScroll";
import axiosPrivate from "@/app/api/axiosPrivate";
import { showToast } from "./Toast";
import AddToListPopup from "./AddToListPopup";

interface Props {
  movie: Movie;
  genres: Genre[];
  trailerLoaded: boolean;
  setTrailerLoaded: (value: boolean) => void;
}

function MovieInfo({ movie, genres, trailerLoaded, setTrailerLoaded }: Props) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const [showAddToList, setShowAddToList] = useState(false);

  const movieGenres =
    movie.genres
      ?.map((g) => genres?.find((genre) => genre.id === g.id) ?? g)
      .filter((g): g is Genre => Boolean(g?.name)) ?? [];

  const movieActors =
    movie.actors?.length > 0
      ? movie.actors.map((actor) => actor.name).join(", ")
      : "-";

  const movieWritters =
    movie.writers?.length > 0
      ? movie.writers.map((writter) => writter.name).join(", ")
      : "-";

  const addToList = async (list: string) => {
    try {
      const body = {
        movieId: movie.tmdbId,
        listName: list,
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster,
        releaseDate: movie.releaseDate,
        vote: movie.vote,
        runtime: movie.runtime
      };
      await axiosPrivate.post(`/movies/lists`, body);
      showToast("success", "Movie successfully added");
    } catch (err) {
      const res = (err as { response?: { status?: number; data?: { message?: string } } })?.response;
      if (res?.status === 409) {
        return showToast("info", res.data?.message ?? "Already in this list");
      } else {
        return showToast("error", "Error adding to list");
      }
    }
  };
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto px-4 py-3 thin-scrollbar sm:px-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
        <div className="mx-auto shrink-0 sm:mx-0">
          {movie.poster ? (
            <Image
              alt={movie.title ?? String(movie.tmdbId)}
              width={200}
              height={300}
              src={`${POST_URL}${movie.poster}`}
              className="rounded-lg object-cover border border-black/10 dark:border-white/20"
            />
          ) : (
            <div className="flex h-75 w-50 items-center justify-center rounded-lg border border-black/10 bg-black/5 text-sm text-black/40 dark:border-white/15 dark:bg-white/5 dark:text-white/40">
              No image
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold text-black sm:text-4xl dark:text-white">
              {movie.title}
            </h2>
            {movie.tagline ? (
              <p className="text-sm italic text-black/50 dark:text-white/50">
                {movie.tagline}
              </p>
            ) : null}
            <p className="flex items-center gap-2 text-base font-medium text-black/50 dark:text-white/50">
              {movie.releaseDate ? (
                <span>{getYearFromDate(movie.releaseDate)}</span>
              ) : (
                <span>-</span>
              )}
              {movie.runtime ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{movie.runtime} min</span>
                </>
              ) : (
                <span>-</span>
              )}
            </p>

            {movieGenres.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {movieGenres.map((genre) => (
                  <span
                    key={genre.id}
                    className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-sm font-medium text-black/70 dark:bg-white/10 dark:text-white/70"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-1.5 text-lg">
            <FaStar className="text-amber-500 dark:text-amber-400" size={20} />
            <span className="font-semibold text-black/80 dark:text-white/90">
              {formatRate(movie.vote)}
            </span>
            <span className="text-black/40 dark:text-white/40">/10</span>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-black/50 dark:text-white/50">
              Status
            </p>
            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium ${
                movie.status === "Released"
                  ? "bg-green-500/15 text-green-600 dark:text-green-400"
                  : "bg-black/10 text-black/60 dark:bg-white/10 dark:text-white/60"
              }`}
            >
              {movie.status}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 py-2 border-y border-black/10 sm:gap-3 dark:border-white/15">
        <div>
          <button
            className="flex items-center justify-center bg-red-500/90 rounded-md px-4 py-2 text-white font-semibold text-xs cursor-pointer transition-all duration-200 hover:bg-red-600"
            onClick={() => addToList("Watchlist")}
          >
            Add To Watch List
          </button>
        </div>
        <div>
          <button className="flex items-center justify-center bg-red-500/90 rounded-md px-4 py-2 text-white font-semibold text-xs cursor-pointer transition-all duration-200 hover:bg-red-600" onClick={()=> addToList('watched')}>
            Add To Watched List
          </button>
        </div>
        <div>
          <button
            className="flex items-center justify-center bg-red-500/90 rounded-md px-4 py-2 text-white font-semibold text-xs cursor-pointer transition-all duration-200 hover:bg-red-600"
            onClick={() => setShowAddToList(true)}
          >
            Add To Another List
          </button>
        </div>
      </div>

      <AddToListPopup
        isOpen={showAddToList}
        onClose={() => setShowAddToList(false)}
        media={movie}
        type="movie"
      />
      {movie.overview ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Overview
          </h3>
          <p className="rounded-lg border border-black/10 bg-black/2 px-4 py-3 text-sm leading-relaxed text-black/70 dark:border-white/15 dark:bg-white/3 dark:text-white/80">
            {movie.overview}
          </p>
        </div>
      ) : null}

      {movie.trailer?.key ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Trailer
          </h3>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-black/10 dark:border-white/15">
            {!trailerLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/20 border-t-black/60 dark:border-white/20 dark:border-t-white/70" />
              </div>
            ) : null}
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${movie.trailer.key}`}
              title={movie.trailer.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setTrailerLoaded(true)}
            />
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-black dark:text-white">
          Movie Info
        </h3>
        <div className="flex flex-col divide-y divide-black/10 rounded-lg border border-black/10 text-sm dark:divide-white/10 dark:border-white/15">
          <div className="flex items-center px-4 py-2.5">
            <span className="w-[25%] shrink-0 font-medium text-black/50 dark:text-white/50">
              Director
            </span>
            <span className="text-black/80 dark:text-white/90">
              {movie.director?.name ?? "-"}
            </span>
          </div>
          <div className="flex items-center px-4 py-2.5">
            <span className="w-[25%] shrink-0 font-medium text-black/50 dark:text-white/50">
              Writers
            </span>
            <span className="text-black/80 dark:text-white/90">
              {movieWritters}
            </span>
          </div>
          <div className="flex items-center px-4 py-2.5">
            <span className="w-[25%] shrink-0 font-medium text-black/50 dark:text-white/50">
              Cast
            </span>
            <DragScroll className="min-w-0 flex-1 whitespace-nowrap text-black/80 dark:text-white/90">
              {movieActors}
            </DragScroll>
          </div>
          <div className="flex items-center px-4 py-2.5">
            <span className="w-[25%] shrink-0 font-medium text-black/50 dark:text-white/50">
              Release Date
            </span>
            <span className="text-black/80 dark:text-white/90">
              {movie.releaseDate ? normalizeDate(movie.releaseDate) : "-"}
            </span>
          </div>
          <div className="flex items-center px-4 py-2.5">
            <span className="w-[25%] shrink-0 font-medium text-black/50 dark:text-white/50">
              TMDB Rating
            </span>
            {movie.vote && movie.voteCount ? (
              <span className="flex items-center gap-2 text-black/80 dark:text-white/90">
                <FaStar
                  className="text-amber-500 dark:text-amber-400"
                  size={16}
                />
                <span className="font-semibold">{formatRate(movie.vote)}</span>
                <span className="text-black/40 dark:text-white/40">
                  ({movie.voteCount} votes)
                </span>
              </span>
            ) : (
              <span className="text-black/80 dark:text-white/90">-</span>
            )}
          </div>
          <div className="flex items-start px-4 py-2.5">
            <span className="w-[25%] shrink-0 pt-0.5 font-medium text-black/50 dark:text-white/50">
              Genres
            </span>
            {movieGenres.length > 0 ? (
              <div className="flex flex-1 flex-wrap gap-1.5">
                {movieGenres.map((genre) => (
                  <span
                    key={genre.id}
                    className="inline-flex items-center rounded-full bg-black/5 px-2.5 py-0.5 text-xs font-medium text-black/70 dark:bg-white/10 dark:text-white/70"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-black/80 dark:text-white/90">-</span>
            )}
          </div>
          <div className="flex items-start px-4 py-2.5">
            <span className="w-[25%] shrink-0 pt-0.5 font-medium text-black/50 dark:text-white/50">
              Keywords
            </span>
            {movie.keywords?.length > 0 ? (
              <div className="flex flex-1 flex-wrap gap-1.5">
                {movie.keywords.map((keyword) => (
                  <span
                    key={keyword.id}
                    className="inline-flex items-center rounded-full bg-black/5 px-2.5 py-0.5 text-xs font-medium text-black/70 dark:bg-white/10 dark:text-white/70"
                  >
                    {keyword.name}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-black/80 dark:text-white/90">-</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
