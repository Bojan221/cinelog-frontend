import Avatar from "../core/Avatar";

const stats = [
  { label: "Movies Watched", value: 32 },
  { label: "TV Shows Watched", value: 12 },
  { label: "Favorites", value: 21 },
];

function UserData() {
  return (
    <div className="mt-auto flex flex-col gap-4 p-4">
      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-foreground/3 p-3">
        <Avatar size="lg" fullName="Bojan Andzic" />
        <button className="mt-3 w-full rounded-lg border border-red-500/30 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/10">
          View Profile
        </button>
      </div>

      <div>
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-widest text-foreground/40">
          Your Stats
        </p>
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-foreground/3 divide-y divide-black/5 dark:divide-white/5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between px-3 py-2.5 text-sm"
            >
              <span className="text-foreground/70">{stat.label}</span>
              <span className="font-semibold tabular-nums">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserData;
