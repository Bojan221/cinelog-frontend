"use client";
import Image from "next/image";
import { ActorListItem } from "@/types/actor";
import { usePreview } from "../usePreview";

function ActorCard({ actor }: { actor: ActorListItem }) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const openPreview = usePreview();

  const knownFor = [
    ...(actor.movieCredits ?? []).map((c) => c.title),
    ...(actor.tvCredits ?? []).map((c) => c.name),
  ]
    .filter(Boolean)
    .slice(0, 2)
    .join(", ");

  return (
    <button
      type="button"
      onClick={() => openPreview("actors", actor.tmdbId)}
      className="group flex flex-col gap-2 text-left"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 transition duration-300 group-hover:shadow-lg group-hover:shadow-black/20 group-hover:ring-black/25 dark:bg-white/5 dark:ring-white/10 dark:group-hover:shadow-black/40 dark:group-hover:ring-white/25">
        {actor.profile ? (
          <Image
            alt={actor.name}
            src={`${POST_URL}${actor.profile}`}
            fill
            sizes="(max-width: 768px) 30vw, 140px"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-black/40 dark:text-white/40">
            No image
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="flex flex-col gap-0.5 px-0.5">
        <span className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
          {actor.name}
        </span>
        <span className="truncate text-xs text-black/50 dark:text-white/50">
          {knownFor || actor.knownForDepartment}
        </span>
      </div>
    </button>
  );
}

export default ActorCard;
