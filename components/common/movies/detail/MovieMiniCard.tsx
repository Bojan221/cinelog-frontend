import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { SimilarMovie } from "@/types/movie";
import { getYearFromDate } from "@/utils/helpers";
import { formatRate } from "@/utils/formatters";

function MovieMiniCard({ movie }: { movie: SimilarMovie }) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const year = getYearFromDate(movie.releaseDate);

  return (
    <Link
      href={`/movies/${movie.tmdbId}`}
      className="group flex w-36 shrink-0 snap-start flex-col gap-2 sm:w-40"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 transition duration-300 group-hover:shadow-lg group-hover:shadow-black/20 group-hover:ring-black/25 dark:bg-white/5 dark:ring-white/10 dark:group-hover:shadow-black/40 dark:group-hover:ring-white/25">
        {movie.poster ? (
          <Image
            alt={movie.title}
            src={`${POST_URL}${movie.poster}`}
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
          {movie.title}
        </span>
        <div className="flex items-center gap-2 text-xs font-medium text-black/40 dark:text-white/40">
          {year ? <span>{year}</span> : null}
          {movie.vote ? (
            <>
              {year ? <span aria-hidden>·</span> : null}
              <span className="flex items-center gap-1">
                <FaStar className="text-amber-500 dark:text-amber-400" size={11} />
                {formatRate(Number(movie.vote))}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default MovieMiniCard;
