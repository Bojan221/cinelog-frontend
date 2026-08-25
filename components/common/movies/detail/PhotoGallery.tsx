"use client";
import { useState } from "react";
import Image from "next/image";
import { FaRegImages } from "react-icons/fa6";
import DetailRail from "./DetailRail";
import ImageLightbox from "../../ImageLightbox";

const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;

function PhotoGallery({ images }: { images: string[] }) {
  const photos = (images ?? []).filter(Boolean);
  const [index, setIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <>
      <DetailRail
        title="Photos"
        count={photos.length}
        icon={
          <FaRegImages className="text-[18px] text-indigo-500 dark:text-red-400" />
        }
      >
        {photos.map((path, i) => (
          <button
            key={path}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-video w-72 shrink-0 snap-start overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 transition duration-300 hover:ring-black/25 cursor-pointer dark:bg-white/5 dark:ring-white/10 dark:hover:ring-white/25 sm:w-80"
          >
            <Image
              alt="Still"
              src={`${POST_URL}${path}`}
              fill
              sizes="320px"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </DetailRail>

      <ImageLightbox images={photos} index={index} setIndex={setIndex} />
    </>
  );
}

export default PhotoGallery;
