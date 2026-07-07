import {Suspense} from 'react';
import { serverFetch, requireServerAuth } from "@/app/api/serverFetch";
import MovieListLoader from '@/components/core/Loading';
export default function page() {
  return (
    <Suspense fallback={<MovieListLoader/>}>
      <WatchMovieList/>
    </Suspense>
  )
}

async function WatchMovieList(){
  
    await requireServerAuth();
      try {
    const moviesData = await serverFetch('/movies/lists/Watchlist');
      console.log(moviesData)
  } catch (err) {
    console.error(err);
  }

  return(<div></div>)
} 