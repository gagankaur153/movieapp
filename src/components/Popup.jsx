
import React, { useContext, useEffect, useState } from 'react'
import { MdCancel } from "react-icons/md";
import { FaPlay, FaStar } from "react-icons/fa";
import Createcontext from './context/Createcontext';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import Loader from './Loader';

const Popup = () => {


  const {
    detail,
    handledisplay,
    setDetail,
    setDisplay,
    similarid,
    tvid,
    seasonallepisode,
    loading, 
    setLoading
  } = useContext(Createcontext)

  const [popupmovie, setPopupmovie] = useState([])
  const [tvdata, setTvdata] = useState([])
 

  // Disable scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => document.body.style.overflow = "auto"
  }, [])

  // Fetch similar movies
  useEffect(() => {
    if (similarid) {
       setLoading(true)
      axios
        .get(`https://api.themoviedb.org/3/movie/${similarid}/similar?api_key=8feaa6410559e6461f3c6544a5ca30da`)
        .then(res => setPopupmovie(res.data.results))
        .finally(()=> setLoading(false))
    }else {
      axios.get(`https://api.themoviedb.org/3/tv/${tvid}?api_key=8feaa6410559e6461f3c6544a5ca30da`)
      .then(res=> {
         setTvdata(res?.data?.seasons)})
          .finally(()=> setLoading(false))
    }
  }, [similarid,tvid])
 

  // Genre map
  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    18: "Drama",
    14: "Fantasy",
    27: "Horror",
    878: "Sci-Fi",
    53: "Thriller",
    10749: "Romance",
    10751: "Family"
  }

  const genres = detail?.genre_ids?.map(id => genreMap[id])
 

  return (
    <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-4'>

      {/* MAIN CONTAINER */}
      <div className=' bg-white rounded-xl max-w-5xl w-full shadow-xl'>

        {/* IMAGE SECTION */}
        <div className='relative'>

          {/* Close Button */}
          <MdCancel
            className='absolute top-4 right-4 text-4xl text-white cursor-pointer hover:text-red-500 z-10'
            onClick={handledisplay}
          />

          {/* Banner */}
          <img
            src={`https://image.tmdb.org/t/p/original${detail?.backdrop_path}`}
            className='w-full h-75 sm:h-100 object-cover rounded-t-xl'
            alt=""
          />

          {/* Gradient */}
          <div className='absolute inset-0 bg-linear-to-t from-black/20 via-black/30 to-transparent'></div>

          {/* Play Button */}
          <NavLink
            to='/playmovie'
            // onClick={() => setDisplaymovie(true)}
            className='absolute bottom-6 left-6 flex items-center gap-2 
            bg-white text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold 
            hover:bg-gray-200 transition'
          >
            <FaPlay />
            Play
          </NavLink>

        </div>

        {/* DETAILS */}
        <div className='p-6 space-y-4'>

          {/* Title */}
          <h1 className='text-2xl sm:text-2xl font-semibold'>
            {detail?.title || detail?.name}
          </h1>

          {/* Genres */}
          <div className='flex flex-wrap gap-2'>{}
            {genres?.map((g) => (
              <span key={g} className='px-3 py-1 text-sm border border-gray-600 rounded-full text-gray-500'>
                {g}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className='text-gray-800 italic text-sm sm:text-base leading-relaxed'>
            {detail?.overview}
          </p>

          {/* Date */}
          <p className='text-gray-500 text-sm'>
            {detail?.release_date || detail?.first_air_date}
          </p>

        </div>

        {/* SIMILAR MOVIES */}
        <div className='p-6'>

          <h2 className='text-xl sm:text-2xl font-bold mb-4'>
            More Like This
          </h2>

          <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>

{loading ? (
  <Loader />
) : (
    popupmovie && (
             popupmovie?.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  setDetail(movie)
                  setDisplay(true)
                }}
                className='cursor-pointer border border-zinc-300 rounded-lg overflow-hidden 
                hover:scale-105 transition duration-300'
              >

                <img
                  src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
                  className='h-32 w-full object-cover'
                  alt=""
                />

                <div className='p-3 space-y-2'>

                  <div className='flex justify-between items-center'>
                    <p className='text-xs text-gray-800'>
                      {movie?.release_date}
                    </p>

                    <div className='flex items-center gap-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded'>
                      {movie?.vote_average?.toFixed(1)}
                      <FaStar />
                    </div>
                  </div>

                  <p className='text-sm text-gray-700 italic line-clamp-3'>
                    {movie?.overview}
                  </p>

                </div>

              </div>
            )))
 
)}
          
              </div>

              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>

            { tvdata && (tvdata?.map((movie) => (
              <NavLink to='/allepisode'
                key={movie.id}
                onClick={() => {
                  // setDetail(movie)
                  // setDisplay(true)
                  seasonallepisode(movie?.id, movie?.name)

                }}
                
                className='cursor-pointer bg-zinc-800 rounded-lg overflow-hidden 
                hover:scale-105 transition duration-300'
              >

                <img
                  src={`https://image.tmdb.org/t/p/w500${movie?.poster_path
}`}
                  className='h-32 w-full object-cover'
                  alt=""
                />

                <div className='p-3 space-y-2'>

                  <div className='flex justify-between items-center'>
                    <p className='text-xs text-gray-400'>
                      { movie?.air_date}
                    </p>
                     <p className='text-xs text-gray-400'>
                      {movie?.name}
                    </p>

                    <div className='flex items-center gap-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded'>
                      {movie?.vote_average?.toFixed(1)}
                      <FaStar />
                    </div>
                  </div>

                  <p className='text-sm text-gray-300 line-clamp-3'>
                    {movie?.overview}
                  </p>

                </div>

              </NavLink>
            )))}

          </div>

        

        </div>

      </div>
    </div>
  )
}

export default Popup