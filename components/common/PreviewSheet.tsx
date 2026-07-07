"use client";
import { useAppSelector, useAppDispatch } from "@/reduxStore/hooks";
import { IoClose } from "react-icons/io5";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { closePreview, openPreview } from "@/reduxStore/previewSheetSlice";
import MovieSheet from "./MovieSheet";
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
    
  useEffect(() => {
    if (isOpen && currentPreview !== previewContent && previewContent) {
      const urlParams = new URLSearchParams(searchParams.toString());

      urlParams.set("preview", previewContent);

      router.push(`${pathname}?${urlParams.toString()}`, { scroll: false });
    }
  }, [isOpen, currentPreview, previewContent, pathname, router, searchParams]);

  useEffect(() => {
    if (currentPreview) {
      dispatch(openPreview({ content: currentPreview }));
    } else {
      dispatch(closePreview());
    }
  }, [currentPreview, pathname]);

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
        default :
        return <MovieLoader/>
    } 
  }

  return (
    <div
      className={`bg-background border-l-2 border-black/10 dark:border-white/10 fixed z-50 right-0 top-0 bottom-0 flex w-1/3 flex-col transition-all duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
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
