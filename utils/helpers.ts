export const getYearFromDate = (date?: string): string | null => {
    if (!date) return null;

    return String(new Date(date).getFullYear());
};