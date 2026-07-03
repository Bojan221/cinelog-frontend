export function MovieLoader() {
  return (
    <div className="flex animate-pulse flex-col gap-4 px-6 py-3">
      <div className="flex gap-8">
        {/* Poster */}
        <div className="h-75 w-50 shrink-0 rounded-lg bg-black/10 dark:bg-white/10"></div>

        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <div className="h-9 w-64 rounded-md bg-black/10 dark:bg-white/10"></div>
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
    </div>
  );
}
