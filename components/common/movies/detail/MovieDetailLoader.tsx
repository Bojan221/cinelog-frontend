function MovieDetailLoader() {
  return (
    <div className="w-full animate-pulse pb-16">
      <div className="relative h-[42vh] min-h-70 w-full bg-black/10 sm:h-[50vh] dark:bg-white/5" />

      <div className="relative z-10 -mt-44 px-4 sm:-mt-52 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
            <div className="mx-auto h-60 w-40 shrink-0 rounded-2xl bg-black/10 sm:mx-0 sm:w-55 dark:bg-white/10" />
            <div className="flex flex-1 flex-col gap-4">
              <div className="h-10 w-2/3 rounded-lg bg-black/10 dark:bg-white/10" />
              <div className="h-4 w-1/3 rounded bg-black/10 dark:bg-white/10" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-7 w-16 rounded-full bg-black/10 dark:bg-white/10"
                  />
                ))}
              </div>
              <div className="h-14 w-40 rounded bg-black/10 dark:bg-white/10" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="h-6 w-32 rounded bg-black/10 dark:bg-white/10" />
            <div className="h-24 w-full max-w-3xl rounded bg-black/10 dark:bg-white/10" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="h-6 w-24 rounded bg-black/10 dark:bg-white/10" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex w-28 shrink-0 flex-col gap-2 sm:w-32">
                  <div className="aspect-2/3 w-full rounded-xl bg-black/10 dark:bg-white/10" />
                  <div className="h-3 w-3/4 rounded bg-black/10 dark:bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailLoader;
