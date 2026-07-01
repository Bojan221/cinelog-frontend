import Image from "next/image"


function MovieCard({movie}:{movie:any}) {
    const POST_URL = process.env.NEXT_PUBLIC_TMDB_POST_URL
    console.log(POST_URL)
  console.log(movie)
    return (
    <div>
        <Image alt={movie.id} width={200} height={300} src={`${POST_URL}${movie.poster_path}`} loading="eager"></Image>
    </div>
  )
}

export default MovieCard