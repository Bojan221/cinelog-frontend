"use client";
import { useState } from "react";
import Image from "next/image";
import { FaRegImages } from "react-icons/fa6";
import ImageLightbox from "../ImageLightbox";

const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;

function ActorPhotos({ images, name }: { images: string[]; name: string }) {
  const photos = (images ?? []).filter(Boolean);
  const [index, setIndex] = useState<number | null>(null);

  if (!photos.length) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-black dark:text-white">
        <FaRegImages className="text-[18px] text-indigo-500 dark:text-red-400" />
        Photos
        <span className="text-sm font-medium text-black/40 dark:text-white/40">
          ({photos.length})
        </span>
      </h2>

      <div className="grid w-full gap-3 grid-cols-[repeat(auto-fill,minmax(min(110px,100%),1fr))] sm:gap-4 md:grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
        {photos.map((path, i) => (
          <button
            key={path}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-2/3 w-full overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 transition duration-300 hover:ring-black/25 cursor-pointer dark:bg-white/5 dark:ring-white/10 dark:hover:ring-white/25"
          >
            <Image
              alt={name}
              src={`${POST_URL}${path}`}
              fill
              sizes="140px"
              className="object-cover transition duration-300 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      <ImageLightbox
        images={photos}
        index={index}
        setIndex={setIndex}
        alt={name}
      />
    </section>
  );
}

export default ActorPhotos;
