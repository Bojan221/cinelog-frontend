"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { SimilarSerie } from "@/types/serie";
import { getYearFromDate } from "@/utils/helpers";
import { formatRate } from "@/utils/formatters";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

function SerieMiniCard({ serie }: { serie: SimilarSerie }) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const year = getYearFromDate(serie.releaseDate);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openPreview = (content: string) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set("preview", content);
    router.push(`${pathname}?${urlParams.toString()}`, { scroll: false });
  };

  return (
    <div
      onClick={() => openPreview(`movie-${serie.tmdbId}`)}
      className="group flex w-36 shrink-0 snap-start flex-col gap-2 sm:w-40"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 transition duration-300 group-hover:shadow-lg group-hover:shadow-black/20 group-hover:ring-black/25 dark:bg-white/5 dark:ring-white/10 dark:group-hover:shadow-black/40 dark:group-hover:ring-white/25">
        {serie.poster ? (
          <Image
            alt={serie.title}
            src={`${POST_URL}${serie.poster}`}
            fill
            sizes="160px"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-black/40 dark:text-white/40">
            No image
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="flex flex-col gap-1 px-0.5">
        <span className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
          {serie.title}
        </span>
        <div className={`flex items-center ${!year && !serie.vote ? "justify-end":"justify-between"} gap-2 text-xs font-medium text-black/40 dark:text-white/40`}>
          {year ? <span>{year}</span> : null}
          {serie.vote ? (
            <>
              {year ? <span aria-hidden>·</span> : null}
              <span className="flex items-center gap-1">
                <FaStar
                  className="text-amber-500 dark:text-amber-400"
                  size={11}
                />
                {formatRate(Number(serie.vote))}
              </span>
            </>
          ) : null}
          <div className="flex items-center justify-end px-2">
            <FaArrowUpRightFromSquare className="cursor-pointer" onClick={(e)=> { 
              e.stopPropagation();
              router.push(`/series/${serie.tmdbId}`)
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SerieMiniCard;
