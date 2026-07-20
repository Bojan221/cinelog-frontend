import { Suspense } from "react";
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import SerieDetailView from "@/components/common/series/detail/SerieDetailView";
import MovieDetailLoader from "@/components/common/movies/detail/MovieDetailLoader";
import NoDataIndicator from "@/components/common/NoDataIndicator";
import { SerieDetail } from "@/types/serie";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<MovieDetailLoader />}>
      <SerieDetailContent params={params} />
    </Suspense>
  );
}

async function SerieDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireServerAuth();
  const { id } = await params;

  let serie: SerieDetail | null = null;
  try {
    const data = await serverFetch<{ serie: SerieDetail }>(`/series/${id}`);
    serie = data.serie;
  } catch (err) {
    console.error(err);
  }

  if (!serie) {
    return (
      <NoDataIndicator
        title="Series unavailable"
        text="This series doesn't exist or couldn't be loaded."
        actionLabel="Browse series"
        actionHref="/series/all"
      />
    );
  }

  return <SerieDetailView serie={serie} />;
}
