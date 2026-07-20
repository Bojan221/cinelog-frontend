"use client";
import Image from "next/image";
import { usePreview } from "../../usePreview";

interface CastActor {
  id: number;
  name: string;
  character: string;
  profile: string | null;
}

function CastCard({ actor }: { actor: CastActor }) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const openPreview = usePreview();

  return (
    <button
      type="button"
      onClick={() => openPreview("actors", actor.id)}
      className="group flex w-28 shrink-0 cursor-pointer snap-start flex-col gap-2 text-left sm:w-32"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 transition duration-300 group-hover:ring-black/25 dark:bg-white/5 dark:ring-white/10 dark:group-hover:ring-white/25">
        {actor.profile ? (
          <Image
            alt={actor.name}
            src={`${POST_URL}${actor.profile}`}
            fill
            sizes="128px"
            className="object-cover transition duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-black/40 dark:text-white/40">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-col px-0.5">
        <span className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
          {actor.name}
        </span>
        {actor.character ? (
          <span className="truncate text-xs text-black/50 dark:text-white/50">
            {actor.character}
          </span>
        ) : null}
      </div>
    </button>
  );
}

export default CastCard;
