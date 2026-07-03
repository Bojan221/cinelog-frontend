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
      className={`bg-background border-l-2 border-black/10 dark:border-white/10 fixed z-50 right-0 top-0 bottom-0 w-1/3 transition-all duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-end px-4 py-3">
        <IoClose
          className="cursor-pointer text-[28px] text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
          onClick={() => handleClosePreview()}
        />
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
}

export default PreviewSheet;
