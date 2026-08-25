function ActorDetailLoader() {
  return (
    <div className="flex w-full animate-pulse flex-col gap-12 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <div className="mx-auto h-72 w-48 shrink-0 rounded-2xl bg-black/10 sm:mx-0 sm:w-60 dark:bg-white/10" />
        <div className="flex flex-1 flex-col gap-5">
          <div className="h-10 w-2/3 rounded-lg bg-black/10 dark:bg-white/10" />
          <div className="flex flex-col gap-2 rounded-xl border border-black/10 p-4 dark:border-white/15">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-5 w-full rounded bg-black/10 dark:bg-white/10" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="h-6 w-32 rounded bg-black/10 dark:bg-white/10" />
        <div className="h-24 w-full max-w-3xl rounded bg-black/10 dark:bg-white/10" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="h-6 w-40 rounded bg-black/10 dark:bg-white/10" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-lg border border-black/10 p-2 dark:border-white/10"
            >
              <div className="h-24 w-16 shrink-0 rounded-md bg-black/10 dark:bg-white/10" />
              <div className="flex flex-1 flex-col gap-2 py-1">
                <div className="h-4 w-1/2 rounded bg-black/10 dark:bg-white/10" />
                <div className="h-3 w-2/3 rounded bg-black/10 dark:bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActorDetailLoader;
