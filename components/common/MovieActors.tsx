import { Actor } from "@/types/movie";
import { Genre } from "@/types/genre";
import Image from "next/image";
interface Props {
  actors: Actor[];
}

function MovieActors({ actors }: Props) {
  const PICTURE_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL
  return (
    <div className="grid grid-cols-2 h-full gap-5 overflow-y-auto px-6 py-3 thin-scrollbar">
      {actors?.length > 0 ? (
        actors.map((actor)=> { 
          return (
            <div key={actor.id} className="flex gap-4">
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
        <div className="flex items-center justify-center text-[25px] text-white/60">No Actors</div>
      )}
    </div>
  );
}

export default MovieActors;
