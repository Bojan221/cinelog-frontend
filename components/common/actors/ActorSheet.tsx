"use client";
import { useState, useEffect } from "react";
import axiosPrivate from "@/app/api/axiosPrivate";
import { ActorDetail } from "@/types/actor";
import { MovieLoader } from "../../core/SheetLoader";
import ActorInfo from "./ActorInfo";
import ActorCredits from "./ActorCredits";
import { FaInfoCircle, FaFilm } from "react-icons/fa";
import { showToast } from "../Toast";
import { useSearchParams } from "next/navigation";

type TabId = "info" | "credits";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "info", label: "Info", icon: <FaInfoCircle size={15} /> },
  { id: "credits", label: "Filmography", icon: <FaFilm size={15} /> },
];

function ActorSheet({ actorId }: { actorId: string | null }) {
  const [actor, setActor] = useState<ActorDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("info");
  const params = useSearchParams();
  const previewParam = params.get("preview");

  useEffect(() => {
    const fetchActor = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/actors/${actorId}`);
        setActor(response.data.actor);
      } catch {
        showToast("error", "Error fetching actor");
      } finally {
        setLoading(false);
      }
    };
    if (actorId) fetchActor();
  }, [actorId]);

  useEffect(() => {
    setActiveTab("info");
  }, [previewParam]);

  if (!actor || loading) return <MovieLoader />;

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 px-4 pt-3 sm:px-6">
        <div className="flex gap-1 rounded-xl bg-black/5 p-1 dark:bg-white/5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-background text-black shadow-sm dark:text-white"
                  : "text-black/50 hover:text-black/80 dark:text-white/50 dark:hover:text-white/80"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1">
        {activeTab === "info" ? (
          <ActorInfo actor={actor} />
        ) : (
          <ActorCredits
            movieCredits={actor.movieCredits}
            tvCredits={actor.tvCredits}
          />
        )}
      </div>
    </div>
  );
}

export default ActorSheet;
