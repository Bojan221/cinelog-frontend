import { Suspense } from "react";
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import MovieListLoader from "@/components/core/Loading";
import ListDetailView, {
  ListDetail,
} from "@/components/common/series/ListDetailView";
import NoDataIndicator from "@/components/common/NoDataIndicator";
import { Movie } from "@/types/movie";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<MovieListLoader />}>
      <ListDetailContent params={params} />
    </Suspense>
  );
}

async function ListDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireServerAuth();
  const { id } = await params;

  let data: { list: ListDetail; series: Movie[] } | null = null;
  try {
    data = await serverFetch<{ list: ListDetail; series: Movie[] }>(
      `/series/lists/byId/${id}`
    );
  } catch (err) {
    console.error(err);
  }

  if (!data) {
    return (
      <NoDataIndicator
        title="List unavailable"
        text="This list doesn't exist or you don't have access to it."
        actionLabel="Back to lists"
        actionHref="/series/lists"
      />
    );
  }

  return <ListDetailView list={data.list} series={data.series ?? []} />;
}
