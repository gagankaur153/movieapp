import React from 'react'
import {  FaCirclePlay  } from "react-icons/fa6";

const Footer = () => {
  return (
   <>
   <div className='bg-zinc-900 space-y-10  py-10 lg:px-20 px-6 sm:px-5'>
     <div className='sm:flex gap-10 text-white   bottom-0 '>
       <div className='space-y-3 relative sm:w-200'>
         <div className='bg-zinc-800 inline-block'>
            <h1 className='text-4xl'>
               NOVAMOVIES
            </h1>
            <div className='absolute left-[20%] top-[1%]  '>
               <FaCirclePlay className='text-red-600 bg-red-50 rounded-full text-5xl border-zinc-400 border' />
            </div>
            <p className='text-sm font-medium'>watch your favorite movies online </p>
        </div>
        <div className=''>
            <p className=''>Novamovies - Watch Free Movies and TV Shows Online « novamovies</p>
        </div>

       <div>
         <p className='text-xs text-zinc-500'>Novamovies Watch Latest Movies,TV Series Online for free and Download in HD on Novamovies website,Novamovies Bollywood,Novamovies app,Novamovies online.</p>
       </div>
       </div>

       <div className='space-y-4 font-semibold'>
        <h1>Novamovies - Watch Free Movies and TV Shows Online « novamovies</h1>
       <p className='text-zinc-300 text-sm'>
        Prmovies Watch Latest Movies,TV Series Online for free and Download in HD on Prmovies website,Prmovies Bollywood,Prmovies app,Prmovies online.
       </p>
       </div>

    </div>

    <div className='sm:flex gap-2 grid grid-cols-2 sm:gap-5 lg:justify-center lg:gap-8 sm:px-5'>
        <p className='border text-sm border-zinc-700 rounded-full text-zinc-500 px-4 bg-zinc-800'>novamovies online</p>
        <p className='border text-sm border-zinc-700 rounded-full text-zinc-500 px-4 bg-zinc-800'>novamovies free</p>
        <p className='border text-sm border-zinc-700 rounded-full text-zinc-500 px-4 bg-zinc-800'>novamoies website</p>
        <p className='border text-sm border-zinc-700 rounded-full text-zinc-500 px-4 bg-zinc-800'>novamies Bollywood</p>

    </div>
   </div>
   </>
  )
}

export default Footer