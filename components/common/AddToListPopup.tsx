"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  FaLayerGroup,
  FaRegRectangleList,
  FaPlus,
  FaCheck,
  FaLock,
  FaGlobe,
} from "react-icons/fa6";
import axiosPrivate from "@/app/api/axiosPrivate";
import { showToast } from "./Toast";
import { List } from "@/types/list";

interface ListMedia {
  tmdbId: number;
  title: string;
  overview: string;
  poster: string;
  releaseDate: string;
  vote: number;
  runtime?: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  media: ListMedia;
  type?: "movie" | "tv";
}

function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black/60 dark:border-white/20 dark:border-t-white/70" />
  );
}

function AddToListPopup({ isOpen, onClose, media, type = "movie" }: Props) {
  const basePath = type === "tv" ? "/series" : "/movies";
  const noun = type === "tv" ? "series" : "movie";
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState<number | null>(null);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    const load = async () => {
      setLoading(true);
      setAddedIds(new Set());
      try {
        const res = await axiosPrivate.get<{ lists: List[] }>(
          `${basePath}/lists/myLists`
        );
        if (active) setLists(res.data.lists ?? []);
      } catch {
        if (active) showToast("error", "Failed to load your lists");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const addToList = async (list: List) => {
    if (addingId || addedIds.has(list.id)) return;
    setAddingId(list.id);
    try {
      await axiosPrivate.post(`${basePath}/lists`, {
        [type === "tv" ? "serieId" : "movieId"]: media.tmdbId,
        listId: list.id,
        title: media.title,
        overview: media.overview,
        poster: media.poster,
        releaseDate: media.releaseDate,
        vote: media.vote,
        runtime: media.runtime,
      });
      setAddedIds((prev) => new Set(prev).add(list.id));
      showToast("success", `Added to "${list.name}"`);
    } catch (err) {
      const res = (err as { response?: { status?: number; data?: { message?: string } } })?.response;
      if (res?.status === 409) {
        showToast("info", res.data?.message ?? "Already in this list");
        setAddedIds((prev) => new Set(prev).add(list.id));
      } else {
        showToast("error", "Error adding to list");
      }
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-70 flex items-end justify-center sm:items-center sm:p-4 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`bg-background relative flex max-h-[80vh] w-full flex-col rounded-t-2xl border border-black/10 shadow-2xl transition-all duration-300 ease-out dark:border-white/10 sm:max-w-md sm:rounded-2xl ${
          isOpen
            ? "translate-y-0 sm:scale-100 sm:opacity-100"
            : "translate-y-full sm:translate-y-0 sm:scale-95 sm:opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-500/25 dark:from-red-500 dark:to-red-700 dark:shadow-red-500/25">
              <FaLayerGroup size={16} />
            </div>
            <h2 className="text-lg font-bold text-black/90 dark:text-white/90">
              Add to list
            </h2>
          </div>
          <IoClose
            className="cursor-pointer text-2xl text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
            onClick={onClose}
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 thin-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-black/40 dark:text-white/40">
              <Spinner />
            </div>
          ) : lists.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
              <FaLayerGroup
                size={28}
                className="text-black/20 dark:text-white/20"
              />
              <p className="text-sm text-black/50 dark:text-white/50">
                You don&apos;t have any custom lists yet.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {lists.map((list) => {
                const added = addedIds.has(list.id);
                const isAdding = addingId === list.id;
                return (
                  <li key={list.id}>
                    <button
                      type="button"
                      onClick={() => addToList(list)}
                      disabled={isAdding || added}
                      className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left transition hover:border-black/10 hover:bg-black/3 disabled:cursor-not-allowed dark:hover:border-white/10 dark:hover:bg-white/5 cursor-pointer"
                    >
                      <span className="shrink-0 text-black/30 dark:text-white/30">
                        <FaRegRectangleList size={16} />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
                          {list.name}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-black/40 dark:text-white/40">
                          {list.is_public ? (
                            <FaGlobe size={10} />
                          ) : (
                            <FaLock size={10} />
                          )}
                          {list.item_count}{" "}
                          {noun === "series"
                            ? "series"
                            : list.item_count === 1
                              ? "movie"
                              : "movies"}
                        </span>
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${
                          added
                            ? "bg-emerald-500/15 text-emerald-500"
                            : "bg-black/5 text-black/50 dark:bg-white/10 dark:text-white/60"
                        }`}
                      >
                        {isAdding ? (
                          <Spinner />
                        ) : added ? (
                          <FaCheck size={13} />
                        ) : (
                          <FaPlus size={13} />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddToListPopup;
