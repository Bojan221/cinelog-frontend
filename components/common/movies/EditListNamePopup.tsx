"use client";

import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSave?: (name: string) => void;
  saving?: boolean;
}

function EditListNamePopup({
  isOpen,
  onClose,
  currentName,
  onSave,
  saving = false,
}: Props) {
  const [name, setName] = useState(currentName);
  const inputRef = useRef<HTMLInputElement>(null);

  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) setName(currentName);
  }

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.select(), 150);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const trimmed = name.trim();
  const canSave = trimmed.length > 0 && trimmed !== currentName && !saving;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;
    onSave?.(trimmed);
  };

  return (
    <div
      className={`fixed inset-0 z-60 flex items-end justify-center sm:items-center sm:p-4 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        className={`bg-background relative flex w-full flex-col rounded-t-2xl border border-black/10 shadow-2xl transition-all duration-300 ease-out dark:border-white/10 sm:max-w-md sm:rounded-2xl ${
          isOpen
            ? "translate-y-0 sm:scale-100 sm:opacity-100"
            : "translate-y-full sm:translate-y-0 sm:scale-95 sm:opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-500/25 dark:from-red-500 dark:to-red-700 dark:shadow-red-500/25">
              <FaPen size={14} />
            </div>
            <h2 className="text-lg font-bold text-black/90 dark:text-white/90">
              Rename list
            </h2>
          </div>
          <IoClose
            className="cursor-pointer text-2xl text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
            onClick={onClose}
          />
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-5 py-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="edit-list-name"
              className="text-sm font-medium text-black/70 dark:text-white/70"
            >
              List name
            </label>
            <input
              id="edit-list-name"
              type="text"
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Weekend binge"
              className="w-full rounded-lg border border-black/10 bg-black/3 px-3.5 py-2.5 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30"
            />
          </div>

          {/* Footer */}
          <div className="mt-1 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-black/60 transition-colors hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSave}
              className="cursor-pointer rounded-md bg-red-500/90 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditListNamePopup;
