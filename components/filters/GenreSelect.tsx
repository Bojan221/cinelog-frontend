"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Genre } from "@/types/genre";
import axiosPrivate from "@/app/api/axiosPrivate";
import { IoChevronDown, IoClose } from "react-icons/io5";

function GenreSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentGenre = searchParams.get("genre");
  const activeGenre = genres?.find(
    (genre) => genre.id.toString() === currentGenre,
  );

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axiosPrivate.get("/movies/movieGenres");
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
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("genre");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 text-white/80 focus:outline focus:outline-red-400/60"
      >
        <span>Genre{activeGenre ? `: ${activeGenre.name}` : ""}</span>
        {activeGenre ? (
          <IoClose
            role="button"
            aria-label="Clear genre"
            onClick={handleClear}
            className="text-[15px] rounded-full hover:bg-white/10"
          />
        ) : (
          <IoChevronDown
            className={`text-[15px] transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-64 overflow-y-auto rounded-lg bg-black/90 text-white/80">
          {genres?.map((genre) => (
            <div
              key={genre.id}
              onClick={() => handleSelect(genre.id.toString())}
              className={`cursor-pointer px-3 py-2 hover:bg-white/10 ${
                genre.id.toString() === currentGenre ? "text-red-400" : ""
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
