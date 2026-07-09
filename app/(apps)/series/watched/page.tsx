import { Suspense } from "react";
import MovieListLoader from "@/components/core/Loading";
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
export const revalidate = 0;
export const dynamic = "force-dynamic";
import SerieUserList from "@/components/common/series/SerieUserList";
export default function page() {
  return (
    <Suspense fallback={<MovieListLoader />}>
      <WatchedSerieList />
    </Suspense>
  );
}

async function WatchedSerieList() {
  await requireServerAuth();

  let movies = { movies: [] };
  try {
    movies = await serverFetch("/series/lists/Watched");
  } catch (err) {
    console.error(err);
  }
  return <SerieUserList movies={movies.movies} listType="Watched" />;
}
