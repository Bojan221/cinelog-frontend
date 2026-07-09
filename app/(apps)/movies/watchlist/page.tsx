import { Suspense } from "react";
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import MovieListLoader from "@/components/core/Loading";
import WatchlistView from "@/components/common/movies/WatchlistView";
import { Movie } from "@/types/movie";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function page() {
  return (
    <Suspense fallback={<MovieListLoader firstLoad />}>
      <WatchMovieList />
    </Suspense>
  );
}

async function WatchMovieList() {
  await requireServerAuth();

  let movies: Movie[] = [];
  try {
    const moviesData = await serverFetch<{ list: string; movies: Movie[] }>(
      "/movies/lists/Watchlist"
    );
    movies = moviesData?.movies ?? [];
  } catch (err) {
    console.error(err);
  }

  return (
    <WatchlistView movies={movies} listName="Watchlist" variant="watchlist" />
  );
}
