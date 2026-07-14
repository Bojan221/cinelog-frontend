"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

/**
 * Opens the side preview sheet by setting the `preview` search param.
 * Content format is `${type}-${id}` (e.g. "movie-69", "tv-1431", "actors-422").
 */
export function usePreview() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (type: "movie" | "tv" | "actors", id: number | string) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set("preview", `${type}-${id}`);
    router.push(`${pathname}?${urlParams.toString()}`, { scroll: false });
  };
}
