"use client";
import { useState, useEffect } from "react";
import axiosPrivate from "@/app/api/axiosPrivate";
import { Movie } from "@/types/movie";
import { Genre } from "@/types/genre";
import { MovieLoader } from "../core/SheetLoader";
import MovieInfo from "./MovieInfo";
import MovieActors from "./MovieActors";
import { FaInfoCircle, FaUsers } from "react-icons/fa";
import { showToast } from "./Toast";
import { useSearchParams } from "next/navigation";

type TabId = "info" | "actors";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "info", label: "Movie Info", icon: <FaInfoCircle size={15} /> },
  { id: "actors", label: "Movie Actors", icon: <FaUsers size={15} /> },
];

function MovieSheet({ movieId }: { movieId: string | null }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [trailerLoaded, setTrailerLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("info");
  const params = useSearchParams();
  const previewParam = params.get("preview")
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(
          `/movies/${movieId}`,
        );
        setMovie(response.data.movie);
        setLoading(false);
      } catch (err) {
        showToast("error","Error fetching movie")
      }
    };
    const fetchGenres = async () => {
      try {
        const response = await axiosPrivate.get("/movies/genres");
        setGenres(response.data.genres);
      } catch (err) {
        console.error(err);
      }
    };
      setTrailerLoaded(false);
      fetchMovie();
      fetchGenres();
  }, [movieId]);

  useEffect(()=> {
    setActiveTab("info")
  },[previewParam])

  if (!movie || loading) return <MovieLoader />;

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
          <MovieInfo
            movie={movie}
            genres={genres || []}
            trailerLoaded={trailerLoaded}
            setTrailerLoaded={setTrailerLoaded}
          />
        ) : (
          <MovieActors actors={movie.actors}  />
        )}
      </div>
    </div>
  );
}

export default MovieSheet;
