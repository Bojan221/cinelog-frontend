"use client";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import axiosPrivate from "@/app/api/axiosPrivate";
import { showToast } from "./Toast";

interface Props {
  mediaId: number;
  mediaType: "movie" | "tv";
  myVote: number | null;
}

function UserRating({ mediaId, mediaType, myVote }: Props) {
  const [value, setValue] = useState<number | null>(myVote ?? null);
  const [hasVoted, setHasVoted] = useState<boolean>(
    myVote !== null && myVote !== undefined,
  );
  const [saving, setSaving] = useState(false);

  const handleChange = async (newValue: number | null) => {
    if (newValue === null || saving) return;

    const prevValue = value;
    const wasVoted = hasVoted;

    // optimistic
    setValue(newValue);
    setHasVoted(true);
    setSaving(true);

    try {
      const url = wasVoted ? "/votes/update" : "/votes/add";
      await axiosPrivate.post(url, { mediaId, mediaType, vote: newValue });
      showToast("success", wasVoted ? "Rating updated" : "Rating saved");
    } catch {
      setValue(prevValue);
      setHasVoted(wasVoted);
      showToast("error", "Error saving your rating");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex shrink-0 flex-col items-end gap-1">
      <span className="text-xs font-medium text-black/50 dark:text-white/50">
        Your rating
      </span>
      <Rating
        name="user-rating"
        value={value}
        precision={0.5}
        size="large"
        disabled={saving}
        onChange={(_, newValue) => handleChange(newValue)}
        sx={{
          "& .MuiRating-iconEmpty": {
            color: "rgba(120,120,120,0.4)",
          },
          "& .MuiRating-iconFilled": {
            color: "#f59e0b",
          },
        }}
      />
    </div>
  );
}

export default UserRating;
