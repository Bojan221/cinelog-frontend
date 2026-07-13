function ListCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-black/10 bg-black/2 p-4 dark:border-white/10 dark:bg-white/2">
      {/* Title row */}
      <div className="flex items-center gap-3">
        <div className="h-4.5 w-4.5 shrink-0 animate-pulse rounded bg-black/10 dark:bg-white/10" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-black/10 dark:bg-white/10" />
      </div>

      {/* Meta row: count + switch */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 animate-pulse rounded bg-black/10 dark:bg-white/10" />
        <div className="h-5.5 w-9 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
      </div>

      {/* Divider */}
      <div className="border-t border-black/5 dark:border-white/5" />

      {/* Footer: view button */}
      <div className="flex items-center justify-end">
        <div className="h-9 w-24 animate-pulse rounded-md bg-black/10 dark:bg-white/10" />
      </div>
    </div>
  );
}

function MyListsLoader({ count = 6 }: { count?: number }) {
  return (
    <div className="w-full">
      {/* Header skeleton */}
      <div className="border-b border-black/10 dark:border-white/10">
        <div className="flex flex-col gap-5 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-8">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-black/10 dark:bg-white/10 sm:h-16 sm:w-16" />
            <div className="flex flex-col gap-2">
              <div className="h-6 w-32 animate-pulse rounded bg-black/10 dark:bg-white/10" />
              <div className="h-4 w-16 animate-pulse rounded bg-black/10 dark:bg-white/10" />
            </div>
          </div>
          <div className="h-9 w-32 animate-pulse rounded-md bg-black/10 dark:bg-white/10" />
        </div>
      </div>

      {/* Cards grid skeleton */}
      <div className="grid w-full gap-3 p-3 grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] sm:gap-5 sm:p-5 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {Array.from({ length: count }).map((_, idx) => (
          <ListCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

export default MyListsLoader;
