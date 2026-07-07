export function MovieLoader() {
  return (
    <div className="flex h-full animate-pulse flex-col gap-4 overflow-y-auto px-4 py-3 thin-scrollbar sm:px-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
        {/* Poster */}
        <div className="mx-auto h-75 w-50 shrink-0 rounded-lg bg-black/10 sm:mx-0 dark:bg-white/10"></div>

        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <div className="h-8 w-48 rounded-md bg-black/10 sm:h-9 sm:w-64 dark:bg-white/10"></div>
            <div className="h-5 w-32 rounded-md bg-black/10 dark:bg-white/10"></div>
            <div className="flex gap-2">
              <div className="h-5 w-15 rounded-full bg-black/10 dark:bg-white/10"></div>
              <div className="h-5 w-15 rounded-full bg-black/10 dark:bg-white/10"></div>
              <div className="h-5 w-15 rounded-full bg-black/10 dark:bg-white/10"></div>
            </div>
          </div>

          {/* Rating */}
          <div className="h-6 w-24 rounded-md bg-black/10 dark:bg-white/10"></div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <div className="h-5 w-16 rounded-md bg-black/10 dark:bg-white/10"></div>
            <div className="h-7 w-24 rounded-full bg-black/10 dark:bg-white/10"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 py-2 sm:gap-3">
        <div className="h-8 w-30 rounded-md bg-black/10 dark:bg-white/10"></div>
        <div className="h-8 w-30 rounded-md bg-black/10 dark:bg-white/10"></div>
        <div className="h-8 w-30 rounded-md bg-black/10 dark:bg-white/10"></div>
      </div>

      {/* Overview */}
      <div className="flex flex-col gap-3">
        <div className="h-6 w-28 rounded-md bg-black/10 dark:bg-white/10"></div>
        <div className="flex flex-col gap-2 rounded-lg border border-black/10 px-4 py-3 dark:border-white/10">
          <div className="h-3.5 w-full rounded bg-black/10 dark:bg-white/10"></div>
          <div className="h-3.5 w-full rounded bg-black/10 dark:bg-white/10"></div>
          <div className="h-3.5 w-4/5 rounded bg-black/10 dark:bg-white/10"></div>
        </div>
      </div>

      {/* Trailer */}
      <div className="flex flex-col gap-3">
        <div className="h-6 w-28 rounded-md bg-black/10 dark:bg-white/10"></div>
        <div className="aspect-video w-full rounded-lg bg-black/10 dark:bg-white/10"></div>
      </div>

      {/* Movie Info */}
      <div className="flex flex-col gap-3">
        <div className="h-6 w-28 rounded-md bg-black/10 dark:bg-white/10"></div>
        <div className="flex flex-col divide-y divide-black/10 rounded-lg border border-black/10 dark:divide-white/10 dark:border-white/10">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-2.5">
              <div className="h-6 w-1/3 shrink-0 rounded bg-black/10 dark:bg-white/10"></div>
              <div className="h-6 w-2/5 rounded bg-black/10 dark:bg-white/10"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
