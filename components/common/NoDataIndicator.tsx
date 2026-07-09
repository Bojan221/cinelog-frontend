import Link from "next/link";
import { FaFilm, FaPlus } from "react-icons/fa";

interface Props {
  title?: string;
  text: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

function NoDataIndicator({
  title = "Nothing here yet",
  text,
  actionLabel,
  actionHref,
  icon,
}: Props) {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-6 py-16 text-center">
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl dark:bg-red-500/10" />
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-black/10 bg-black/3 text-black/30 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/30 sm:h-24 sm:w-24">
          {icon ?? <FaFilm size={34} />}
        </div>
      </div>

      <h2 className="text-lg font-bold text-black/90 dark:text-white/90 sm:text-xl">
        {title}
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-black/50 dark:text-white/50">
        {text}
      </p>

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 dark:bg-red-600 dark:hover:bg-red-700"
        >
          <FaPlus size={13} />
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

export default NoDataIndicator;
