function ActorsLoader({ count = 18 }: { count?: number }) {
  return (
    <div className="flex w-full animate-pulse flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-black/10 pb-6 dark:border-white/10">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-black/10 dark:bg-white/10" />
        <div className="flex flex-col gap-2">
          <div className="h-7 w-40 rounded bg-black/10 dark:bg-white/10" />
          <div className="h-4 w-52 rounded bg-black/10 dark:bg-white/10" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid w-full gap-3 grid-cols-[repeat(auto-fill,minmax(min(105px,100%),1fr))] sm:gap-4 md:grid-cols-[repeat(auto-fill,minmax(130px,1fr))]">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="aspect-2/3 w-full rounded-xl bg-black/10 dark:bg-white/10" />
            <div className="h-4 w-3/4 rounded bg-black/10 dark:bg-white/10" />
            <div className="h-3 w-1/2 rounded bg-black/10 dark:bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActorsLoader;
