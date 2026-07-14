function RailSkeleton({
  variant,
  cards = 8,
}: {
  variant: "episode" | "poster";
  cards?: number;
}) {
  const isEpisode = variant === "episode";

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Title */}
      <div className="flex items-center gap-2.5 px-1">
        <div className="h-6 w-6 rounded-md bg-black/10 dark:bg-white/10" />
        <div className="h-7 w-56 rounded-md bg-black/10 dark:bg-white/10" />
      </div>

      {/* Cards row */}
      <div className="flex gap-4 overflow-hidden px-1 pb-2">
        {Array.from({ length: cards }).map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 flex-col gap-3 rounded-xl border border-black/10 dark:border-white/10 ${
              isEpisode ? "w-56 sm:w-64" : "w-36 sm:w-40"
            }`}
          >
            <div
              className={`w-full rounded-xl bg-black/10 dark:bg-white/10 ${
                isEpisode ? "aspect-video" : "aspect-2/3"
              }`}
            />
            <div className="flex flex-col gap-2 px-2 pb-2">
              <div className="h-4 w-3/4 rounded bg-black/10 dark:bg-white/10" />
              <div className="h-3.5 w-1/3 rounded bg-black/10 dark:bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-black/10 dark:bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeLoader() {
  return (
    <div className="flex w-full animate-pulse flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <RailSkeleton variant="episode" />
      <RailSkeleton variant="poster" />
      <RailSkeleton variant="poster" />
    </div>
  );
}

export default HomeLoader;
