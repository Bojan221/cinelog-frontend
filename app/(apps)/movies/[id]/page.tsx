import { Suspense } from "react";
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import MovieDetailView from "@/components/common/movies/detail/MovieDetailView";
import MovieDetailLoader from "@/components/common/movies/detail/MovieDetailLoader";
import NoDataIndicator from "@/components/common/NoDataIndicator";
import { MovieDetail } from "@/types/movie";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<MovieDetailLoader />}>
      <MovieDetailContent params={params} />
    </Suspense>
  );
}

async function MovieDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireServerAuth();
  const { id } = await params;

  let movie: MovieDetail | null = null;
  try {
    const data = await serverFetch<{ movie: MovieDetail }>(`/movies/${id}`);
    movie = data.movie;
  } catch (err) {
    console.error(err);
  }

  if (!movie) {
    return (
      <NoDataIndicator
        title="Movie unavailable"
        text="This movie doesn't exist or couldn't be loaded."
        actionLabel="Browse movies"
        actionHref="/movies/all"
      />
    );
  }

  return <MovieDetailView movie={movie} />;
}
