"use client";
import { useState, useEffect } from "react";
import axiosPrivate from "@/app/api/axiosPrivate";
import { SerieDetail } from "@/types/serie";
import { Genre } from "@/types/genre";
import { MovieLoader } from "../../core/SheetLoader";
import SerieInfo from "./SerieInfo";
import SerieActors from "./SerieActors";
import SerieEpisodes from "./SerieEpisodes";
import { FaInfoCircle, FaUsers, FaListUl } from "react-icons/fa";
import { showToast } from "../Toast";
import { useSearchParams } from "next/navigation";

type TabId = "info" | "actors" | "episodes";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "info", label: "Info", icon: <FaInfoCircle size={15} /> },
  { id: "actors", label: "Actors", icon: <FaUsers size={15} /> },
  { id: "episodes", label: "Episodes", icon: <FaListUl size={15} /> },
];

function SerieSheet({ serieId }: { serieId: string | null }) {
  const [serie, setSerie] = useState<SerieDetail | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [trailerLoaded, setTrailerLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("info");
  const params = useSearchParams()
  const previewParam = params.get("preview")

  useEffect(() => {
    const fetchSerie = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/series/${serieId}`);
        setSerie(response.data.serie);
        setLoading(false);
      } catch (err) {
        showToast("error", "Error fetching serie");
      }
    };
    const fetchGenres = async () => {
      try {
        const response = await axiosPrivate.get("/series/genres");
        setGenres(response.data.genres);
      } catch (err) {
        console.error(err);
      }
    };
    setTrailerLoaded(false);
    fetchSerie();
    fetchGenres();
  }, [serieId]);

  useEffect(()=> {
    setActiveTab("info")
  },[previewParam])

  if (!serie || loading) return <MovieLoader />;

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 px-4 pt-3 sm:px-6">
        <div className="flex gap-1 rounded-xl bg-black/5 p-1 dark:bg-white/5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer sm:gap-2 sm:px-4 sm:text-sm ${
                activeTab === tab.id
                  ? "bg-background text-black shadow-sm dark:text-white"
                  : "text-black/50 hover:text-black/80 dark:text-white/50 dark:hover:text-white/80"
              }`}
            >
              <span className="shrink-0">{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1">
        {activeTab === "info" ? (
          <SerieInfo
            serie={serie}
            genres={genres || []}
            trailerLoaded={trailerLoaded}
            setTrailerLoaded={setTrailerLoaded}
          />
        ) : activeTab === "actors" ? (
          <SerieActors actors={serie.actors} />
        ) : (
          <SerieEpisodes serie={serie} />
        )}
      </div>
    </div>
  );
}

export default SerieSheet;
