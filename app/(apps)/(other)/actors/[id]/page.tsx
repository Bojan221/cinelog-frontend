import { Suspense } from "react";
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import ActorDetailView from "@/components/common/actors/ActorDetailView";
import ActorDetailLoader from "@/components/common/actors/ActorDetailLoader";
import NoDataIndicator from "@/components/common/NoDataIndicator";
import { ActorDetail } from "@/types/actor";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<ActorDetailLoader />}>
      <ActorContent params={params} />
    </Suspense>
  );
}

async function ActorContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireServerAuth();
  const { id } = await params;

  let actor: ActorDetail | null = null;
  try {
    const data = await serverFetch<{ actor: ActorDetail }>(`/actors/${id}`);
    actor = data.actor;
  } catch (err) {
    console.error(err);
  }

  if (!actor) {
    return (
      <NoDataIndicator
        title="Actor unavailable"
        text="This person doesn't exist or couldn't be loaded."
        actionLabel="Browse actors"
        actionHref="/actors"
      />
    );
  }

  return <ActorDetailView actor={actor} />;
}
