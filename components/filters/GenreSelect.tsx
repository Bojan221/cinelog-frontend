"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import type { Genre } from "@/types/genre";
import axiosPrivate from "@/app/api/axiosPrivate";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { useNavigation } from "@/components/common/NavigationContext";

function GenreSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigate } = useNavigation();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentGenre = searchParams.get("genre");
  const activeGenre = genres?.find(
    (genre) => genre.id.toString() === currentGenre,
  );

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axiosPrivate.get("/movies/genres");
        setGenres(response.data.genres);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("genre", value);
    params.set("page", "1");
    params.delete("search");
    params.delete("sort");
    navigate(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("genre");
    params.set("page", "1");
    navigate(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };
  return (
    <div className="relative flex-1 sm:w-50 sm:flex-none" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 rounded-lg bg-black/5 px-3 py-2 text-black dark:bg-white/5 dark:text-white focus:outline focus:outline-red-400/60"
      >
        <span className="truncate">Genre{activeGenre ? `: ${activeGenre.name}` : ""}</span>
        {activeGenre ? (
          <IoClose
            role="button"
            aria-label="Clear genre"
            onClick={handleClear}
            className="rounded-full text-[15px] hover:bg-black/10 dark:hover:bg-white/10"
          />
        ) : (
          <IoChevronDown
            className={`text-[15px] transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-64 min-w-full overflow-x-hidden overflow-y-auto rounded-lg border border-black/10 bg-background text-black shadow-lg dark:border-white/10 dark:text-white [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-red-400/60 [&::-webkit-scrollbar-track]:bg-transparent">
          {genres?.map((genre) => (
            <div
              key={genre.id}
              onClick={() => handleSelect(genre.id.toString())}
              className={`cursor-pointer px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 ${
                genre.id.toString() === currentGenre ? "text-red-500 dark:text-red-400" : ""
              }`}
            >
              {genre.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenreSelect;
