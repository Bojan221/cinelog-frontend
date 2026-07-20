"use client";
import { useState } from "react";
import Image from "next/image";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { Review } from "@/types/movie";
import { normalizeDate } from "@/utils/formatters";

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.content.length > 320;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-black/10 bg-black/2 p-4 dark:border-white/10 dark:bg-white/3">
      <div className="flex items-center gap-3">
        {review.avatar ? (
          <Image
            alt={review.author}
            src={review.avatar}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <FaUserCircle className="h-10 w-10 text-black/20 dark:text-white/20" />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-black/90 dark:text-white/90">
            {review.author}
          </span>
          <span className="text-xs text-black/40 dark:text-white/40">
            {review.createdAt ? normalizeDate(review.createdAt) : ""}
          </span>
        </div>
        {review.rating ? (
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-sm font-semibold text-amber-600 dark:text-amber-400">
            <FaStar size={12} />
            {review.rating}
          </span>
        ) : null}
      </div>

      <p
        className={`text-sm leading-relaxed text-black/70 dark:text-white/80 ${
          !expanded && isLong ? "line-clamp-4" : ""
        }`}
      >
        {review.content}
      </p>

      {isLong ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-fit text-xs font-semibold text-indigo-600 hover:underline dark:text-red-400 cursor-pointer"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      ) : null}
    </div>
  );
}

function MovieReviews({ reviews }: { reviews: Review[] }) {
  if (!reviews?.length) return null;

  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
        Reviews{" "}
        <span className="text-sm font-medium text-black/40 dark:text-white/40">
          ({reviews.length})
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}

export default MovieReviews;
