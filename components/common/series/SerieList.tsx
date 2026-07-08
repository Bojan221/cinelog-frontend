"use client";

import { Serie } from "@/types/serie";
import { NavigationProvider, useNavigation } from "../NavigationContext";
import PaginationRounded from "@/components/common/Pagination";
import MovieCard from "../MovieCard";
import SearchInput from "@/components/filters/SearchInput";
import MovieListLoader from "@/components/core/Loading";
import SortSelect from "@/components/filters/SortSelect";
import GenreSelect from "@/components/filters/GenreSelect";

interface ListProps {
  seriesData: {
    page: number;
    totalPages: number;
    series: Serie[];
  };
}

function SeriesGrid({ seriesData }: ListProps) {
  const { isPending } = useNavigation();

  if (isPending) {
    return <MovieListLoader overlay />;
  }

  return (
    <div className="grid w-full gap-3 p-3 grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] sm:gap-5 sm:p-5 md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
      {seriesData &&
        seriesData.series.map((serie: any, idx) => {
          return (
            <MovieCard
              media={serie}
              key={serie.tmdbId}
              loading={idx < 4 ? "eager" : "lazy"}
              type="tv"
            />
          );
        })}
    </div>
  );
}

function SerieList({ seriesData }: ListProps) {
  return (
    <NavigationProvider>
      <div className="w-full">
        <div className="flex flex-wrap items-center gap-2 border-b border-black/10 px-3 py-3 sm:px-4 dark:border-white/10">
          <SearchInput placeholder="Search for movies..." />
          <SortSelect />
          <GenreSelect />
        </div>
        <SeriesGrid seriesData={seriesData} />
        <div className="flex flex-col gap-3 border-b border-black/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-black/40 dark:text-white/40">
              Page {seriesData.page} of {seriesData.totalPages}
            </span>
          </div>
          <div className="text-black [--pg-accent:#6366f1] [--pg-accent-hover:#4f46e5] dark:text-white dark:[--pg-accent:#dc2626] dark:[--pg-accent-hover:#b91c1c]">
            <PaginationRounded
              currentPage={seriesData.page}
              totalPages={seriesData.totalPages}
            />
          </div>
        </div>
      </div>
    </NavigationProvider>
  );
}

export default SerieList;
