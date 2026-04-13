import React, { useContext, useEffect, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import Createcontext from './context/Createcontext';
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const Tvpop = () => {

  const {
    detail,
    setDisplaymovie,
    tvid,
    setLoading,
    loading,
    selectedSeason,
   setSelectedSeason,
    setSelectepisode
  } = useContext(Createcontext)

  const [tvdata, setTvdata] = useState([])
  const [episodes, setEpisodes] = useState([])

  //  1. Fetch seasons
  useEffect(() => {
    if (!tvid) return

    setLoading(true)

    axios
      .get(`https://api.themoviedb.org/3/tv/${tvid}?api_key=8feaa6410559e6461f3c6544a5ca30da`)
      .then(res => {
        const totalSeasons = res?.data?.number_of_seasons || 0

        const seasonsArr = Array.from(
          { length: totalSeasons },
          (_, i) => i + 1
        )

        setTvdata(seasonsArr)

        if (totalSeasons > 0) {
          setSelectedSeason(totalSeasons)
        }
      })
      .finally(() => setLoading(false))

  }, [tvid])

  //  2. Fetch episodes when season changes
  useEffect(() => {
    if (!selectedSeason) return

    setLoading(true)

    axios
      .get(`https://api.themoviedb.org/3/tv/${tvid}/season/${selectedSeason}?api_key=8feaa6410559e6461f3c6544a5ca30da`)
      .then(res => {
        setEpisodes(res.data.episodes || [])
      })
      .finally(() => setLoading(false))

  }, [selectedSeason, tvid])

  //  Season click
  const handleSeasonClick = (season) => {
    setSelectedSeason(season)
    // setSelectedSeasonn(season) 
  }

  useEffect(() => { console.log("episode", episodes) }, [episodes])

  return (
    <div className=' mt-16 bg-zinc-100  sm:mt-20  min-h-screen text-black'>

     <div className=' bg-white lg:px-26 md:px-5 z-30 fixed w-full'>
       {/* Banner */}
      <div className='relative px-2'>
        <img
          src={`https://image.tmdb.org/t/p/original${detail?.backdrop_path}`}
          className='w-full h-45  sm:h-75 object-cover'
          alt=""
        />

        <NavLink
          to='/playmovie'
          onClick={() => setDisplaymovie(true)}
          className='absolute bottom-6 left-6 bg-white px-4 py-2 rounded flex items-center gap-2'
        >
          <FaPlay /> Play
        </NavLink>
      </div>

      {/* Title */}
      <div className=' px-2 sm:px-4 space-y-2'>
        <h1 className='text-2xl font-semibold'>{detail?.name}</h1>
        <p className='text-sm italic line-clamp-3'>{detail?.overview}</p>
      </div>

      {/* Seasons */}
      <div className='py-4'>

        <h2 className=' px-4 text-lg'>Episodes</h2>

        <div

          className='flex scrollbar-hide sm:gap-6 border-b border-b-zinc-400 overflow-x-auto mt-5'
        >
          {tvdata.map((season) => (
            <p
              key={season}   // ✅ FIXED
              onClick={() => handleSeasonClick(season)}
              className={`cursor-pointer pb-2 px-4 shrink-0 ${selectedSeason === season
                  ? "text-red-500 font-bold"
                  : "text-gray-600"
                }`}
            >
              Season {season}
            </p>
          ))}
        </div>
      </div>

     </div>
      {/* Episodes */}
      <div className='px-2 lg:px-28 md:px-5 sm:px-6 pt-100 sm:pt-40 md:pt-120 pb-6 space-y-6'>

        {loading && <p className='text-black'>Loading...</p>}

        {!loading && episodes.map((ep) => (
          <div key={ep.id} className='flex gap-4'>

            <div className='relative min-w-30 h-full sm:min-w-50 sm:h-30'>
              <img
                src={
                  ep.still_path
                    ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
                    : "https://via.placeholder.com/300x200"
                }
                className='w-full h-full object-cover rounded'
                alt=""
              />

              <NavLink to='/playmovie' onClick={() => {
                setSelectepisode(ep.episode_number)
              }} className='absolute inset-0 flex items-center justify-center'>
                <FaPlay className='text-white text-2xl opacity-80' />
              </NavLink>
            </div>

            <div>
              <h3 className='sm:text-lg text-zinc-800 font-semibold'>{ep.name}</h3>

              <p className='text-sm text-gray-500'>
                S{selectedSeason} E{ep.episode_number} • {ep.air_date}
              </p>

              <p className='text-sm line-clamp-3 text-gray-400'>
                {ep.overview || "No description available"}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Tvpop