"use client";
import Link from "next/link";
import { List } from "@/types/list";
import { FaRegRectangleList, FaUserGroup } from "react-icons/fa6";
import { FaFilm, FaTv } from "react-icons/fa";
import { getInitials } from "@/utils/formatters";
import { normalizeDate } from "@/utils/formatters";
import NoDataIndicator from "../NoDataIndicator";

interface Props {
  lists: List[];
}

function OwnerBadge({ user }: { user: List["user"] }) {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const label = fullName || user?.username || "Unknown";

  return (
    <div className="flex items-center gap-2">
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={label}
          className="h-6 w-6 rounded-full object-cover"
        />
      ) : (
        <span className="grid h-6 w-6 place-items-center rounded-full bg-black/10 text-[10px] font-bold text-black/60 dark:bg-white/15 dark:text-white/70">
          {getInitials(label)}
        </span>
      )}
      <span className="truncate text-xs font-medium text-black/60 dark:text-white/60">
        {user?.username ? `@${user.username}` : label}
      </span>
    </div>
  );
}

function PublicListCard({ list }: { list: List }) {
  const isTv = list.media_type === "tv";
  const noun = isTv ? "series" : list.item_count === 1 ? "movie" : "movies";

  return (
    <Link
      href={`/lists/${list.id}`}
      className="group relative flex flex-col gap-4 rounded-xl border border-black/10 bg-black/2 p-4 transition duration-200 hover:border-black/20 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-white/2 dark:hover:border-white/20 dark:hover:shadow-black/30"
    >
      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-semibold uppercase leading-none tracking-wide text-black/50 dark:bg-white/10 dark:text-white/50">
        {isTv ? <FaTv size={11} className="shrink-0" /> : <FaFilm size={11} className="shrink-0" />}
        <span className="leading-none">{isTv ? "TV" : "Movie"}</span>
      </span>

      <div className="flex items-center gap-3 pr-16">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:bg-red-500/10 dark:text-red-400">
          <FaRegRectangleList size={18} />
        </span>
        <h3 className="min-w-0 truncate text-lg font-bold leading-snug tracking-tight text-black/90 dark:text-white/90">
          {list.name}
        </h3>
      </div>

      <div className="flex items-center justify-between gap-3">
        <OwnerBadge user={list.user} />
        <span className="shrink-0 text-sm font-medium text-black/50 dark:text-white/50">
          {list.item_count} {noun}
        </span>
      </div>

      <div className="border-t border-black/5 dark:border-white/5" />

      <div className="flex items-center justify-between">
        <span className="text-xs text-black/40 dark:text-white/40">
          {list.created_at ? normalizeDate(list.created_at) : ""}
        </span>
        <span className="inline-flex items-center rounded-md bg-red-500/90 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors group-hover:bg-red-600">
          View list
        </span>
      </div>
    </Link>
  );
}

function PublicLists({ lists }: Props) {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <header className="flex flex-col gap-3 border-b border-black/10 pb-6 dark:border-white/10">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:bg-red-500/10 dark:text-red-400">
            <FaUserGroup size={22} />
          </span>
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white sm:text-3xl">
              Community Lists
            </h1>
            <p className="text-sm text-black/50 dark:text-white/50">
              Public lists shared by other users
            </p>
          </div>
        </div>
        {lists.length > 0 ? (
          <span className="text-sm font-medium text-black/40 dark:text-white/40">
            {lists.length} {lists.length === 1 ? "list" : "lists"}
          </span>
        ) : null}
      </header>

      {lists.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => (
            <PublicListCard key={list.id} list={list} />
          ))}
        </div>
      ) : (
        <NoDataIndicator
          title="No public lists yet"
          text="When users make their lists public, they'll show up here."
          icon={<FaRegRectangleList size={30} />}
        />
      )}
    </div>
  );
}

export default PublicLists;
