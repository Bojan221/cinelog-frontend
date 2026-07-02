"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { IoChevronDown, IoClose } from "react-icons/io5";

const options = [
  { label: "Newest", value: "newest" },
  { label: "Most Popular", value: "popular" },
  { label: "Best Rate", value: "rating" },
];

function SortSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort");
  const activeOption = options.find((option) => option.value === currentSort);

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    params.delete('search')
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sort");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 text-white/80 focus:outline focus:outline-red-400/60"
      >
        <span>Sort by{activeOption ? `: ${activeOption.label}` : ""}</span>
        {activeOption ? (
          <IoClose
            role="button"
            aria-label="Clear sort"
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
        <div className="absolute z-10 mt-1  overflow-hidden rounded-lg bg-black/90 text-white/80">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`cursor-pointer px-3 py-2 hover:bg-white/10 ${
                option.value === currentSort ? "text-red-400" : ""
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
