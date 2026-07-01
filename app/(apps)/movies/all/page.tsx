'use client'

import {useState, useEffect} from 'react';
import axiosPrivate from '@/app/api/axiosPrivate';
import PaginationRounded from '@/components/common/Pagination';
import MovieCard from '@/components/common/MovieCard';

function page() {
  
  const[movies,setMovies]= useState<any[]>([])

  useEffect(()=> { 
    const fetchMovies = async() => {
      try {
        const response = await axiosPrivate.get('/movies/allMovies');
        setMovies(response.data.data.results)
        
      } catch (error) {
        console.log(error)
      } 
    }
    fetchMovies()
  },[])  
  return (
    <div className='grid grid-cols-10 gap-4'>
      {movies && movies.map((movie:any) => { 
        return (<MovieCard movie={movie} key={movie.id}/>)
      })}
    </div>
  )
}

export default page