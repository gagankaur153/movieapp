
import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ sidebardisplay, setDisplay }) => {
  return (
    <>
      {sidebardisplay && (
        <div
          className="fixed  w-full h-screen bg-white backdrop-blur-md 
          z-50 flex flex-col pt-10  px-8  lg:hidden"
        >

          {/* Menu */}
          <NavLink
            to="/"
            onClick={() => setDisplay(false)}
            className="text-xl py-4 border-b border-gray-700 hover:text-red-500"
          >
            Home
          </NavLink>

          <NavLink to='/' onClick={()=> setDisplay(false)} className="text-xl py-4 border-b border-gray-700 hover:text-red-500 cursor-pointer">
            Movies
          </NavLink>

          <NavLink
            to="/tvseries"
            onClick={() => setDisplay(false)}
            className="text-xl py-4 border-b border-gray-700 hover:text-red-500"
          >
            Series
          </NavLink>

          <span className="text-xl py-4 border-b border-gray-700 hover:text-red-500 cursor-pointer">
            New & Popular
          </span>

        </div>
      )}

      {/* Desktop Sidebar (optional slim bar) */}
      {/* <div className="hidden lg:flex fixed top-20 left-0 h-full w-16 z-40"></div> */}
    </>
  )
}

export default Sidebar