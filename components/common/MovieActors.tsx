"use client";
import { Actor } from "@/types/movie";
import Image from "next/image";
import { usePreview } from "./usePreview";
interface Props {
  actors: Actor[];
}

function MovieActors({ actors }: Props) {
  const PICTURE_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL
  const openPreview = usePreview();
  return (
    <div className="grid h-full grid-cols-1 gap-5 overflow-y-auto px-4 py-3 thin-scrollbar sm:grid-cols-2 sm:px-6">
      {actors?.length > 0 ? (
        actors.map((actor)=> {
          return (
            <div
              key={actor.id}
              onClick={() => openPreview("actors", actor.id)}
              className="flex cursor-pointer gap-4 rounded-lg p-1 transition-colors duration-200 hover:bg-black/3 dark:hover:bg-white/5"
            >
              <div className="relative flex h-37.5 w-25 shrink-0 items-center justify-center overflow-hidden rounded-md border border-black/10 dark:border-white/15">
              {actor.profile ? (
                <Image
                  alt={actor.name}
                  src={`${PICTURE_URL}${actor.profile}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              ):(
                <p className="text-xs text-black/40 dark:text-white/40">No Image</p>
              )}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-black/40 dark:text-white/40">
                    Name
                  </span>
                  <span className="text-sm font-semibold text-black/90 dark:text-white/90">
                    {actor.name}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-black/40 dark:text-white/40">
                    Character
                  </span>
                  <span className="text-sm text-black/70 dark:text-white/70">
                    {actor.character || "-"}
                  </span>
                </div>
              </div>
            </div>
          )
        })
      ):(
        <div className="col-span-full flex h-full items-center justify-center text-2xl text-black/40 dark:text-white/40">No Actors</div>
      )}
    </div>
  );
}

export default MovieActors;
