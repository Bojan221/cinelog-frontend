const GRID_COLUMNS = "repeat(auto-fill, minmax(180px, 1fr))";

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/5 shadow-lg dark:border-white/10 dark:bg-white/5">
      <div className="relative mx-auto w-full">
        <div className="h-75 w-full animate-pulse rounded-xl bg-black/10 dark:bg-white/10" />
        <div className="absolute right-3 top-3 h-7 w-7 animate-pulse rounded-full bg-black/15 dark:bg-white/15" />
      </div>

      <div className="space-y-3 px-2 py-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-black/10 dark:bg-white/10" />

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse rounded bg-black/15 dark:bg-white/15" />
          <div className="h-4 w-12 animate-pulse rounded bg-black/10 dark:bg-white/10" />
        </div>

        <div className="h-3 w-1/2 animate-pulse rounded bg-black/10 dark:bg-white/10" />
      </div>
    </div>
  );
}

interface Props {
  count?: number;
  overlay?: boolean;
  firstLoad?:boolean;
}

function MovieListLoader({ count = 20, overlay = false, firstLoad = false }: Props) {
  return (
    <div className="relative w-full">
      {overlay && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-red-400" />
        </div>
      )}
      {firstLoad &&(<div className="flex items-center px-4 py-3 border-b border-black/10 dark:border-white/10 gap-2">
        <div className="h-10 w-50 animate-pulse rounded-md bg-black/10 dark:bg-white/10"></div>
        <div className="h-10 w-50 animate-pulse rounded-md bg-black/10 dark:bg-white/10"></div>
        <div className="h-10 w-50 animate-pulse rounded-md bg-black/10 dark:bg-white/10"></div>
      </div>)}
      <div
        className="grid w-full gap-6 p-5"
        style={{ gridTemplateColumns: GRID_COLUMNS }}
      >
        {Array.from({ length: count }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    </div>
  );
}

export default MovieListLoader;
