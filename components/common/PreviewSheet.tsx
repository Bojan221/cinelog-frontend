"use client";
import { useAppSelector, useAppDispatch } from "@/reduxStore/hooks";
import { IoClose } from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { closePreview, openPreview } from "@/reduxStore/previewSheetSlice";
import MovieSheet from "./MovieSheet";
import SerieSheet from "./series/SerieSheet";
import ActorSheet from "./actors/ActorSheet";
import SeasonSheet from "./series/SeasonSheet";
import EpisodeSheet from "./series/EpisodeSheet";
import { MovieLoader } from "../core/SheetLoader";
import { FaArrowLeft } from "react-icons/fa";

const PREVIEW_LABELS: Record<string, string> = {
  movie: "Movie",
  tv: "Series",
  actors: "Actor",
  season: "Season",
  episode: "Episode",
};

function PreviewSheet() {
  const { isOpen } = useAppSelector((s) => s.previewSheet);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const currentPreview = searchParams.get("preview");
  const dashIndex = currentPreview ? currentPreview.indexOf("-") : -1;
  const previewType =
    currentPreview && dashIndex !== -1 ? currentPreview.slice(0, dashIndex) : null;
  const previewId =
    currentPreview && dashIndex !== -1 ? currentPreview.slice(dashIndex + 1) : null;

  const prevPathname = useRef(pathname);
  const navigated = prevPathname.current !== pathname;

  useEffect(() => {
    if (navigated) {
      prevPathname.current = pathname;
      dispatch(closePreview());
      return;
    }
    if (currentPreview) {
      dispatch(openPreview({ content: currentPreview }));
    } else {
      dispatch(closePreview());
    }
  }, [navigated, currentPreview, pathname, dispatch]);

  const handleClosePreview = () => {
    dispatch(closePreview());
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.delete("preview");
    router.push(`${pathname}?${urlParams.toString()}`, { scroll: false });
  };

  const handleOpenPage = () => {
    if (!previewId) return;
    dispatch(closePreview());
    const base = previewType === "tv" ? "series" : "movies";
    router.push(`/${base}/${previewId}`);
  };

  const renderContent = () => { 
    switch(previewType) {
        case 'movie':
            return <MovieSheet movieId={previewId || null}/>;
        case "tv":
            return <SerieSheet serieId={previewId || null}/>
        case "actors":
            return <ActorSheet actorId={previewId || null}/>
        case "season": {
            const [serieId, seasonNumber] = (previewId || "").split("-");
            return <SeasonSheet serieId={serieId || null} seasonNumber={seasonNumber || null}/>
        }
        case "episode": {
            const [serieId, seasonNumber, episodeNumber] = (previewId || "").split("-");
            return <EpisodeSheet serieId={serieId || null} seasonNumber={seasonNumber || null} episodeNumber={episodeNumber || null}/>
        }
        default :
        return <MovieLoader/>
    }
  }

  return (
    <div
      className={`bg-background border-black/10 dark:border-white/10 fixed z-50 flex flex-col transition-transform duration-300
        inset-x-0 bottom-0 h-[85vh] w-full rounded-t-2xl border-t-2
        md:inset-x-auto md:right-0 md:top-0 md:bottom-0 md:h-auto md:w-110 md:rounded-t-none md:border-t-0 md:border-l-2 lg:w-[42%] xl:w-[36%] 2xl:max-w-160 ${
        isOpen
          ? "translate-y-0 md:translate-x-0"
          : "translate-y-full md:translate-y-0 md:translate-x-full"
      }`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-5 py-3 dark:border-white/10">
        <div className="flex items-center gap-2">
        <FaArrowLeft className="cursor-pointer text-[18px] text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white" onClick={() => router.back()}/> 
        <span className="text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
          {(previewType && PREVIEW_LABELS[previewType]) || previewType} Preview
        </span>
        </div>
        <div className="flex items-center gap-3">
          {previewType === "movie" || previewType === "tv" ? (
            <FaArrowUpRightFromSquare
              title={previewType === "tv" ? "Open series page" : "Open movie page"}
              onClick={handleOpenPage}
              className="cursor-pointer text-[18px] text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
            />
          ) : null}
        <IoClose
          className="cursor-pointer text-[28px] text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
          onClick={() => handleClosePreview()}
          />
          </div>
      </div>
      <div className="min-h-0 flex-1">
        {renderContent()}
      </div>
    </div>
  );
}

export default PreviewSheet;
