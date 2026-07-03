"use client";
import { useState, useEffect } from "react";
import axiosPrivate from "@/app/api/axiosPrivate";
import Image from "next/image";
import { Movie } from "@/types/movie";
import { Genre } from "@/types/genre";
import { getYearFromDate } from "@/utils/helpers";
import { FaStar } from "react-icons/fa";
import { formatRate } from "@/utils/formatters";
import { MovieLoader } from "../core/SheetLoader";

function MovieSheet({ movieId }: { movieId: string | null }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [loading, setLoading] = useState(false);
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(
          `/movies/movieDetails/${movieId}`,
        );
        setMovie(response.data.movie);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchGenres = async () => {
      try {
        const response = await axiosPrivate.get("/movies/movieGenres");
        setGenres(response.data.genres);
      } catch (err) {
        console.error(err);
      }
    };
        fetchMovie();
        fetchGenres();
    
  }, [movieId]);

 

  if (!movie || loading) return <MovieLoader />;

  const movieGenres =
    movie.genres
      ?.map((g) => genres?.find((genre) => genre.id === g.id) ?? g)
      .filter((g): g is Genre => Boolean(g?.name)) ?? [];

  return (
    <div className="flex flex-col gap-4 px-6 py-3">
      <div className="flex gap-8">
        <div className="shrink-0">
          {movie.poster ? (
            <Image
              alt={movie.title ?? String(movie.tmdbId)}
              width={200}
              height={300}
              src={`${POST_URL}${movie.poster}`}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-75 w-50 items-center justify-center text-sm text-black/40 dark:text-white/40 border rounded-lg border-white/40">
              No image
            </div>
          )}
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
    </div>
  );
}

export default MovieSheet;
