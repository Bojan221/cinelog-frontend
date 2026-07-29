"use client";
import { useState } from "react";
import { FaPlus, FaCheck, FaBookmark, FaEye } from "react-icons/fa6";
import axiosPrivate from "@/app/api/axiosPrivate";
import { showToast } from "./Toast";
import AddToListPopup from "./AddToListPopup";

interface Props {
  type: "movie" | "tv";
  tmdbId: number;
  title: string;
  overview: string;
  poster: string | null;
  releaseDate: string;
  vote: number;
  runtime?: number | null;
}

const QUICK_LISTS: Record<
  "movie" | "tv",
  { label: string; list: string; icon: React.ReactNode }[]
> = {
  movie: [
    { label: "Watchlist", list: "Watchlist", icon: <FaBookmark size={12} /> },
    { label: "Watched", list: "Watched", icon: <FaCheck size={12} /> },
  ],
  tv: [
    { label: "Watchlist", list: "Watchlist", icon: <FaBookmark size={12} /> },
    { label: "Watching", list: "Watching", icon: <FaEye size={12} /> },
    { label: "Watched", list: "Watched", icon: <FaCheck size={12} /> },
  ],
};

function Spinner() {
  return (
    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  );
}

function DetailActions({
  type,
  tmdbId,
  title,
  overview,
  poster,
  releaseDate,
  vote,
  runtime,
}: Props) {
  const [busy, setBusy] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const base = type === "tv" ? "/series" : "/movies";

  const addToList = async (listName: string) => {
    if (busy) return;
    setBusy(listName);
    try {
      await axiosPrivate.post(`${base}/lists`, {
        [type === "tv" ? "serieId" : "movieId"]: tmdbId,
        listName,
        title,
        overview,
        poster,
        releaseDate,
        vote,
        ...(type === "movie" ? { runtime: runtime ?? null } : {}),
      });
      showToast("success", `Added to ${listName}`);
    } catch (err) {
      const res = (
        err as { response?: { status?: number; data?: { message?: string } } }
      )?.response;
      if (res?.status === 409) {
        showToast("info", res.data?.message ?? "Already in this list");
      } else {
        showToast("error", "Error adding to list");
      }
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {QUICK_LISTS[type].map((q) => (
        <button
          key={q.list}
          type="button"
          onClick={() => addToList(q.list)}
          disabled={busy !== null}
          className="flex items-center gap-2 rounded-lg bg-red-500/90 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {busy === q.list ? <Spinner /> : q.icon}
          {q.label}
        </button>
      ))}

      <button
        type="button"
        onClick={() => setShowPopup(true)}
        className="flex items-center gap-2 rounded-lg border border-black/15 px-4 py-2 text-sm font-semibold text-black/70 transition hover:border-black/30 hover:bg-black/5 cursor-pointer dark:border-white/20 dark:text-white/80 dark:hover:border-white/35 dark:hover:bg-white/10"
      >
        <FaPlus size={12} />
        Add to list
      </button>

      <AddToListPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        type={type}
        media={{
          tmdbId,
          title,
          overview,
          poster: poster ?? "",
          releaseDate,
          vote,
          runtime: runtime ?? undefined,
        }}
      />
    </div>
  );
}

export default DetailActions;
