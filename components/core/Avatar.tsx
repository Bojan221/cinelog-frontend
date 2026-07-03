import { getInitials } from "@/utils/formatters";
import Image from "next/image";

interface AvatarProps {
  size: "sm" | "md" | "lg" | "xl";
  fullName: string;
  profilePicture?: string;
}

function Avatar({ size, fullName, profilePicture }: AvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs flex-shrink-0",
    md: "w-8 h-8 text-sm flex-shrink-0",
    lg: "w-10 h-10 text-base flex-shrink-0",
    xl: "w-14 h-14 text-2xl flex-shrink-0",
  };

  const textClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  if (!fullName) {
    return (
      <div className="flex gap-2 items-center">
        <div className={`rounded-full bg-foreground/10 animate-pulse ${sizeClasses[size]}`} />
        <div className="h-4 w-24 rounded bg-foreground/10 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      {profilePicture ? (
        <Image src={profilePicture} alt={fullName} />
      ) : (
        <div className={`bg-red-300/80 rounded-full flex items-center justify-center text-center ${sizeClasses[size]}`}>
          {getInitials(fullName)}
        </div>
      )}
      <span className={`font-medium text-foreground/80 truncate ${textClasses[size]}`}>
        {fullName}
      </span>
    </div>
  );
}

export default Avatar;
