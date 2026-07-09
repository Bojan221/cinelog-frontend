import { FaStar, FaClock, FaFilm } from "react-icons/fa";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: Stat[];
}

function ListHeader({ title, description, icon, stats }: Props) {
  return (
    <div className="relative overflow-hidden border-b border-black/10 dark:border-white/10">
      {/* accent glow */}
      <div className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl dark:bg-red-500/15" />
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-400/10 blur-3xl dark:bg-red-400/10" />

      <div className="relative flex flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-500/25 dark:from-red-500 dark:to-red-700 dark:shadow-red-500/25 sm:h-16 sm:w-16">
            {icon}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-extrabold tracking-tight text-black/90 dark:text-white/90 sm:text-2xl">
              {title}
            </h1>
            <p className="max-w-md text-sm text-black/50 dark:text-white/50">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl border border-black/10 bg-black/3 px-4 py-2.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
            >
              <span className="text-black/40 dark:text-white/40">
                {stat.icon}
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-black/90 dark:text-white/90">
                  {stat.value}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wide text-black/40 dark:text-white/40">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { FaStar, FaClock, FaFilm };
export default ListHeader;
