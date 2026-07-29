import Image from "next/image";
import { FaRegImages } from "react-icons/fa6";
import DetailRail from "./DetailRail";

const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;

function PhotoGallery({ images }: { images: string[] }) {
  const photos = (images ?? []).filter(Boolean);
  if (photos.length === 0) return null;

  return (
    <DetailRail
      title="Photos"
      count={photos.length}
      icon={<FaRegImages className="text-[18px] text-indigo-500 dark:text-red-400" />}
    >
      {photos.map((path) => (
        <div
          key={path}
          className="relative aspect-video w-72 shrink-0 snap-start overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10 sm:w-80"
        >
          <Image
            alt="Still"
            src={`${POST_URL}${path}`}
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
      ))}
    </DetailRail>
  );
}

export default PhotoGallery;
