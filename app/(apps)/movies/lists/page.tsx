import { Suspense } from "react";
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import MyListsLoader from "@/components/common/movies/MyListsLoader";
import MyLists from "@/components/common/movies/MyLists";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function page() {
  return (
    <Suspense fallback={<MyListsLoader />}>
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
