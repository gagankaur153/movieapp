

import React, { useContext, useEffect, useState } from 'react'
import Createcontext from './context/Createcontext'
import Popup from './Popup'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { FaPlay} from "react-icons/fa";

const MainContent = () => {
const [homemovie, setHomemovie] = useState([])
const [upcoming, setUpcoming] = useState([])


  const [Toprated, setToprated] = useState([])

  const {
    detail,
    setDetail,
    display,
    setDisplay,
    movies,
    setSimilarid,
    setLoading,
    loading,
    setTvid
  } = useContext(Createcontext)

  useEffect(()=> {
    if(movies){
      setHomemovie(movies.slice(0,5))
    }

  },[movies])


  useEffect(() => {
  setLoading(true);
  axios
    .get("https://tmdb.modiavii66.workers.dev/tv/popular?page=1")
    .then(res => setToprated(res.data.results))
    .finally(() => setLoading(false));
}, []);

 useEffect(() => {
  setLoading(true);
  axios
    .get("https://tmdb.modiavii66.workers.dev/movies/upcoming?page=1")
    .then(res => setUpcoming(res.data.results))
    .finally(() => setLoading(false));
}, []);


  // Fetch Top Rated TV
  // useEffect(() => {
  //   setLoading(true);

  //   fetch("https://tmdb.modiavii66.workers.dev/tv/popular?page=1")
  //     .then((res) => res.json())
  //     .then((data) => setToprated(data.results))
  // }, [])

  

  return (
    <div className="mt-16 px-2 md:px-5 bg-zinc-100 lg:px-10 sm:mt-20  min-h-screen">

      {/* 🔥 HERO SECTION */}
    <div className=' lg:px-20'>
        <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      spaceBetween={3}
      loop={true}
      autoplay={{delay: 2000}}
     >
           {
        homemovie && (
          homemovie.map((data)=> (
            <SwiperSlide key={data.id} className='relative'>
                <img src={data?.backdrop_path_full} alt="" className='w-800 md:h-50  xl:h-80 2xl:h-100' />
                <NavLink to='/playmovie' onClick={()=>
                 {
                  setDetail(data)}}>
                 <FaPlay className='absolute top-[40%] left-[50%] text-3xl  inset-0 z-50  text-white cursor-pointer'
                
               />
              </NavLink>
               
            </SwiperSlide>
           

          ))
        )
      }

      </Swiper>
    </div>
     <div className='flex'>
    
     </div>
    
      {/* 🔥 TRENDING SECTION */}
      <section className='px-2 sm:px-5 lg:px-20 mt-10'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4 tracking-wide'>
          Trending Now
        </h2>

        <div className='flex gap-4 overflow-x-scroll scrollbar-hide pb-2'>
           {loading ? (
  <Loader />
) : ( movies?.map((data) => (
            <article
              key={data.id}
              onClick={() => {
                setDetail(data)
                setDisplay(true)
                setSimilarid(data.id)
              }}
              className='cursor-pointer shrink-0 transform hover:scale-110 transition duration-300'
            >
              <img
                src={data?.poster_path_full}
                alt=""
                className='w-36 sm:w-40 rounded-lg shadow-md'
              />
            
            </article>
          )))}
         
        </div>
      </section>

      {/* 🔥 TOP RATED SECTION */}
      <section className='px-2 sm:px-5 lg:px-20 mt-12'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4 tracking-wide'>
          Top Rated Shows
        </h2>

        <div className='flex gap-4 overflow-x-scroll scrollbar-hide pb-2'>
          {loading ? (
  <Loader />
) : (
   Toprated?.map((data) => (
            <NavLink to='/tvdetail'
              key={data.id}
              onClick={() => {
                setTvid(data.id)
              }}
              className='cursor-pointer shrink-0 transform hover:scale-110 transition duration-300'
            >
              <img
                src={data?.poster_path_full}
                alt=""
                className='w-36 sm:w-40 rounded-lg shadow-md'
              />
            </NavLink>
          ))
)}
          {/* {Toprated?.map((data) => (
            <article
              key={data.id}
              onClick={() => {
                setDetail(data)
                setDisplay(true)
                setSimilarid(data.id)
              }}
              className='cursor-pointer shrink-0 transform hover:scale-110 transition duration-300'
            >
              <img
                src={data?.poster_path_full}
                alt=""
                className='w-36 sm:w-40 rounded-xl shadow-lg'
              />
              <h3 className='mt-2 text-sm font-medium line-clamp-2'>
                {data?.title || data?.name}
              </h3>
            </article>
          ))} */}
        </div>
      </section>


{/* upcoming movie */}  
<section className='px-2 sm:px-5 lg:px-20 mt-10'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4 tracking-wide'>
         Upcoming Now
        </h2>

        <div className='flex gap-4 overflow-x-scroll scrollbar-hide pb-2'>
           {loading ? (
  <Loader />
) : ( upcoming?.map((data) => (
            <article
              key={data.id}
              onClick={() => {
                setDetail(data)
                setDisplay(true)
                setSimilarid(data.id)
              }}
              className='cursor-pointer shrink-0 transform hover:scale-110 transition duration-300'
            >
              <img
                src={data?.poster_path_full}
                alt=""
                className='w-36 sm:w-40 rounded-lg shadow-md'
              />
            
            </article>
          )))}
         
        </div>
      </section>

      {/* 🔥 POPUP */}
      {display && detail && (
        <Popup detail={detail} />
      )}

    </div>
  )
}

export default MainContent