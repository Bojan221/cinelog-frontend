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
