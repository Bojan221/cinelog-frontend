"use client";

import { FaLayerGroup, FaPlus } from "react-icons/fa6";
import NoDataIndicator from "@/components/common/NoDataIndicator";
import { useState } from "react";
import CreateList from "../CreateList";

interface Props {
  lists: { lists?: unknown[] } | unknown[];
}

function MyLists({ lists }: Props) {
  const items = Array.isArray(lists) ? lists : (lists?.lists ?? []);
  const count = items.length;
  const[isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <div className="w-full">
      <div className="relative overflow-hidden border-b border-black/10 dark:border-white/10">
        <div className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl dark:bg-red-500/15" />
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-400/10 blur-3xl dark:bg-red-400/10" />

        <div className="relative flex flex-col gap-5 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-500/25 dark:from-red-500 dark:to-red-700 dark:shadow-red-500/25 sm:h-16 sm:w-16">
              <FaLayerGroup size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-extrabold tracking-tight text-black/90 dark:text-white/90 sm:text-2xl">
                My Lists
              </h1>
              <p className="text-sm text-black/50 dark:text-white/50">
                {count} {count === 1 ? "list" : "lists"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={()=> setIsPopupOpen(true)}
            className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-red-500/90 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-red-600 cursor-pointer sm:self-auto"
          >
            <FaPlus size={13} />
            Create list
          </button>
        </div>
      </div>

      {count > 0 ? (
        <div className="grid w-full gap-3 p-3 grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] sm:gap-5 sm:p-5 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        </div>
      ) : (
        <NoDataIndicator
          title="You don't have any lists yet"
          text="Create your first custom list to start organizing movies your own way."
          icon={<FaLayerGroup size={30} />}
        />
      )}

      <CreateList
        type="movie"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
}

export default MyLists;
