import { format, isValid, parseISO } from "date-fns";

export const getInitials = (fullName: string): string => {
  if (!fullName) return "";

  const words = fullName.split(" ");
  let initialsArr: string[];
  let initials: string;
  if (words.length === 1) {
    initialsArr = fullName
      .split("")
      .slice(0, 2)
      .map((initial) => initial.charAt(0).toUpperCase());
    initials = initialsArr.join("");
  } else {
    initialsArr = words
      .slice(0, 2)
      .map((initial) => initial.charAt(0).toUpperCase());
    initials = initialsArr.join("");
  }

  return initials;
};

export const normalizeDate = (date: string | number | Date): string => {
  const parsed = typeof date === "string" ? parseISO(date) : new Date(date);

  if (!isValid(parsed)) return "";

  return format(parsed, "MMMM d, yyyy");
};

export const formatRate = (rate: number): number | null => {
  const rating = typeof rate === "number" ? Math.round(rate * 10) / 10 : null;
  return rating;
};
