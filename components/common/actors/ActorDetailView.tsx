import Image from "next/image";
import { FaFilm } from "react-icons/fa6";
import {
  FaImdb,
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaGlobe,
} from "react-icons/fa6";
import { ActorDetail } from "@/types/actor";
import { normalizeDate } from "@/utils/formatters";
import ActorCredits from "./ActorCredits";
import ActorPhotos from "./ActorPhotos";

const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;

const genderLabel = (gender: number): string => {
  switch (gender) {
    case 1:
      return "Female";
    case 2:
      return "Male";
    case 3:
      return "Non-binary";
    default:
      return "-";
  }
};

const getAge = (
  birthday: string | null,
  deathday: string | null
): number | null => {
  if (!birthday) return null;
  const start = new Date(birthday);
  const end = deathday ? new Date(deathday) : new Date();
  let age = end.getFullYear() - start.getFullYear();
  const m = end.getMonth() - start.getMonth();
  if (m < 0 || (m === 0 && end.getDate() < start.getDate())) age--;
  return age >= 0 ? age : null;
};

function buildLinks(actor: ActorDetail) {
  const ext = actor.externalIds;
  const links: { label: string; url: string; icon: React.ReactNode }[] = [];

  if (actor.homepage)
    links.push({
      label: "Website",
      url: actor.homepage,
      icon: <FaGlobe size={16} />,
    });
  if (ext?.imdb || actor.imdbId)
    links.push({
      label: "IMDb",
      url: `https://www.imdb.com/name/${ext?.imdb ?? actor.imdbId}`,
      icon: <FaImdb size={18} />,
    });
  if (ext?.instagram)
    links.push({
      label: "Instagram",
      url: `https://instagram.com/${ext.instagram}`,
      icon: <FaInstagram size={16} />,
    });
  if (ext?.twitter)
    links.push({
      label: "X",
      url: `https://x.com/${ext.twitter}`,
      icon: <FaXTwitter size={15} />,
    });
  if (ext?.tiktok)
    links.push({
      label: "TikTok",
      url: `https://www.tiktok.com/@${ext.tiktok}`,
      icon: <FaTiktok size={15} />,
    });
  if (ext?.facebook)
    links.push({
      label: "Facebook",
      url: `https://facebook.com/${ext.facebook}`,
      icon: <FaFacebookF size={15} />,
    });
  if (ext?.youtube)
    links.push({
      label: "YouTube",
      url: `https://www.youtube.com/${ext.youtube}`,
      icon: <FaYoutube size={16} />,
    });

  return links;
}

function ActorDetailView({ actor }: { actor: ActorDetail }) {
  const age = getAge(actor.birthday, actor.deathday);
  const links = buildLinks(actor);

  const details: { label: string; value: string }[] = [
    { label: "Known For", value: actor.knownForDepartment || "-" },
    { label: "Gender", value: genderLabel(actor.gender) },
    {
      label: "Birthday",
      value: actor.birthday
        ? `${normalizeDate(actor.birthday)}${
            !actor.deathday && age !== null ? ` (${age} years old)` : ""
          }`
        : "-",
    },
    ...(actor.deathday
      ? [
          {
            label: "Died",
            value: `${normalizeDate(actor.deathday)}${
              age !== null ? ` (aged ${age})` : ""
            }`,
          },
        ]
      : []),
    { label: "Place of Birth", value: actor.placeOfBirth || "-" },
    ...(actor.popularity
      ? [{ label: "Popularity", value: actor.popularity.toFixed(1) }]
      : []),
    ...(actor.alsoKnownAs?.length
      ? [{ label: "Also Known As", value: actor.alsoKnownAs.join(" · ") }]
      : []),
  ];

  return (
    <div className="flex w-full flex-col gap-12 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <div className="mx-auto shrink-0 sm:mx-0">
          {actor.profile ? (
            <Image
              alt={actor.name}
              width={240}
              height={360}
              src={`${POST_URL}${actor.profile}`}
              className="w-48 rounded-2xl border border-black/10 shadow-xl shadow-black/20 sm:w-60 dark:border-white/15"
            />
          ) : (
            <div className="flex h-72 w-48 items-center justify-center rounded-2xl border border-black/10 bg-black/5 text-sm text-black/40 sm:w-60 dark:border-white/15 dark:bg-white/5 dark:text-white/40">
              No image
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-black sm:text-5xl dark:text-white">
            {actor.name}
          </h1>

          {/* Social / external links */}
          {links.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-1.5 text-sm font-medium text-black/70 transition-colors hover:border-black/25 hover:bg-black/5 hover:text-black dark:border-white/15 dark:text-white/70 dark:hover:border-white/30 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {l.icon}
                  {l.label}
                </a>
              ))}
            </div>
          ) : null}

          <div className="flex flex-col divide-y divide-black/10 rounded-xl border border-black/10 text-sm dark:divide-white/10 dark:border-white/15">
            {details.map((d) => (
              <div key={d.label} className="flex items-start gap-4 px-4 py-2.5">
                <span className="w-[35%] shrink-0 font-medium text-black/50 dark:text-white/50">
                  {d.label}
                </span>
                <span className="min-w-0 flex-1 text-black/80 dark:text-white/90">
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Biography */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
          Biography
        </h2>
        {actor.biography ? (
          <p className="max-w-3xl whitespace-pre-line text-[15px] leading-relaxed text-black/70 dark:text-white/80">
            {actor.biography}
          </p>
        ) : (
          <p className="text-sm italic text-black/40 dark:text-white/40">
            No biography available.
          </p>
        )}
      </section>

      {/* Photos */}
      <ActorPhotos images={actor.images} name={actor.name} />

      {/* Filmography */}
      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-black dark:text-white">
          <FaFilm className="text-[18px] text-indigo-500 dark:text-red-400" />
          Filmography
        </h2>
        <ActorCredits
          bare
          movieCredits={actor.movieCredits}
          tvCredits={actor.tvCredits}
        />
      </section>
    </div>
  );
}

export default ActorDetailView;
