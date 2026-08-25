"use client";
import { FaUsers } from "react-icons/fa6";
import { ActorListItem } from "@/types/actor";
import ActorCard from "./ActorCard";
import NoDataIndicator from "../NoDataIndicator";
import PaginationRounded from "../Pagination";
import { NavigationProvider } from "../NavigationContext";

interface Props {
  actors: ActorListItem[];
  page: number;
  totalPages: number;
}

function ActorsList({ actors, page, totalPages }: Props) {
  return (
    <NavigationProvider>
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
          <>
            <div className="grid w-full gap-3 grid-cols-[repeat(auto-fill,minmax(min(105px,100%),1fr))] sm:gap-4 md:grid-cols-[repeat(auto-fill,minmax(130px,1fr))]">
              {actors.map((actor) => (
                <ActorCard key={actor.tmdbId} actor={actor} />
              ))}
            </div>

            {totalPages > 1 ? (
              <div className="flex flex-col gap-3 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
                <span className="text-sm text-black/40 dark:text-white/40">
                  Page {page} of {totalPages}
                </span>
                <div className="text-black [--pg-accent:#6366f1] [--pg-accent-hover:#4f46e5] dark:text-white dark:[--pg-accent:#dc2626] dark:[--pg-accent-hover:#b91c1c]">
                  <PaginationRounded currentPage={page} totalPages={totalPages} />
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <NoDataIndicator
            title="No actors found"
            text="Couldn't load popular actors right now."
            icon={<FaUsers size={30} />}
          />
        )}
      </div>
    </NavigationProvider>
  );
}

export default ActorsList;
