import React, { useContext } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import Createcontext from './context/Createcontext';
import Searchmovie from './Searchmovie';
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const { setSearch, search,sidebardisplay, setSidebardisplay } = useContext(Createcontext)
        const handleclick= ()=>{
            setSidebardisplay(!sidebardisplay)
        }

  return (
   <>
    <div className='w-full h-16 sm:h-20 shadow-2xl  bg-white
    fixed top-0 z-50 px-2 lg:px-26 sm:px-10 flex items-center gap-4 sm:justify-between '>

      {/* Left Section */}
      <div className='lg:hidden'>
        {
          !sidebardisplay ? (
             <IoReorderThreeOutline
          onClick={handleclick}
          className='lg:hidden text-4xl transition duration-75
           text-black cursor-pointer hover:text-red-500'
        />

          ) :
          (
            <RxCross2
             onClick={handleclick}
          className='lg:hidden text-3xl transition duration-75 text-black cursor-pointer hover:text-red-500'
           />

          )
        }
       
      </div>

     <div>
        <h1 className='text-red-600 text-xl sm:text-2xl font-extrabold tracking-wide cursor-pointer'>
          NovaFlix
        </h1>
     </div>

      {/* Center Menu */}
      <div className='hidden lg:flex gap-8 text-gray-800 font-medium'>
        <NavLink to='/' className='hover:text-red-500 transition'>Movies</NavLink>
        {/* <span className='hover:text-white cursor-pointer'>Movies</span> */}
        <NavLink to='/tvseries' className='hover:text-red-500 transition'>Series</NavLink>
        <span className='hover:text-red-500 cursor-pointer'>New & Popular</span>
      </div>

      {/* Search */}
      <div className='relative hidden md:flex'>
        <input
          type="search"
          value={search}
          placeholder='Search movies...'
          onChange={(e) => setSearch(e.target.value)}
          className=' text-sm px-4 py-2 border border-zinc-300 rounded-full w-48 sm:w-64 
          focus:outline-none focus:ring-2 focus:ring-red-500 transition'
        />

       

        {/* Search Dropdown */}
        <Searchmovie />
      </div>

       <div className='md:hidden flex'>
         <input type="search" placeholder='search movies ...' className='  border border-red-300 shadow-2xl focus:outline-none w-full  rounded-2xl px-4 py-1'  value={search}
          onChange={(e) => setSearch(e.target.value)} />

           <Searchmovie />
       </div>

    

    </div>
    </>
  )
}

export default Navbar