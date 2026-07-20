import { formatRate } from "@/utils/formatters";

const ratingColor = (vote: number): string => {
  if (vote >= 7) return "#22c55e";
  if (vote >= 5) return "#f59e0b";
  return "#ef4444";
};

function RatingRing({ vote, voteCount }: { vote: number; voteCount: number }) {
  const pct = Math.round(vote * 10);
  const color = ratingColor(vote);
  return (
    <div className="flex items-center gap-3">
      <div
        className="grid h-14 w-14 shrink-0 place-items-center rounded-full"
        style={{
          background: `conic-gradient(${color} ${pct * 3.6}deg, rgba(120,120,120,0.25) 0deg)`,
        }}
      >
        <div className="grid h-11 w-11 place-items-center rounded-full bg-background">
          <span className="text-sm font-bold text-black dark:text-white">
            {formatRate(vote)}
          </span>
        </div>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-black/80 dark:text-white/90">
          TMDB Rating
        </span>
        <span className="text-xs text-black/40 dark:text-white/40">
          {voteCount.toLocaleString()} votes
        </span>
      </div>
    </div>
  );
}

export default RatingRing;
