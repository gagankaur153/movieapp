


import React, { useContext, useEffect, useState, useRef } from 'react'
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

        //  last season default select
        if (totalSeasons > 0) {
          setSelectedSeason(totalSeasons)
          // setSelectedSeasonn(totalSeasons) 
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
    <div className='text-black'>

      {/* Banner */}
      <div className='relative'>
        <img
          src={`https://image.tmdb.org/t/p/original${detail?.backdrop_path}`}
          className='w-full h-75 object-cover'
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
      <div className='p-4 space-y-2'>
        <h1 className='text-2xl font-semibold'>{detail?.name}</h1>
        <p className='text-sm italic'>{detail?.overview}</p>
      </div>

      {/* Seasons */}
      <div className='p-4'>

        <h2 className='text-lg'>Episodes</h2>

        <div

          className='flex scrollbar-hide gap-6 overflow-x-auto mt-5'
        >
          {tvdata.map((season) => (
            <p
              key={season}   // ✅ FIXED
              onClick={() => handleSeasonClick(season)}
              className={`cursor-pointer pb-2 shrink-0 ${selectedSeason === season
                  ? "text-red-500 font-bold"
                  : "text-gray-600"
                }`}
            >
              Season {season}
            </p>
          ))}
        </div>
      </div>

      {/* Episodes */}
      <div className='px-6 pb-6 space-y-6'>

        {loading && <p>Loading...</p>}

        {!loading && episodes.map((ep) => (
          <div key={ep.id} className='flex gap-4'>

            <div className='relative min-w-50 h-30'>
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
              <h3 className='text-lg font-semibold'>{ep.name}</h3>

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