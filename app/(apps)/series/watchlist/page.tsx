import { Suspense } from "react";
import MovieListLoader from "@/components/core/Loading";
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import SerieUserList from "@/components/common/series/SerieUserList";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function page() {
  return (
    <Suspense fallback={<MovieListLoader />}>
      <WatchlistSerieList />
    </Suspense>
  );
}

async function WatchlistSerieList() {
  await requireServerAuth();

  let movies = { movies: [] };
  try {
    movies = await serverFetch("/series/lists/Watchlist");
  } catch (err) {
    console.error(err);
  }
  return <SerieUserList movies={movies.movies} listType="Watchlist" />;
}
