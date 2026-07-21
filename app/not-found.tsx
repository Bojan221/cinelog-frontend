import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-8 sm:p-16">

      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <Image
          src="/wallpaper.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-8xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-9xl">
          404
        </h1>
        <p className="mt-4 text-xl font-medium text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] sm:text-2xl">
          Oops — this page wandered off.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-lg transition hover:bg-white/90"
        >
          Back to home
        </Link>
        </div>
      </div>
    </div>
  );
}
