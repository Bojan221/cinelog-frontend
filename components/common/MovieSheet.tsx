"use client";
import { useState, useEffect } from "react";
import axiosPrivate from "@/app/api/axiosPrivate";
import Image from "next/image";
import { Movie } from "@/types/movie";
import { getYearFromDate } from "@/utils/helpers";
import { FaStar } from "react-icons/fa";
import { formatRate } from "@/utils/formatters";

function MovieSheet({ movieId }: { movieId: string | null }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axiosPrivate.get(
          `/movies/movieDetails/${movieId}`,
        );
        setMovie(response.data.movie);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovie();
  }, [movieId]);
  if (!movie) return null;
  return (
    <div className="flex flex-col gap-4 px-6 py-3">
      <div className="flex gap-8">
        <div className="shrink-0">
          <Image
            alt={movie.title ?? String(movie.tmdbId)}
            width={200}
            height={300}
            src={`${POST_URL}${movie.poster}`}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-semibold text-black dark:text-white">
              {movie.title}
            </h2>
            <p className="flex items-center gap-2 text-base font-medium text-black/50 dark:text-white/50">
              <span>{getYearFromDate(movie.releaseDate)}</span>
              {movie.runtime ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{movie.runtime} min</span>
                </>
              ) : null}
            </p>
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
    </div>
  );
}

export default MovieSheet;
