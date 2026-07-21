"use client";
import Link from "next/link";
import Image from "next/image";
import { ListDetail, ListItem } from "@/types/list";
import { FaArrowLeft, FaRegRectangleList, FaFilm, FaTv } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { getInitials, normalizeDate, formatRate } from "@/utils/formatters";
import { getYearFromDate } from "@/utils/helpers";
import { usePreview } from "../usePreview";
import NoDataIndicator from "../NoDataIndicator";

export interface PublicListDetailData {
  list: ListDetail;
}

function ListItemCard({ item }: { item: ListItem }) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const openPreview = usePreview();
  const type = item.type === "tv" ? "tv" : "movie";
  const year = getYearFromDate(item.releaseDate);

  return (
    <button
      type="button"
      onClick={() => openPreview(type, item.tmdbId)}
      className="group flex flex-col gap-2 text-left"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 transition duration-300 group-hover:shadow-lg group-hover:shadow-black/20 group-hover:ring-black/25 dark:bg-white/5 dark:ring-white/10 dark:group-hover:shadow-black/40 dark:group-hover:ring-white/25">
        {item.poster ? (
          <Image
            alt={item.title}
            src={`${POST_URL}${item.poster}`}
            fill
            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-black/40 dark:text-white/40">
            No image
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="flex flex-col gap-1 px-0.5">
        <span className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
          {item.title}
        </span>
        <div className="flex items-center gap-2 text-xs font-medium text-black/40 dark:text-white/40">
          {year ? <span>{year}</span> : null}
          {item.vote ? (
            <>
              {year ? <span aria-hidden>·</span> : null}
              <span className="flex items-center gap-1">
                <FaStar className="text-amber-500 dark:text-amber-400" size={11} />
                {formatRate(Number(item.vote))}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </button>
  );
}

function PublicListDetail({ data }: { data: PublicListDetailData }) {
  const { list } = data;
  const items = list.list_items ?? [];
  const isTv = list.media_type === "tv";
  const user = list.user;
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const ownerLabel = fullName || user?.username || "Unknown";
  const count = items.length || list.item_count || 0;
  const noun = isTv ? "series" : count === 1 ? "movie" : "movies";

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <Link
        href="/lists"
        className="flex w-fit items-center gap-2 text-sm font-medium text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
      >
        <FaArrowLeft size={13} />
        All lists
      </Link>

      <header className="flex flex-col gap-4 border-b border-black/10 pb-6 dark:border-white/10">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:bg-red-500/10 dark:text-red-400">
            <FaRegRectangleList size={22} />
          </span>
          <div className="flex min-w-0 flex-col gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white sm:text-3xl">
              {list.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-black/50 dark:text-white/50">
              <span className="flex items-center gap-2">
                {user?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatar}
                    alt={ownerLabel}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-black/10 text-[10px] font-bold text-black/60 dark:bg-white/15 dark:text-white/70">
                    {getInitials(ownerLabel)}
                  </span>
                )}
                {user?.username ? `@${user.username}` : ownerLabel}
              </span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                {isTv ? <FaTv size={12} /> : <FaFilm size={12} />}
                {isTv ? "TV" : "Movie"}
              </span>
              <span aria-hidden>·</span>
              <span>
                {count} {noun}
              </span>
              {list.created_at ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{normalizeDate(list.created_at)}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((item) => (
            <ListItemCard key={`${item.type}-${item.tmdbId}`} item={item} />
          ))}
        </div>
      ) : (
        <NoDataIndicator
          title="Empty list"
          text="This list doesn't have any titles yet."
          icon={<FaRegRectangleList size={30} />}
        />
      )}
    </div>
  );
}

export default PublicListDetail;
