import { Suspense } from "react";
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import ActorsList from "@/components/common/actors/ActorsList";
import ActorsLoader from "@/components/common/actors/ActorsLoader";
import { ActorListItem } from "@/types/actor";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type ActorsResponse = {
  actors: ActorListItem[];
  page: number;
  totalPages: number;
};

export default function page() {
  return (
    <Suspense fallback={<ActorsLoader />}>
      <ActorsContent />
    </Suspense>
  );
}

async function ActorsContent() {
  await requireServerAuth();

  let data: ActorsResponse = { actors: [], page: 1, totalPages: 0 };
  try {
    data = await serverFetch<ActorsResponse>("actors/list");
  } catch (err) {
    console.error(err);
  }

  return <ActorsList actors={data.actors ?? []} />;
}
