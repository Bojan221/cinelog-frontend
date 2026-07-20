"use client";
import { ReactNode, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  title: string;
  icon?: ReactNode;
  count?: number;
  children: ReactNode;
}

function DetailRail({ title, icon, count, children }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-2.5">
        {icon}
        <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
          {title}
        </h2>
        {typeof count === "number" ? (
          <span className="text-sm font-medium text-black/40 dark:text-white/40">
            ({count})
          </span>
        ) : null}
      </div>

      <div className="group/rail relative">
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 thin-scrollbar"
        >
          {children}
        </div>

        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollBy("left")}
          className="absolute left-0 top-[calc(50%-1.25rem)] hidden -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/70 p-3 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/90 group-hover/rail:grid"
        >
          <FaChevronLeft size={16} />
        </button>

        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollBy("right")}
          className="absolute right-0 top-[calc(50%-1.25rem)] hidden -translate-y-1/2 translate-x-1/2 place-items-center rounded-full bg-black/70 p-3 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/90 group-hover/rail:grid"
        >
          <FaChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}

export default DetailRail;
