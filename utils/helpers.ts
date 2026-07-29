export const getYearFromDate = (date?: string): string | null => {
    if (!date) return null;

    return String(new Date(date).getFullYear());
};

export const timeAgo = (iso: string): string => {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ""
  const min = Math.max(0, Math.floor((Date.now() - then) / 60000))
  if (min < 1) return "just now"
  if (min < 60) return `${min}m ago`
  const hrs = Math.floor(min / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}