import Image from "next/image";
import {
  FaStar,
  FaUsers,
  FaTv,
  FaListUl,
  FaRegClock,
  FaCalendarDays,
} from "react-icons/fa6";
import { SerieDetail } from "@/types/serie";
import { getYearFromDate } from "@/utils/helpers";
import { normalizeDate } from "@/utils/formatters";
import RatingRing from "../../RatingRing";
import DetailRail from "../../movies/detail/DetailRail";
import CastCard from "../../movies/detail/CastCard";
import MovieReviews from "../../movies/detail/MovieReviews";
import PhotoGallery from "../../movies/detail/PhotoGallery";
import DetailActions from "../../DetailActions";
import UserRating from "../../UserRating";
import SerieMiniCard from "./SerieMiniCard";
import SerieEpisodes from "../SerieEpisodes";
import CommentsSection from "../../CommentsSection";

const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;

function SerieDetailView({ serie }: { serie: SerieDetail }) {
  const year = getYearFromDate(serie.firstAirDate);

  const language =
    serie.spokenLanguages?.find((l) => l.iso === serie.originalLanguage)?.name ??
    serie.originalLanguage?.toUpperCase() ??
    "-";

  const runtime = serie.episodeRunTime?.[0];

  const details: { label: string; value: string }[] = [
    {
      label: "Creators",
      value: serie.creators?.length
        ? serie.creators.map((c) => c.name).join(", ")
        : "-",
    },
    {
      label: "Networks",
      value: serie.networks?.length
        ? serie.networks.map((n) => n.name).join(", ")
        : "-",
    },
    {
      label: "First Air Date",
      value: serie.firstAirDate ? normalizeDate(serie.firstAirDate) : "-",
    },
    {
      label: "Last Air Date",
      value: serie.lastAirDate ? normalizeDate(serie.lastAirDate) : "-",
    },
    { label: "Seasons", value: String(serie.numberOfSeasons ?? "-") },
    { label: "Episodes", value: String(serie.numberOfEpisodes ?? "-") },
    { label: "Status", value: serie.status || "-" },
    { label: "Original Language", value: language },
    {
      label: "Countries",
      value: serie.productionCountries?.length
        ? serie.productionCountries.map((c) => c.name).join(", ")
        : "-",
    },
  ];

  const providers = [
    ...(serie.watchProviders?.flatrate ?? []),
    ...(serie.watchProviders?.buy ?? []),
  ];

  return (
    <div className="w-full pb-16">
      {/* Backdrop hero */}
      <div className="relative h-[42vh] min-h-70 w-full sm:h-[50vh]">
        {serie.backdrop ? (
          <Image
            alt={serie.title}
            src={`${POST_URL}${serie.backdrop}`}
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
              {serie.poster ? (
                <Image
                  alt={serie.title}
                  width={220}
                  height={330}
                  src={`${POST_URL}${serie.poster}`}
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
                  {serie.title}
                  {year ? (
                    <span className="ml-2 font-light text-black/40 dark:text-white/40">
                      ({year})
                    </span>
                  ) : null}
                </h1>
                {serie.tagline ? (
                  <p className="text-base italic text-black/50 dark:text-white/50">
                    {serie.tagline}
                  </p>
                ) : null}

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-black/60 dark:text-white/60">
                  {serie.contentRating ? (
                    <span className="rounded border border-black/20 px-1.5 py-0.5 text-xs dark:border-white/25">
                      {serie.contentRating}
                    </span>
                  ) : null}
                  {serie.firstAirDate ? (
                    <span className="flex items-center gap-1.5">
                      <FaCalendarDays size={13} />
                      {getYearFromDate(serie.firstAirDate)}
                      {serie.lastAirDate
                        ? ` – ${getYearFromDate(serie.lastAirDate)}`
                        : ""}
                    </span>
                  ) : null}
                  {serie.numberOfSeasons ? (
                    <span className="flex items-center gap-1.5">
                      <FaTv size={13} />
                      {serie.numberOfSeasons}{" "}
                      {serie.numberOfSeasons === 1 ? "Season" : "Seasons"}
                    </span>
                  ) : null}
                  {runtime ? (
                    <span className="flex items-center gap-1.5">
                      <FaRegClock size={13} />
                      {runtime} min
                    </span>
                  ) : null}
                </div>
                </div>
                <UserRating
                  mediaId={serie.tmdbId}
                  mediaType="tv"
                  myVote={serie.myVote}
                />
              </div>

              {serie.genres?.length ? (
                <div className="flex flex-wrap gap-2">
                  {serie.genres.map((g) => (
                    <span
                      key={g.id}
                      className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-sm font-medium text-black/70 dark:bg-white/10 dark:text-white/70"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              ) : null}

              <RatingRing vote={serie.vote} voteCount={serie.voteCount} />

              <DetailActions
                type="tv"
                tmdbId={serie.tmdbId}
                title={serie.title}
                overview={serie.overview}
                poster={serie.poster}
                releaseDate={serie.firstAirDate}
                vote={serie.vote}
              />
            </div>
          </header>

          {/* Overview */}
          {serie.overview ? (
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
                Overview
              </h2>
              <p className="max-w-3xl text-[15px] leading-relaxed text-black/70 dark:text-white/80">
                {serie.overview}
              </p>
            </section>
          ) : null}

          {/* Where to watch */}
          {providers.length ? (
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
                Where to Watch
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                {providers.map((p) => (
                  <div
                    key={p.id}
                    title={p.name}
                    className="relative h-11 w-11 overflow-hidden rounded-xl border border-black/10 dark:border-white/15"
                  >
                    {p.logo ? (
                      <Image
                        alt={p.name}
                        src={`${POST_URL}${p.logo}`}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Trailer + Details */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {serie.trailer?.key ? (
              <section className="flex flex-col gap-3 lg:col-span-3">
                <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
                  Trailer
                </h2>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-black/10 dark:border-white/15">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${serie.trailer.key}`}
                    title={serie.trailer.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>
            ) : null}

            <section
              className={`flex flex-col gap-3 ${
                serie.trailer?.key ? "lg:col-span-2" : "lg:col-span-5"
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
          {serie.actors?.length ? (
            <DetailRail
              title="Cast"
              count={serie.actors.length}
              icon={<FaUsers className="text-[20px] text-indigo-500 dark:text-red-400" />}
            >
              {serie.actors.map((actor) => (
                <CastCard key={actor.id} actor={actor} />
              ))}
            </DetailRail>
          ) : null}

          {/* Networks / Production */}
          {serie.networks?.some((n) => n.logo) ? (
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
                Networks
              </h2>
              <div className="flex flex-wrap items-center gap-6">
                {serie.networks
                  .filter((n) => n.logo)
                  .map((n) => (
                    <div
                      key={n.id}
                      className="relative h-10 w-28 opacity-70 transition hover:opacity-100"
                    >
                      <Image
                        alt={n.name}
                        src={`${POST_URL}${n.logo}`}
                        fill
                        sizes="112px"
                        className="object-contain dark:brightness-0 dark:invert"
                      />
                    </div>
                  ))}
              </div>
            </section>
          ) : null}

          {/* Photos */}
          <PhotoGallery images={serie.images?.backdrops ?? []} />

          {/* Seasons & Episodes */}
          {serie.seasons?.length ? (
            <section className="flex flex-col gap-4">
              <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-black dark:text-white">
                <FaListUl className="text-[18px] text-indigo-500 dark:text-red-400" />
                Seasons &amp; Episodes
              </h2>
              <SerieEpisodes serie={serie} />
            </section>
          ) : null}

          {/* Similar */}
          {serie.similarSeries?.length ? (
            <DetailRail
              title="Similar Series"
              icon={<FaTv className="text-[18px] text-indigo-500 dark:text-red-400" />}
            >
              {serie.similarSeries.map((s) => (
                <SerieMiniCard key={s.tmdbId} serie={s} />
              ))}
            </DetailRail>
          ) : null}

          {/* Recommended */}
          {serie.recommendedSeries?.length ? (
            <DetailRail
              title="Recommended"
              icon={<FaStar className="text-[18px] text-amber-400" />}
            >
              {serie.recommendedSeries.map((s) => (
                <SerieMiniCard key={s.tmdbId} serie={s} />
              ))}
            </DetailRail>
          ) : null}

          {/* Reviews */}
          <MovieReviews reviews={serie.reviews} />

          {/* Keywords */}
          {serie.keywords?.length ? (
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
                Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {serie.keywords.map((k) => (
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
          <CommentsSection mediaId={serie.tmdbId} mediaType="tv"/>
        </div>
      </div>
    </div>
  );
}

export default SerieDetailView;
