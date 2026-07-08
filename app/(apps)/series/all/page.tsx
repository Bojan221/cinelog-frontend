import { Suspense } from "react";
import MovieListLoader from "@/components/core/Loading";
import { serverFetch,requireServerAuth } from "@/app/api/serverFetch";
import SerieList from "@/components/common/series/SerieList";

export default function page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <Suspense fallback={<MovieListLoader firstLoad/>}>
      <TvShowList searchParams={searchParams} />
    </Suspense>
  );
}

async function TvShowList({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
    await requireServerAuth();
      const resolvedSearchParams = await searchParams;
  const defaultParams = {
    page: "1",
  };
  const params = { ...defaultParams, ...resolvedSearchParams };
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value);
    }
  });

    let seriesData = {page: 0,series:[], totalPages:0}
    try {
        seriesData = await serverFetch(`/series?${queryParams.toString()}`)
    }catch(err) { 
        console.error(err)
    }
    
  return <SerieList seriesData={seriesData}/>;
}
