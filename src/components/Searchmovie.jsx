// import React, { useContext, useEffect } from 'react'
// import Createcontext from './context/Createcontext'

// const Searchmovie = () => {
//     const {searchmovie, search} = useContext(Createcontext)
//   useEffect(()=>{
//     if(search){
//  console.log("search movie display",searchmovie)
//     }
    
   
//   },[search])
 
//   return (
//    <>
//     {
//       searchmovie && 
//        (
//         searchmovie.map((data)=>(
//           <div className=' bg-gray-800 h-100 fixed right-20 z-50 w-100' key={data.id}>
//         <img src={`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`} className='w-40 h-20' alt="" />
//         <p>{ data?.tittle || data?.name}</p>
//        </div>
//         ))
//        )

      
//     }</>
   
//   )
// }

// export default Searchmovie

import React, { useContext } from 'react'
import Createcontext from './context/Createcontext'

const Searchmovie = () => {
  const { searchmovie, search, setDetail, setDisplay, setSearch } = useContext(Createcontext)

  // hide if no search
  if (!search) return null

  return (
    <div className='absolute top-16 right-5 sm:right-20 w-[90%] sm:w-100 
                    max-h-100 overflow-y-scroll bg-gray-900 text-white 
                    rounded-xl shadow-lg z-50 p-2'>

      {
        searchmovie?.length > 0 ? (
          searchmovie.map((data) => (
            <div
              key={data.id}
              onClick={() => {
                setDetail(data)
                setDisplay(true)
                setSearch("")
              }}
              className='flex gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer'
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${data?.poster_path}`}
                className='w-12 h-16 rounded-md'
                alt=""
              />

              <div>
                <h2 className='text-sm font-semibold'>
                  {data.title || data.name}
                </h2>
                <p className='text-xs text-gray-400'>
                  {data.release_date || data.first_air_date}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-400 py-4'>No results found</p>
        )
      }

    </div>
  )
}

export default Searchmovie