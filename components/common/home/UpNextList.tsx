"use client";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import axiosPrivate from "@/app/api/axiosPrivate";
import { showToast } from "../Toast";
import MediaRail from "./MediaRail";
import UpNextCard, { UpNextItem } from "./UpNextCard";

function UpNextList({ initial }: { initial: UpNextItem[] }) {
  const [items, setItems] = useState<UpNextItem[]>(initial);
  const [busyId, setBusyId] = useState<number | null>(null);

  if (!items.length) return null;

  const markWatched = async (item: UpNextItem) => {
    const code = `S${String(item.seasonNumber).padStart(2, "0")}E${String(
      item.episodeNumber
    ).padStart(2, "0")}`;
    setBusyId(item.tmdbId);
    try {
      await axiosPrivate.post(`/series/${item.tmdbId}/episodes/watched`, {
        seasonNumber: item.seasonNumber,
        episodeNumber: item.episodeNumber,
        poster: item.still,
      });
      // Refetch so the next unwatched episode surfaces immediately.
      const { data } = await axiosPrivate.get<{ upNext: UpNextItem[] }>(
        "/dashboards/upNext"
      );
      setItems(data.upNext ?? []);
      showToast("success", `${item.serieTitle} ${code} marked as watched`);
    } catch {
      showToast("error", "Failed to update episode");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <MediaRail
      title="Up Next"
      icon={<FaPlay className="text-[18px] text-emerald-400" />}
    >
      {items.map((item) => (
        <UpNextCard
          key={item.tmdbId}
          item={item}
          busy={busyId === item.tmdbId}
          onMarkWatched={() => markWatched(item)}
        />
      ))}
    </MediaRail>
  );
}

export default UpNextList;
