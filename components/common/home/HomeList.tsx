"use client";
import { ReactNode } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaStar, FaFilm } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuCalendarClock } from "react-icons/lu";
import HomePageCard from "./HomePageCard";
import MediaRail from "./MediaRail";
import TopMediaCard, { TopMediaItem } from "./TopMediaCard";

const CATEGORY_ICONS: Record<string, ReactNode> = {
  "Top Rated": <FaStar className="text-[22px] text-amber-400" />,
  Upcoming: <LuCalendarClock className="text-[22px] text-sky-400" />,
  Trending: <FaArrowTrendUp className="text-[22px] text-rose-400" />,
};

const getCategoryIcon = (name: string): ReactNode =>
  CATEGORY_ICONS[name] ?? <FaFilm className="text-[22px] text-white/70" />;

interface Episode {
  created_at: string;
  episode_number: number;
  id: number;
  overview: string;
  poster: string;
  releaseDate: string;
  runtime: number | null;
  episode_poster: string;
  season_number: number;
  title: string;
  tmdbId: number;
  type: string;
  vote: string | number;
  watched_at: string;
}
interface Props {
  userRecent: { episodes: Episode[] };
  topList: { name: string; data: TopMediaItem[] }[];
}

function HomeList({ userRecent, topList }: Props) {
  const episodes = userRecent.episodes;

  return (
    <div className="flex w-full flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {episodes.length >= 3 && (
        <MediaRail
          title="Recently Watched Episodes"
          icon={
            <IoMdCheckmarkCircleOutline className="text-[22px] text-emerald-400" />
          }
        >
          {episodes.map((episode, idx) => (
            <HomePageCard episode={episode} key={idx} />
          ))}
        </MediaRail>
      )}

      {topList?.map((category) =>
        category.data?.length ? (
          <MediaRail
            title={category.name}
            icon={getCategoryIcon(category.name)}
            key={category.name}
          >
            {category.data.map((item) => (
              <TopMediaCard item={item} key={item.id} />
            ))}
          </MediaRail>
        ) : null
      )}
    </div>
  );
}

export default HomeList;
