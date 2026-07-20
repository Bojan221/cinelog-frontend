"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

/**
 * Opens the side preview sheet by setting the `preview` search param.
 * Content format is `${type}-${id}` where id may itself be composite:
 *  - "movie-69", "tv-1431", "actors-422"
 *  - "season-46952-1"            (serieId-seasonNumber)
 *  - "episode-46952-1-2"         (serieId-seasonNumber-episodeNumber)
 */
export function usePreview() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    type: "movie" | "tv" | "actors" | "season" | "episode",
    id: number | string
  ) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set("preview", `${type}-${id}`);
    router.push(`${pathname}?${urlParams.toString()}`, { scroll: false });
  };
}
