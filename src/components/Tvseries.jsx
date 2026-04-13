import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Createcontext from './context/Createcontext'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'
import { FaPlay} from "react-icons/fa";

const Tvseries = () => {

  const [alltvshows, setAlltvshows] = useState([])
  const [othershow, setOthershow] = useState([])
  const [homeshow, setHomeshow] = useState([])

  const { setDetail, setTvid } = useContext(Createcontext)

  // 🔥 Popular TV
  useEffect(() => {
    axios
      .get("https://tmdb.modiavii66.workers.dev/tv/popular?page=1")
      .then(res => setAlltvshows(res?.data?.results))
  }, [])

  useEffect(()=> {
      if(alltvshows){
        setHomeshow(alltvshows.slice(0,5))
      }
  
    },[alltvshows])

    console.log(homeshow)
  // 🔥 Airing Today
  useEffect(() => {
    axios
      .get("https://tmdb.modiavii66.workers.dev/tv/airing-today?page=1")
      .then(res => setOthershow(res?.data?.results))
  }, [])

  return (
    <div className="mt-16 sm:mt-20 px-2 border pb-30 md:px-5 bg-zinc-100 lg:px-10  min-h-screen">

      {/* 🔥 HERO */}
      <div className='lg:px-20'>
        <Swiper
       modules={[Autoplay]}
      slidesPerView={1}
      spaceBetween={3}
      loop={true}
      autoplay={{delay: 2000}}
      >
        {
          homeshow.length > 0 && (
            homeshow.map((data)=> (
               <SwiperSlide key={data.id} className=" relative">
                 <img src={data?.backdrop_path_full} alt="" className='w-full h-[200px] md:h-[300px] xl:h-[400px] object-cover' />
                 <NavLink to='/playmovie' onClick={()=>
                                 {
                 }}>
                                 <FaPlay className='absolute top-[40%] left-[50%] text-3xl  inset-0 z-50  text-white cursor-pointer'
                                
                               />
                              </NavLink>

      </SwiperSlide>

            ))
          )
        }

      </Swiper>



      </div>
      
     

      {/* 🔥 POPULAR */}
      <section className='px-6 sm:px-12 lg:px-24 mt-10'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4'>Popular Shows</h2>

        <div className='flex gap-4 overflow-x-scroll scrollbar-hide pb-2'>
          {alltvshows.map((data) => (
            <NavLink to='/tvdetail'
              key={data.id}
              onClick={() => {
                setTvid(data.id)
              }}
              className='cursor-pointer shrink-0 transform hover:scale-110 transition duration-300'
            >
              <img
                src={data?.poster_path_full}
                className='w-36 sm:w-40 rounded-lg shadow-md'
                alt=""
              />
            </NavLink>
          ))}
        </div>
      </section>

      {/* 🔥 AIRING TODAY */}
      <section className='px-6 sm:px-12 lg:px-24 mt-12'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4'>Airing Today</h2>

        <div className='flex gap-4 overflow-x-scroll scrollbar-hide pb-2'>
          {othershow.map((data) => (
            <article
              key={data.id}
              onClick={() => {
                setDetail(data)
                // setDisplay(true)
                setTvid(data.id)
              }}
              className='cursor-pointer shrink-0 transform hover:scale-110 transition duration-300'
            >
              <img
                src={data?.poster_path_full}
                className='w-36 sm:w-40 rounded-lg shadow-md'
                alt=""
              />
            
            </article>
          ))}
        </div>
      </section>

        {/* 🔥 POPUP */}
      {/* {display && detail && (
        <Tvpop detail={detail} />
      )} */}

    </div>
  )
}

export default Tvseries