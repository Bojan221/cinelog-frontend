"use client";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;

interface Props {
  images: string[];
  index: number | null;
  setIndex: Dispatch<SetStateAction<number | null>>;
  alt?: string;
}

function ImageLightbox({ images, index, setIndex, alt = "" }: Props) {
  const close = useCallback(() => setIndex(null), [setIndex]);
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? i : (i - 1 + images.length) % images.length
      ),
    [images.length, setIndex]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length, setIndex]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, prev, next]);

  if (index === null || !images[index]) return null;

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
      >
        <IoClose size={24} />
      </button>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer sm:left-6"
          >
            <FaChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer sm:right-6"
          >
            <FaChevronRight size={18} />
          </button>
        </>
      ) : null}

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[88vh] max-w-[92vw] items-center justify-center"
      >
        <Image
          alt={alt}
          src={`${POST_URL}${images[index]}`}
          width={1280}
          height={720}
          className="h-auto min-h-[60vh] max-h-[88vh] w-auto rounded-lg object-contain shadow-2xl"
        />
      </div>

      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
        {index + 1} / {images.length}
      </span>
    </div>
  );
}

export default ImageLightbox;
