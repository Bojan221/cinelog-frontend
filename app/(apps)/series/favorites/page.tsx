import { Suspense } from "react";
import MovieListLoader from "@/components/core/Loading";
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import SerieUserList from "@/components/common/series/SerieUserList";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function page() {
  return (
    <Suspense fallback={<MovieListLoader />}>
      <FavoritesSerieList />
    </Suspense>
  );
}

async function FavoritesSerieList() {
  await requireServerAuth();

  let movies = { movies: [] };
  try {
    movies = await serverFetch("/series/lists/Favorites");
  } catch (err) {
    console.error(err);
  }
  return <SerieUserList movies={movies.movies} listType="Favorites" />;
}
