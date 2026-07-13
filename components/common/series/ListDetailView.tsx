"use client";

import { useState } from "react";
import Link from "next/link";
import { Movie } from "@/types/movie";
import MovieCard from "@/components/common/MovieCard";
import NoDataIndicator from "@/components/common/NoDataIndicator";
import ListHeader, { FaStar } from "../movies/ListHeader";
import {
  FaArrowLeft,
  FaGlobe,
  FaLock,
  FaRegRectangleList,
  FaTv,
} from "react-icons/fa6";
import axiosPrivate from "@/app/api/axiosPrivate";
import { showToast } from "@/components/common/Toast";

export interface ListDetail {
  id: number;
  name: string;
  mediaType: string;
  isDefault: boolean;
  isPublic: boolean;
  isOwner: boolean;
  itemCount: number;
}

interface Props {
  list: ListDetail;
  series: Movie[];
}

const EXIT_MS = 300;

function ListDetailView({ list, series }: Props) {
  const [items, setItems] = useState<Movie[]>(series);
  const [exitingIds, setExitingIds] = useState<Set<number>>(new Set());
  const [busyIds, setBusyIds] = useState<Set<number>>(new Set());

  const [prevSeries, setPrevSeries] = useState(series);
  if (series !== prevSeries) {
    setPrevSeries(series);
    setItems(series);
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
      await axiosPrivate.delete(`/series/lists/byId/${list.id}/${id}`);
      showToast("success", `Removed from ${list.name}`);
      animateOut(id);
    } catch {
      showToast("error", "Failed to remove serie");
    } finally {
      setBusy(id, false);
    }
  };

  const rated = items.filter((m) => Number(m.vote) > 0);
  const avgRating = rated.length
    ? (
        rated.reduce((sum, m) => sum + Number(m.vote), 0) / rated.length
      ).toFixed(1)
    : "—";

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 px-4 py-2 sm:px-6">
        <Link
          href="/series/lists"
          className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-black/50 transition-colors hover:text-black/80 dark:text-white/50  dark:hover:text-white/80"
        >
          <FaArrowLeft size={13} />
          Back to lists
        </Link>
      </div>

      <ListHeader
        title={list.name}
        description={
          list.isPublic
            ? "This list is public — anyone can view it."
            : "This list is private — only you can view it."
        }
        icon={<FaRegRectangleList size={24} />}
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
          {
            icon: list.isPublic ? <FaGlobe size={16} /> : <FaLock size={16} />,
            value: list.isPublic ? "Public" : "Private",
            label: "Visibility",
          },
        ]}
      />

      {items.length === 0 ? (
        <NoDataIndicator
          title="This list is empty"
          text="No titles have been added to this list yet."
          icon={<FaRegRectangleList size={30} />}
          actionLabel="Browse series"
          actionHref="/series/all"
        />
      ) : (
        <div className="grid w-full gap-3 p-3 grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] sm:gap-5 sm:p-5 md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
          {items.map((serie, idx) => (
            <MovieCard
              media={serie}
              key={serie.tmdbId}
              loading={idx < 4 ? "eager" : "lazy"}
              type="tv"
              actionBusy={busyIds.has(serie.tmdbId)}
              isExiting={exitingIds.has(serie.tmdbId)}
              onRemove={
                list.isOwner ? () => handleRemove(serie) : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListDetailView;
