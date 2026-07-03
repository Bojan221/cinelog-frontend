"use client";

import { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { useNavigation } from "@/components/common/NavigationContext";

const options = [
  { label: "Newest", value: "newest" },
  { label: "Most Popular", value: "popular" },
  { label: "Best Rate", value: "rating" },
];

function SortSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const { navigate } = useNavigation();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort");
  const activeOption = options.find((option) => option.value === currentSort);

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    params.delete('search')
    params.delete('genre')
    navigate(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sort");
    params.set("page", "1");
    navigate(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-2 text-black dark:bg-white/5 dark:text-white focus:outline focus:outline-red-400/60"
      >
        <span>Sort by{activeOption ? `: ${activeOption.label}` : ""}</span>
        {activeOption ? (
          <IoClose
            role="button"
            aria-label="Clear sort"
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
        <div className="absolute z-10 mt-1 overflow-hidden rounded-lg border border-black/10 bg-background text-black shadow-lg dark:border-white/10 dark:text-white">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`cursor-pointer px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 ${
                option.value === currentSort ? "text-red-500 dark:text-red-400" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortSelect;
