"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { FaLayerGroup, FaGlobe, FaLock } from "react-icons/fa6";
import axiosPrivate from "@/app/api/axiosPrivate";
import { showToast } from "./Toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

function CreateList({ isOpen, onClose, type }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setName("");
      setIsPublic(false);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const canSubmit = name.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    try {
      const basePath = type === "tv" ? "/series" : "/movies";
      await axiosPrivate.post(`${basePath}/lists/create`, {
        name: name.trim(),
        isPublic: isPublic ? 1 : 0,
      });
      showToast("success", "List successfully created");
      onClose();
      router.refresh();
    } catch (err) {
      const status = (err as { response?: { status?: number } })?.response
        ?.status;
      if (status === 409) {
        showToast("info", "List with this name already exists");
      } else {
        showToast("error", "Failed to create list");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-60 flex items-end justify-center sm:items-center sm:p-4 ${
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
        className={`bg-background relative flex w-full flex-col rounded-t-2xl border border-black/10 shadow-2xl transition-all duration-300 ease-out dark:border-white/10 sm:max-w-md sm:rounded-2xl ${
          isOpen
            ? "translate-y-0 sm:scale-100 sm:opacity-100"
            : "translate-y-full sm:translate-y-0 sm:scale-95 sm:opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-500/25 dark:from-red-500 dark:to-red-700 dark:shadow-red-500/25">
              <FaLayerGroup size={16} />
            </div>
            <h2 className="text-lg font-bold text-black/90 dark:text-white/90">
              Create list
            </h2>
          </div>
          <IoClose
            className="cursor-pointer text-2xl text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-5 py-5">

          <div className="flex flex-col gap-2">
            <label
              htmlFor="list-name"
              className="text-sm font-medium text-black/70 dark:text-white/70"
            >
              List name
            </label>
            <input
              id="list-name"
              type="text"
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Weekend binge"
              className="w-full rounded-lg border border-black/10 bg-black/3 px-3.5 py-2.5 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30"
            />
          </div>


          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-black/70 dark:text-white/70">
              Type
            </span>
            <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black/60 dark:bg-white/10 dark:text-white/70">
              {type}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsPublic((p) => !p)}
            className="flex items-center justify-between gap-3 rounded-lg border border-black/10 bg-black/2 px-3.5 py-3 text-left transition hover:bg-black/4 dark:border-white/10 dark:bg-white/3 dark:hover:bg-white/5"
          >
            <span className="flex items-center gap-3">
              <span className="text-black/40 dark:text-white/40">
                {isPublic ? <FaGlobe size={16} /> : <FaLock size={16} />}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium text-black/80 dark:text-white/80">
                  {isPublic ? "Public list" : "Private list"}
                </span>
                <span className="text-xs text-black/40 dark:text-white/40">
                  {isPublic
                    ? "Anyone can view this list."
                    : "Only you can view this list."}
                </span>
              </span>
            </span>
            <span
              aria-hidden
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                isPublic ? "bg-red-500" : "bg-black/20 dark:bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  isPublic ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </span>
          </button>

          <div className="mt-1 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm font-semibold text-black/60 transition-colors hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="rounded-md bg-red-500/90 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Creating…" : "Create list"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateList;
