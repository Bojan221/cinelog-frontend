import type { IconType } from "react-icons";
import { FaRegBookmark, FaRegHeart, FaList } from "react-icons/fa";
import {
  FaRegCircleCheck,
  FaRegCalendar,
  FaChartColumn,
  FaGear,
} from "react-icons/fa6";
import { RiProgress5Line } from "react-icons/ri";
import { BsCollectionPlayFill } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineForum } from "react-icons/md";

export interface AppPage {
  name: string;
  link: string;
  icon: IconType;
}

export interface AppGroup {
  name: string;
  filter: "movies" | "series" | "other";
  pages: AppPage[];
}

export const applications: AppGroup[] = [
  {
    name: "Movies",
    filter: "movies",
    pages: [
      {
        name: "All Movies",
        link: "/movies/all",
        icon: BsCollectionPlayFill,
      },
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
    filter: "series",
    pages: [
      {
        name: "All Series",
        link: "/series/all",
        icon: BsCollectionPlayFill,
      },
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
    filter: "other",
    pages: [
      {
        name: "Actors",
        link: "/actors",
        icon: IoPersonSharp,
      },
      {
        name: "Public Lists",
        link: "/lists",
        icon: FaList,
      },
      {
        name: "Forum",
        link: "/forum",
        icon: MdOutlineForum ,
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
