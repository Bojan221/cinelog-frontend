"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { normalizeDate, formatRate } from "@/utils/formatters";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export interface TopMediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: "movie" | "tv";
}

function TopMediaCard({ item }: { item: TopMediaItem }) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const title = item.title ?? item.name ?? "Untitled";
  const type = item.media_type ?? "movie";
  const date = item.release_date ?? item.first_air_date;

  const openPreview = () => {
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set("preview", `${type}-${item.id}`);
    router.push(`${pathname}?${urlParams.toString()}`, { scroll: false });
  };

  return (
    <div
      onClick={openPreview}
      className="group relative flex w-36 shrink-0 cursor-pointer snap-start flex-col gap-3 rounded-xl border border-black/10 transition-all duration-300 ease-out dark:border-white/10 sm:w-40"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 transition duration-300 group-hover:shadow-lg group-hover:shadow-black/20 group-hover:ring-black/25 dark:bg-white/5 dark:ring-white/10 dark:group-hover:shadow-black/40 dark:group-hover:ring-white/25">
        {item.poster_path ? (
          <Image
            alt={title}
            fill
            sizes="160px"
            src={`${POST_URL}${item.poster_path}`}
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-black/40 dark:text-white/40">
            No image
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="flex flex-col gap-1.5 px-2 pb-2">
        <h3 className="truncate text-[14px] font-semibold text-black dark:text-white">
          {title}
        </h3>

        {item.vote_average ? (
          <div className="flex items-center gap-1.5 text-sm">
            <FaStar className="text-amber-500 dark:text-amber-400" size={13} />
            <span className="font-medium text-black/80 dark:text-white/90">
              {formatRate(Number(item.vote_average))}
            </span>
            <span className="text-black/40 dark:text-white/40">/10</span>
          </div>
        ) : null}

        {date && (
          <p className="text-xs text-black/50 dark:text-white/50">
            {normalizeDate(date)}
          </p>
        )}
      </div>
      <button
        type="button"
        aria-label="Open details page"
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/${type === "tv" ? "series" : "movies"}/${item.id}`);
        }}
        className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full text-black/40 transition-colors hover:bg-black/5 hover:text-black cursor-pointer dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <FaArrowUpRightFromSquare size={13} />
      </button>
    </div>
  );
}

export default TopMediaCard;
