import { Suspense } from "react";
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import MovieListLoader from "@/components/core/Loading";
import MyLists from "@/components/common/movies/MyLists";
import { Movie } from "@/types/movie";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function page() {
  return (
    <Suspense fallback={<MovieListLoader firstLoad />}>
      <MyMovieLists />
    </Suspense>
  );
}

async function MyMovieLists() {
  await requireServerAuth();
  let lists={lists:[]}
  try {
   lists = await serverFetch("/movies/lists/myLists");
  } catch (err) {
    console.error(err);
  }

  return <MyLists lists={lists}/>;
}
