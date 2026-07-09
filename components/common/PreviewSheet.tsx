"use client";
import { useAppSelector, useAppDispatch } from "@/reduxStore/hooks";
import { IoClose } from "react-icons/io5";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { closePreview, openPreview } from "@/reduxStore/previewSheetSlice";
import MovieSheet from "./MovieSheet";
import SerieSheet from "./series/SerieSheet";
import { MovieLoader } from "../core/SheetLoader";

function PreviewSheet() {
  const { isOpen, previewContent } = useAppSelector((s) => s.previewSheet);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const currentPreview = searchParams.get("preview");
  const [previewType, previewId] = currentPreview
    ? currentPreview.split("-")
    : [null, null];

  const prevPathname = useRef(pathname);
  const navigated = prevPathname.current !== pathname;

  useEffect(() => {
    if (navigated) return;
    if (isOpen && currentPreview !== previewContent && previewContent) {
      const urlParams = new URLSearchParams(searchParams.toString());

      urlParams.set("preview", previewContent);

      router.push(`${pathname}?${urlParams.toString()}`, { scroll: false });
    }
  }, [
    navigated,
    isOpen,
    currentPreview,
    previewContent,
    pathname,
    router,
    searchParams,
  ]);

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

  const renderContent = () => { 
    switch(previewType) {
        case 'movie':
            return <MovieSheet movieId={previewId || null}/>;
        case "tv":
            return <SerieSheet serieId={previewId || null}/>
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
        <span className="text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
          {previewType} Preview
        </span>
        <IoClose
          className="cursor-pointer text-[28px] text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
          onClick={() => handleClosePreview()}
        />
      </div>
      <div className="min-h-0 flex-1">
        {renderContent()}
      </div>
    </div>
  );
}

export default PreviewSheet;
