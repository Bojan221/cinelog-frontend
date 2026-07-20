"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axiosPrivate from "@/app/api/axiosPrivate";
import { SeasonDetail, SeasonEpisode } from "@/types/serie";
import { MovieLoader } from "../../core/SheetLoader";
import { FaStar, FaRegClock, FaCalendarDays } from "react-icons/fa6";
import { normalizeDate, formatRate } from "@/utils/formatters";
import CastCard from "../movies/detail/CastCard";
import NoDataIndicator from "../NoDataIndicator";

interface Props {
  serieId: string | null;
  seasonNumber: string | null;
  episodeNumber: string | null;
}

function EpisodeSheet({ serieId, seasonNumber, episodeNumber }: Props) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const [episode, setEpisode] = useState<SeasonEpisode | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        setLoading(true);
        const { data } = await axiosPrivate.get(
          `/series/${serieId}/season/${seasonNumber}`
        );
        const season: SeasonDetail = data.season;
        const ep =
          season?.episodes?.find(
            (e) => String(e.episodeNumber) === String(episodeNumber)
          ) ?? null;
        setEpisode(ep);
      } catch {
        setEpisode(null);
      } finally {
        setLoading(false);
      }
    };
    if (serieId && seasonNumber && episodeNumber) fetchEpisode();
  }, [serieId, seasonNumber, episodeNumber]);

  if (loading) return <MovieLoader />;

  if (!episode) {
    return (
      <NoDataIndicator
        title="Episode unavailable"
        text="This episode couldn't be loaded."
      />
    );
  }

  const code = `S${String(episode.seasonNumber).padStart(2, "0")}E${String(
    episode.episodeNumber
  ).padStart(2, "0")}`;

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto px-4 py-3 thin-scrollbar sm:px-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/5">
        {episode.still ? (
          <Image
            alt={episode.name}
            src={`${POST_URL}${episode.still}`}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-black/40 dark:text-white/40">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wide text-indigo-500 dark:text-red-400">
          {code}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
          {episode.name}
        </h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-black/60 dark:text-white/60">
          {episode.airDate ? (
            <span className="flex items-center gap-1.5">
              <FaCalendarDays size={13} />
              {normalizeDate(episode.airDate)}
            </span>
          ) : null}
          {episode.runtime ? (
            <span className="flex items-center gap-1.5">
              <FaRegClock size={13} />
              {episode.runtime} min
            </span>
          ) : null}
          {episode.vote ? (
            <span className="flex items-center gap-1.5">
              <FaStar className="text-amber-500 dark:text-amber-400" size={13} />
              {formatRate(episode.vote)}
              {episode.voteCount ? (
                <span className="text-black/40 dark:text-white/40">
                  ({episode.voteCount})
                </span>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>

      {episode.overview ? (
        <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">
          {episode.overview}
        </p>
      ) : null}

      <div className="flex flex-col divide-y divide-black/10 rounded-xl border border-black/10 text-sm dark:divide-white/10 dark:border-white/15">
        <div className="flex items-start gap-4 px-4 py-2.5">
          <span className="w-[30%] shrink-0 font-medium text-black/50 dark:text-white/50">
            Director
          </span>
          <span className="min-w-0 flex-1 text-black/80 dark:text-white/90">
            {episode.director?.name ?? "-"}
          </span>
        </div>
        <div className="flex items-start gap-4 px-4 py-2.5">
          <span className="w-[30%] shrink-0 font-medium text-black/50 dark:text-white/50">
            Writers
          </span>
          <span className="min-w-0 flex-1 text-black/80 dark:text-white/90">
            {episode.writers?.length
              ? episode.writers.map((w) => w.name).join(", ")
              : "-"}
          </span>
        </div>
      </div>

      {episode.guestStars?.length ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Guest Stars{" "}
            <span className="text-sm font-normal text-black/40 dark:text-white/40">
              ({episode.guestStars.length})
            </span>
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2 thin-scrollbar">
            {episode.guestStars.map((g) => (
              <CastCard key={g.id} actor={g} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EpisodeSheet;
