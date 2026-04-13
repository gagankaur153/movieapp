import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar  from './components/Navbar'
import MainContent from './components/Home'
import Sidebar from './components/Sidebar'
import Playvideo from './components/Playvideo'
import Tvseries from './components/Tvseries'
import Tvpop from './components/Tvpop'
import Footer from './components/Footer'

const   movie  = () => {
  
   
  return (
    <>
     <Navbar/>
     <Sidebar />
    
  <Routes>
    <Route path='/' element={<MainContent/>}/>
    <Route path='/playmovie' element={<Playvideo/>} />
    <Route path='/tvseries' element={<Tvseries/>}/>
    <Route path='/tvdetail' element={<Tvpop/>} />
  </Routes>

  <Footer/>
    </>
   
  )
}

export default   movie 