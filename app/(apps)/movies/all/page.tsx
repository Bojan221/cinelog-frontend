import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import MovieList from "@/components/common/MovieList";
import MovieListLoader from "@/components/core/Loading";
import { Suspense } from "react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  return (
    <Suspense fallback={<MovieListLoader firstLoad/>}>
      <AllMovies searchParams={searchParams} />
    </Suspense>
  );
}

async function AllMovies({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  await requireServerAuth();

  const resolvedSearchParams = await searchParams;
  const defaultParams = {
    page: "1",
  };
  const params = { ...defaultParams, ...resolvedSearchParams };
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value);
    }
  });

  let moviesData = { page: 0, movies: [], totalPages: 0 };
  try {
    moviesData = await serverFetch(`/movies/allMovies?${queryParams.toString()}`);
  } catch (err) {
    console.error(err);
  }
  return <MovieList moviesData={moviesData} />;
}
