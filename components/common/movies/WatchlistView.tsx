"use client";

import { useState } from "react";
import { Movie } from "@/types/movie";
import MovieCard from "@/components/common/MovieCard";
import NoDataIndicator from "@/components/common/NoDataIndicator";
import ListHeader, { FaStar, FaClock, FaFilm } from "./ListHeader";
import { FaRegCircleCheck, FaRegBookmark, FaRegHeart } from "react-icons/fa6";
import axiosPrivate from "@/app/api/axiosPrivate";
import { showToast } from "@/components/common/Toast";

type Variant = "watched" | "watchlist" | "favorites";

interface Props {
  movies: Movie[];
  listName: string;
  variant?: Variant;
}

const EXIT_MS = 300;

const VARIANTS: Record<
  Variant,
  { icon: React.ReactNode; description: string; empty: string }
> = {
  watched: {
    icon: <FaRegCircleCheck size={26} />,
    description: "Every movie you've watched, all in one place.",
    empty:
      "You haven't marked any movies as watched yet. Start exploring and keep track of what you've seen.",
  },
  watchlist: {
    icon: <FaRegBookmark size={24} />,
    description: "Movies you're saving to watch later.",
    empty:
      "You haven't added any movies to your watchlist yet. Browse movies and add the ones you want to watch later.",
  },
  favorites: {
    icon: <FaRegHeart size={24} />,
    description: "The movies you love the most, all in one place.",
    empty:
      "You haven't added any favorites yet. Browse movies and mark the ones you love.",
  },
};

function formatRuntime(totalMinutes: number): string {
  if (!totalMinutes) return "—";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

function WatchlistView({ movies, listName, variant = "watchlist" }: Props) {
  const config = VARIANTS[variant];

  const [items, setItems] = useState<Movie[]>(movies);
  const [exitingIds, setExitingIds] = useState<Set<number>>(new Set());
  const [busyIds, setBusyIds] = useState<Set<number>>(new Set());

  // Reset local state when the server sends a fresh list (recommended React
  // pattern for syncing state to props without an effect).
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

  // Animate the card out, then drop it from the list once the transition ends.
  const animateOut = (id: number) => {
    setExitingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setItems((prev) => prev.filter((m) => m.tmdbId !== id));
    }, EXIT_MS);
  };

  const handleRemove = async (movie: Movie) => {
    const id = movie.tmdbId;
    if (busyIds.has(id)) return;
    setBusy(id, true);
    try {
      await axiosPrivate.delete(`/movies/lists/${listName}/${id}`);
      showToast("success", `Removed from ${listName}`);
      animateOut(id);
    } catch {
      showToast("error", "Failed to remove movie");
    } finally {
      setBusy(id, false);
    }
  };

  const handleMoveToWatched = async (movie: Movie) => {
    const id = movie.tmdbId;
    if (busyIds.has(id)) return;
    setBusy(id, true);
    try {
      await axiosPrivate.patch(`/movies/lists/watched/${id}`);
      showToast("success", "Moved to Watched");
      animateOut(id);
    } catch {
      showToast("error", "Failed to move movie");
    } finally {
      setBusy(id, false);
    }
  };

  if (!items || items.length === 0) {
    return (
      <NoDataIndicator
        title={`Your ${listName.toLowerCase()} is empty`}
        text={config.empty}
        actionLabel="Browse movies"
        actionHref="/movies/all"
      />
    );
  }

  const rated = items.filter((m) => m.vote > 0);
  const avgRating = rated.length
    ? (rated.reduce((sum, m) => sum + Number(m.vote), 0) / rated.length).toFixed(1)
    : "—";
  const totalRuntime = items.reduce((sum, m) => sum + (m.runtime || 0), 0);

  return (
    <div className="w-full">
      <ListHeader
        title={listName}
        description={config.description}
        icon={config.icon}
        stats={[
          {
            icon: <FaFilm size={16} />,
            value: String(items.length),
            label: items.length === 1 ? "Movie" : "Movies",
          },
          {
            icon: <FaStar size={16} />,
            value: avgRating,
            label: "Avg rating",
          },
          {
            icon: <FaClock size={16} />,
            value: formatRuntime(totalRuntime),
            label: "Runtime",
          },
        ]}
      />

      <div className="grid w-full gap-3 p-3 grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] sm:gap-5 sm:p-5 md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
        {items.map((movie, idx) => (
          <MovieCard
            media={movie}
            key={movie.tmdbId}
            loading={idx < 4 ? "eager" : "lazy"}
            type="movie"
            watchedAt={variant === "watched" ? movie.added_at : undefined}
            actionBusy={busyIds.has(movie.tmdbId)}
            isExiting={exitingIds.has(movie.tmdbId)}
            moveLabel={variant === "watchlist" ? "Watched" : undefined}
            onMove={
              variant === "watchlist"
                ? () => handleMoveToWatched(movie)
                : undefined
            }
            onRemove={
              variant === "favorites"
                ? undefined
                : () => handleRemove(movie)
            }
            onUnfavorite={
              variant === "favorites"
                ? () => animateOut(movie.tmdbId)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}

export default WatchlistView;
