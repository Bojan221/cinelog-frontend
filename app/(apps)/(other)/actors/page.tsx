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

export default function page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  return (
    <Suspense fallback={<ActorsLoader />}>
      <ActorsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ActorsContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  await requireServerAuth();

  const { page = "1" } = await searchParams;

  let data: ActorsResponse = { actors: [], page: 1, totalPages: 0 };
  try {
    data = await serverFetch<ActorsResponse>(`actors/list?page=${page}`);
  } catch (err) {
    console.error(err);
  }

  return (
    <ActorsList
      actors={data.actors ?? []}
      page={data.page ?? 1}
      totalPages={data.totalPages ?? 0}
    />
  );
}
