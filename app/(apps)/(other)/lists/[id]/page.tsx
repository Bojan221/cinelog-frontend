import { Suspense } from "react";
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import MyListsLoader from "@/components/common/movies/MyListsLoader";
import PublicListDetail, {
  PublicListDetailData,
} from "@/components/common/lists/PublicListDetail";
import NoDataIndicator from "@/components/common/NoDataIndicator";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<MyListsLoader />}>
      <PublicListContent params={params} />
    </Suspense>
  );
}

async function PublicListContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireServerAuth();
  const { id } = await params;

  let data: PublicListDetailData | null = null;
  try {
    data = await serverFetch<PublicListDetailData>(`/lists/${id}`);
  } catch (err) {
    console.error(err);
  }

  if (!data?.list) {
    return (
      <NoDataIndicator
        title="List unavailable"
        text="This list doesn't exist or isn't public."
        actionLabel="Back to lists"
        actionHref="/lists"
      />
    );
  }

  return <PublicListDetail data={data} />;
}
