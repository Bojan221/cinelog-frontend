import { serverFetch, requireServerAuth } from "../api/serverFetch";
import { Suspense } from "react";
import HomeList from "@/components/common/home/HomeList";
import HomeLoader from "@/components/common/home/HomeLoader";
import { TopMediaItem } from "@/components/common/home/TopMediaCard";
import { UpNextItem } from "@/components/common/home/UpNextCard";

interface Episode {
  created_at: string;
  episode_number: number;
  id: number;
  overview: string;
  poster: string;
  episode_poster:string;
  releaseDate: string;
  runtime: number | null;
  season_number: number;
  title: string;
  tmdbId: number;
  type: string;
  vote: string | number;
  watched_at: string;
}

type RecentTvResponse = { episodes: Episode[] };
type TopMediaResponse = { name: string; data: TopMediaItem[] }[];
type UpNextResponse = { upNext: UpNextItem[] };

export default async function Home() {
  return (
    <Suspense fallback={<HomeLoader />}>
      <HomeDashboards />
    </Suspense>
  );
}

async function HomeDashboards() {
  await requireServerAuth();

  let recentTvResponse: RecentTvResponse = { episodes: [] };
  let topData: TopMediaResponse = [];
  let upNext: UpNextResponse = { upNext: [] };
  try {
    recentTvResponse = await serverFetch<RecentTvResponse>(
      "dashboards/recentlyTvEpisode"
    );
    topData = await serverFetch<TopMediaResponse>("dashboards/topMedia");
    upNext = await serverFetch<UpNextResponse>("dashboards/upNext");
  } catch (err) {
    console.error(err);
  }

  return (
    <HomeList
      topList={topData}
      userRecent={recentTvResponse}
      upNext={upNext.upNext ?? []}
    />
  );
}
