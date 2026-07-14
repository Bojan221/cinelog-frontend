import Image from "next/image";
import { ActorDetail } from "@/types/actor";
import { normalizeDate } from "@/utils/formatters";

interface Props {
  actor: ActorDetail;
}

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

const getAge = (birthday: string | null, deathday: string | null): number | null => {
  if (!birthday) return null;
  const start = new Date(birthday);
  const end = deathday ? new Date(deathday) : new Date();
  let age = end.getFullYear() - start.getFullYear();
  const m = end.getMonth() - start.getMonth();
  if (m < 0 || (m === 0 && end.getDate() < start.getDate())) age--;
  return age >= 0 ? age : null;
};

function ActorInfo({ actor }: Props) {
  const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL;
  const age = getAge(actor.birthday, actor.deathday);

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
  ];

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto px-4 py-3 thin-scrollbar sm:px-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
        <div className="mx-auto shrink-0 sm:mx-0">
          {actor.profile ? (
            <Image
              alt={actor.name}
              width={160}
              height={240}
              src={`${POST_URL}${actor.profile}`}
              className="h-60 w-40 rounded-lg border border-black/10 object-cover dark:border-white/20"
            />
          ) : (
            <div className="flex h-60 w-40 items-center justify-center rounded-lg border border-black/10 bg-black/5 text-sm text-black/40 dark:border-white/15 dark:bg-white/5 dark:text-white/40">
              No image
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black sm:text-3xl dark:text-white">
            {actor.name}
          </h2>

          <div className="flex flex-col divide-y divide-black/10 rounded-lg border border-black/10 text-sm dark:divide-white/10 dark:border-white/15">
            {details.map((d) => (
              <div key={d.label} className="flex items-start px-4 py-2.5">
                <span className="w-[40%] shrink-0 font-medium text-black/50 dark:text-white/50">
                  {d.label}
                </span>
                <span className="min-w-0 flex-1 text-black/80 dark:text-white/90">
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {actor.biography ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Biography
          </h3>
          <p className="whitespace-pre-line rounded-lg border border-black/10 bg-black/2 px-4 py-3 text-sm leading-relaxed text-black/70 dark:border-white/15 dark:bg-white/3 dark:text-white/80">
            {actor.biography}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Biography
          </h3>
          <p className="rounded-lg border border-black/10 bg-black/2 px-4 py-3 text-sm italic text-black/40 dark:border-white/15 dark:bg-white/3 dark:text-white/40">
            No biography available.
          </p>
        </div>
      )}
    </div>
  );
}

export default ActorInfo;
