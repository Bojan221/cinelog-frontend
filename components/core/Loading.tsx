
function Loading() {
  return (
    <div
      className="grid w-full gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(224px, 1fr))" }}
    >
      {Array.from({ length: 20 }).map((_, idx) => (
        <div
          key={idx}
          className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-3 shadow-lg"
        >
          <div className="relative mx-auto w-50">
            <div className="h-75 w-50 animate-pulse rounded-xl bg-neutral-800" />
            <div className="absolute right-3 top-3 h-6 w-6 animate-pulse rounded-full bg-neutral-700" />
          </div>

          <div className="space-y-3 px-1 pt-4">
            <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-800" />

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-neutral-700" />
              <div className="h-4 w-12 animate-pulse rounded bg-neutral-800" />
            </div>

            <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loading;
