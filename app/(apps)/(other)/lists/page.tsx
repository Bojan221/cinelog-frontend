import { Suspense } from "react"
import MyListsLoader from "@/components/common/movies/MyListsLoader"
import { serverFetch,requireServerAuth } from "@/app/api/serverFetch"
import PublicLists from "@/components/common/lists/PublicLists"
import { List } from "@/types/list"
function page() {
  return (
    <Suspense fallback={<MyListsLoader/>}>
      <PublicList/>
    </Suspense>
  )
}

export default page

async function PublicList () { 
  await requireServerAuth();

  let listData: { lists: List[] } = { lists: [] }
  try {
    listData = await serverFetch<{ lists: List[] }>('/lists/public');
  }catch(err) {
    console.error(err)
  }
  return (
    <PublicLists lists={listData.lists ?? []}/>
  )
}