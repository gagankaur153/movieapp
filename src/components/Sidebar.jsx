
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Createcontext from './context/Createcontext'

const Sidebar = () => {
  const {sidebardisplay, setSidebardisplay} = useContext(Createcontext)
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
            onClick={() => setSidebardisplay(false)}
            className="text-xl py-4 border-b border-gray-700 hover:text-red-500"
          >
            Home
          </NavLink>

          <NavLink to='/' onClick={()=> setSidebardisplay(false)} className="text-xl py-4 border-b border-gray-700 hover:text-red-500 cursor-pointer">
            Movies
          </NavLink>

          <NavLink
            to="/tvseries"
            onClick={() => setSidebardisplay(false)}
            className="text-xl py-4 border-b border-gray-700 hover:text-red-500"
          >
            Series
          </NavLink>

          <span className="text-xl py-4 border-b border-gray-700 hover:text-red-500 cursor-pointer">
            New & Popular
          </span>

        </div>
      )}

      
    </>
  )
}

export default Sidebar