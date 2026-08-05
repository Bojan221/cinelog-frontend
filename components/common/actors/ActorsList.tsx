"use client";
import { FaUsers } from "react-icons/fa6";
import { ActorListItem } from "@/types/actor";
import ActorCard from "./ActorCard";
import NoDataIndicator from "../NoDataIndicator";

interface Props {
  actors: ActorListItem[];
}

function ActorsList({ actors }: Props) {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header className="flex flex-col gap-3 border-b border-black/10 pb-6 dark:border-white/10">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:bg-red-500/10 dark:text-red-400">
            <FaUsers size={22} />
          </span>
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white sm:text-3xl">
              Popular Actors
            </h1>
            <p className="text-sm text-black/50 dark:text-white/50">
              Trending people in film &amp; TV
            </p>
          </div>
        </div>
      </header>

      {actors.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {actors.map((actor) => (
            <ActorCard key={actor.tmdbId} actor={actor} />
          ))}
        </div>
      ) : (
        <NoDataIndicator
          title="No actors found"
          text="Couldn't load popular actors right now."
          icon={<FaUsers size={30} />}
        />
      )}
    </div>
  );
}

export default ActorsList;
