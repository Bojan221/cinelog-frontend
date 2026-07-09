"use client";

import { useState } from "react";
import { Movie } from "@/types/movie";
import MovieCard from "@/components/common/MovieCard";
import NoDataIndicator from "@/components/common/NoDataIndicator";
import ListHeader, { FaStar } from "@/components/common/movies/ListHeader";
import axiosPrivate from "@/app/api/axiosPrivate";
import { showToast } from "@/components/common/Toast";
import {
  FaRegCircleCheck,
  FaRegBookmark,
  FaRegHeart,
  FaRegCirclePlay,
  FaTv,
} from "react-icons/fa6";

type Variant = "watched" | "watching" | "watchlist" | "favorites";

interface ListProps {
  movies: Movie[];
  listType: string;
}

const VARIANTS: Record<
  Variant,
  { icon: React.ReactNode; description: string; empty: string }
> = {
  watched: {
    icon: <FaRegCircleCheck size={26} />,
    description: "Every series you've finished, all in one place.",
    empty:
      "You haven't marked any series as watched yet. Start exploring and keep track of what you've seen.",
  },
  watching: {
    icon: <FaRegCirclePlay size={26} />,
    description: "Series you're currently keeping up with.",
    empty:
      "You're not watching any series right now. Browse series and add the ones you're following.",
  },
  watchlist: {
    icon: <FaRegBookmark size={24} />,
    description: "Series you're saving to watch later.",
    empty:
      "You haven't added any series to your watchlist yet. Browse series and add the ones you want to watch later.",
  },
  favorites: {
    icon: <FaRegHeart size={24} />,
    description: "The series you love the most, all in one place.",
    empty:
      "You haven't added any favorites yet. Browse series and mark the ones you love.",
  },
};

const EXIT_MS = 300;

const MOVE_TARGET: Partial<Record<Variant, string>> = {
  watchlist: "Watching",
  watching: "Watched",
};

function SerieUserList({ movies, listType }: ListProps) {
  const key = listType.toLowerCase();
  const variant: Variant = key in VARIANTS ? (key as Variant) : "watchlist";
  const config = VARIANTS[variant];

  const moveTarget = MOVE_TARGET[variant];

  const [items, setItems] = useState<Movie[]>(movies);
  const [exitingIds, setExitingIds] = useState<Set<number>>(new Set());
  const [busyIds, setBusyIds] = useState<Set<number>>(new Set());

  const [prevMovies, setPrevMovies] = useState(movies);
  if (movies !== prevMovies) {
    setPrevMovies(movies);
    setItems(movies);
    setExitingIds(new Set());
    setBusyIds(new Set());
  }

  const setBusy = (id: number, on: boolean) =>
    setBusyIds((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  const animateOut = (id: number) => {
    setExitingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setItems((prev) => prev.filter((m) => m.tmdbId !== id));
    }, EXIT_MS);
  };

  const handleRemove = async (serie: Movie) => {
    const id = serie.tmdbId;
    if (busyIds.has(id)) return;
    setBusy(id, true);
    try {
      await axiosPrivate.delete(`/series/lists/${listType}/${id}`);
      showToast("success", `Removed from ${listType}`);
      animateOut(id);
    } catch {
      showToast("error", "Failed to remove serie");
    } finally {
      setBusy(id, false);
    }
  };

  const handleMove = async (serie: Movie) => {
    const id = serie.tmdbId;
    if (!moveTarget || busyIds.has(id)) return;
    setBusy(id, true);
    try {
      await axiosPrivate.patch(`/series/lists/${moveTarget}/${id}`);
      showToast("success", `Moved to ${moveTarget}`);
      animateOut(id);
    } catch {
      showToast("error", "Failed to move serie");
    } finally {
      setBusy(id, false);
    }
  };

  if (!items || items.length === 0) {
    return (
      <NoDataIndicator
        title={`Your ${listType.toLowerCase()} is empty`}
        text={config.empty}
        icon={<FaTv size={34} />}
        actionLabel="Browse series"
        actionHref="/series/all"
      />
    );
  }

  const rated = items.filter((m) => Number(m.vote) > 0);
  const avgRating = rated.length
    ? (rated.reduce((sum, m) => sum + Number(m.vote), 0) / rated.length).toFixed(
        1
      )
    : "—";

  return (
    <div className="w-full">
      <ListHeader
        title={listType}
        description={config.description}
        icon={config.icon}
        stats={[
          {
            icon: <FaTv size={16} />,
            value: String(items.length),
            label: "Series",
          },
          {
            icon: <FaStar size={16} />,
            value: avgRating,
            label: "Avg rating",
          },
        ]}
      />

      <div className="grid w-full gap-3 p-3 grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] sm:gap-5 sm:p-5 md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
        {items.map((serie, idx) => (
          <MovieCard
            media={serie}
            key={serie.tmdbId}
            loading={idx < 4 ? "eager" : "lazy"}
            type="tv"
            watchedAt={variant === "watched" ? serie.added_at : undefined}
            isExiting={exitingIds.has(serie.tmdbId)}
            actionBusy={busyIds.has(serie.tmdbId)}
            moveLabel={moveTarget}
            onMove={moveTarget ? () => handleMove(serie) : undefined}
            onRemove={
              variant === "favorites" ? undefined : () => handleRemove(serie)
            }
            onUnfavorite={
              variant === "favorites"
                ? () => animateOut(serie.tmdbId)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}

export default SerieUserList;
