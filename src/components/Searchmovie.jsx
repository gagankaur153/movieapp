
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