"use client";

import PaginationRounded from "@/components/common/Pagination";
import MovieCard from "@/components/common/MovieCard";
import SearchInput from "../filters/SearchInput";
import SortSelect from "../filters/SortSelect";
import GenreSelect from "../filters/GenreSelect";
import MovieListLoader from "../core/Loading";
import { NavigationProvider, useNavigation } from "./NavigationContext";
import { Movie } from "@/types/movie";
import { useEffect } from "react";
import { showToast } from "./Toast";

interface Props {
  moviesData: {
    totalPages: number;
    page: number;
    movies: Movie[];
  };
}

function MovieGrid({ moviesData }: Props) {
  const { isPending } = useNavigation();

  if (isPending) {
    return <MovieListLoader overlay />;
  }
  
  return (
    <div
      className="grid w-full gap-6 p-5"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
    >
      {moviesData &&
        moviesData.movies.map((movie: any, idx) => {
          return (
            <MovieCard
              movie={movie}
              key={movie.tmdbId}
              loading={idx < 4 ? "eager" : "lazy"}
            />
          );
        })}
    </div>
  );
}
function MovieList({
  moviesData,
  loadError,
}: Props & { loadError?: boolean }) {
  useEffect(() => {
    if (loadError) {
      showToast("error", "Unable to load movies. Please try again.");
    }
  }, [loadError]);

  return (
    <NavigationProvider>
      <div className="w-full">
        <div className="px-4 py-3 border-b border-black/10 dark:border-white/10 flex items-center gap-2">
          <SearchInput placeholder="Search for movies..." />
          <SortSelect />
          <GenreSelect />
        </div>
        <MovieGrid moviesData={moviesData} />
        <div className="flex flex-col gap-3 border-b border-black/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-black/40 dark:text-white/40">
              Page {moviesData.page} of {moviesData.totalPages}
            </span>
          </div>
          <div className="text-black [--pg-accent:#6366f1] [--pg-accent-hover:#4f46e5] dark:text-white dark:[--pg-accent:#dc2626] dark:[--pg-accent-hover:#b91c1c]">
            <PaginationRounded
              currentPage={moviesData.page}
              totalPages={moviesData.totalPages}
            />
          </div>
        </div>
      </div>
    </NavigationProvider>
  );
}

export default MovieList;
