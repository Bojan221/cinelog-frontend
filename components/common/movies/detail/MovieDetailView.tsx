import Image from "next/image";
import {
  FaStar,
  FaUsers,
  FaFilm,
  FaRegClock,
  FaCalendarDays,
} from "react-icons/fa6";
import { MovieDetail } from "@/types/movie";
import { getYearFromDate } from "@/utils/helpers";
import { normalizeDate } from "@/utils/formatters";
import RatingRing from "../../RatingRing";
import DetailRail from "./DetailRail";
import CastCard from "./CastCard";
import MovieMiniCard from "./MovieMiniCard";
import MovieReviews from "./MovieReviews";
import PhotoGallery from "./PhotoGallery";
import DetailActions from "../../DetailActions";
import CommentsSection from "../../CommentsSection";
import UserRating from "../../UserRating";

const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;

const formatMoney = (n: number): string | null =>
  n
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n)
    : null;

function MovieDetailView({ movie }: { movie: MovieDetail }) {
  const year = getYearFromDate(movie.releaseDate);

  const language =
    movie.spokenLanguages?.find((l) => l.iso === movie.originalLanguage)?.name ??
    movie.originalLanguage?.toUpperCase() ??
    "-";

  const details: { label: string; value: string }[] = [
    { label: "Director", value: movie.director?.name ?? "-" },
    {
      label: "Writers",
      value: movie.writers?.length
        ? movie.writers.map((w) => w.name).join(", ")
        : "-",
    },
    {
      label: "Release Date",
      value: movie.releaseDate ? normalizeDate(movie.releaseDate) : "-",
    },
    { label: "Runtime", value: movie.runtime ? `${movie.runtime} min` : "-" },
    { label: "Status", value: movie.status || "-" },
    { label: "Original Language", value: language },
    { label: "Budget", value: formatMoney(movie.budget) ?? "-" },
    { label: "Revenue", value: formatMoney(movie.revenue) ?? "-" },
    {
      label: "Countries",
      value: movie.productionCountries?.length
        ? movie.productionCountries.map((c) => c.name).join(", ")
        : "-",
    },
  ];

  return (
    <div className="w-full pb-16">
      {/* Backdrop hero */}
      <div className="relative h-[42vh] min-h-70 w-full sm:h-[50vh]">
        {movie.backdrop ? (
          <Image
            alt={movie.title}
            src={`${POST_URL}${movie.backdrop}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="h-full w-full bg-black/10 dark:bg-white/5" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/10" />
        <div className="absolute inset-0 bg-linear-to-r from-background/60 to-transparent" />
      </div>

      <div className="relative z-10 -mt-44 px-4 sm:-mt-52 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-12">
          {/* Header */}
          <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
            <div className="mx-auto shrink-0 sm:mx-0">
              {movie.poster ? (
                <Image
                  alt={movie.title}
                  width={220}
                  height={330}
                  src={`${POST_URL}${movie.poster}`}
                  className="w-40 rounded-2xl border border-black/10 shadow-2xl shadow-black/40 sm:w-55 dark:border-white/15"
                />
              ) : (
                <div className="flex h-75 w-50 items-center justify-center rounded-2xl border border-black/10 bg-black/5 text-sm text-black/40 dark:border-white/15 dark:bg-white/5 dark:text-white/40">
                  No image
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-black sm:text-5xl dark:text-white">
                  {movie.title}
                  {year ? (
                    <span className="ml-2 font-light text-black/40 dark:text-white/40">
                      ({year})
                    </span>
                  ) : null}
                </h1>
                {movie.tagline ? (
                  <p className="text-base italic text-black/50 dark:text-white/50">
                    {movie.tagline}
                  </p>
                ) : null}

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-black/60 dark:text-white/60">
                  {movie.certification ? (
                    <span className="rounded border border-black/20 px-1.5 py-0.5 text-xs dark:border-white/25">
                      {movie.certification}
                    </span>
                  ) : null}
                  {movie.releaseDate ? (
                    <span className="flex items-center gap-1.5">
                      <FaCalendarDays size={13} />
                      {normalizeDate(movie.releaseDate)}
                    </span>
                  ) : null}
                  {movie.runtime ? (
                    <span className="flex items-center gap-1.5">
                      <FaRegClock size={13} />
                      {movie.runtime} min
                    </span>
                  ) : null}
                </div>
                </div>
                <UserRating
                  mediaId={movie.tmdbId}
                  mediaType="movie"
                  myVote={movie.myVote}
                />
              </div>

              {movie.genres?.length ? (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((g) => (
                    <span
                      key={g.id}
                      className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-sm font-medium text-black/70 dark:bg-white/10 dark:text-white/70"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              ) : null}

              <RatingRing vote={movie.vote} voteCount={movie.voteCount} />

              <DetailActions
                type="movie"
                tmdbId={movie.tmdbId}
                title={movie.title}
                overview={movie.overview}
                poster={movie.poster}
                releaseDate={movie.releaseDate}
                vote={movie.vote}
                runtime={movie.runtime}
              />
            </div>
          </header>

          {/* Overview */}
          {movie.overview ? (
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
                Overview
              </h2>
              <p className="max-w-3xl text-[15px] leading-relaxed text-black/70 dark:text-white/80">
                {movie.overview}
              </p>
            </section>
          ) : null}

          {/* Trailer + Details */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {movie.trailer?.key ? (
              <section className="flex flex-col gap-3 lg:col-span-3">
                <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
                  Trailer
                </h2>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-black/10 dark:border-white/15">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${movie.trailer.key}`}
                    title={movie.trailer.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>
            ) : null}

            <section
              className={`flex flex-col gap-3 ${
                movie.trailer?.key ? "lg:col-span-2" : "lg:col-span-5"
              }`}
            >
              <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
                Details
              </h2>
              <div className="flex flex-col divide-y divide-black/10 rounded-xl border border-black/10 text-sm dark:divide-white/10 dark:border-white/15">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-4 px-4 py-2.5">
                    <span className="w-[38%] shrink-0 font-medium text-black/50 dark:text-white/50">
                      {d.label}
                    </span>
                    <span className="min-w-0 flex-1 text-black/80 dark:text-white/90">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Cast */}
          {movie.actors?.length ? (
            <DetailRail
              title="Cast"
              count={movie.actors.length}
              icon={<FaUsers className="text-[20px] text-indigo-500 dark:text-red-400" />}
            >
              {movie.actors.map((actor) => (
                <CastCard key={actor.id} actor={actor} />
              ))}
            </DetailRail>
          ) : null}

          {/* Photos */}
          <PhotoGallery images={movie.images?.backdrops ?? []} />

          {/* Production companies */}
          {movie.productionCompanies?.some((c) => c.logo) ? (
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
                Production
              </h2>
              <div className="flex flex-wrap items-center gap-6">
                {movie.productionCompanies
                  .filter((c) => c.logo)
                  .map((c) => (
                    <div
                      key={c.id}
                      className="relative h-10 w-28 opacity-70 transition hover:opacity-100"
                    >
                      <Image
                        alt={c.name}
                        src={`${POST_URL}${c.logo}`}
                        fill
                        sizes="112px"
                        className="object-contain dark:brightness-0 dark:invert"
                      />
                    </div>
                  ))}
              </div>
            </section>
          ) : null}

          {/* Similar */}
          {movie.similarMovies?.length ? (
            <DetailRail
              title="Similar Movies"
              icon={<FaFilm className="text-[18px] text-indigo-500 dark:text-red-400" />}
            >
              {movie.similarMovies.map((m) => (
                <MovieMiniCard key={m.tmdbId} movie={m} />
              ))}
            </DetailRail>
          ) : null}

          {/* Recommended */}
          {movie.recommendedMovies?.length ? (
            <DetailRail
              title="Recommended"
              icon={<FaStar className="text-[18px] text-amber-400" />}
            >
              {movie.recommendedMovies.map((m) => (
                <MovieMiniCard key={m.tmdbId} movie={m} />
              ))}
            </DetailRail>
          ) : null}

          {/* Reviews */}
          <MovieReviews reviews={movie.reviews} />

          {/* Keywords */}
          {movie.keywords?.length ? (
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
                Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {movie.keywords.map((k) => (
                  <span
                    key={k.id}
                    className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60 dark:bg-white/10 dark:text-white/60"
                  >
                    {k.name}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <div className="pt-10">
        <CommentsSection mediaId={movie.tmdbId} mediaType="movie"/>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailView;
