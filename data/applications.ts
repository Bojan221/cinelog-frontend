import type { IconType } from "react-icons";
import { FaRegBookmark, FaRegHeart, FaList } from "react-icons/fa";
import { FaRegCircleCheck, FaRegCalendar, FaChartColumn, FaGear } from "react-icons/fa6";
import { RiProgress5Line } from "react-icons/ri";

export interface AppPage {
  name: string;
  link: string;
  icon: IconType;
}

export interface AppGroup {
  name: string;
  pages: AppPage[];
}

export const applications: AppGroup[] = [
  {
    name: "Movies",
    pages: [
      {
        name: "Watched",
        link: "/movies/watched",
        icon: FaRegCircleCheck,
      },
      {
        name: "Watch List",
        link: "/movies/watchlist",
        icon: FaRegBookmark,
      },
      {
        name: "Favorites",
        link: "/movies/favorites",
        icon: FaRegHeart,
      },
      {
        name: "My Lists",
        link: "/movies/lists",
        icon: FaList,
      },
    ],
  },
  {
    name: "Series",
    pages: [
      {
        name: "Watched",
        link: "/series/watched",
        icon: FaRegCircleCheck,
      },
      {
        name: "Watching",
        link: "/series/watching",
        icon: RiProgress5Line,
      },
      {
        name: "Watch List",
        link: "/series/watchlist",
        icon: FaRegBookmark,
      },
      {
        name: "Favorites",
        link: "/series/favorites",
        icon: FaRegHeart,
      },
      {
        name: "My Lists",
        link: "/series/lists",
        icon: FaList,
      },
    ],
  },
  {
    name: "Other",
    pages: [
      {
        name: "Calendar",
        link: "/other/calendar",
        icon: FaRegCalendar,
      },
      {
        name: "Stats",
        link: "/other/stats",
        icon: FaChartColumn,
      },
      {
        name: "Settings",
        link: "/other/settings",
        icon: FaGear,
      },
    ],
  },
];
