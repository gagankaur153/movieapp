import React, {useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar  from './components/Navbar'
import MainContent from './components/Home'
import Sidebar from './components/Sidebar'
import Moviedetail from './components/Moviedetail'
import Playvideo from './components/Playvideo'
import Tvseries from './components/Tvseries'
import Allepisode from './components/Allepisode'
import Tvpop from './components/Tvpop'

const   movie  = () => {
   const [isdisplay, setDisplay] = useState(false)
      const handleclick= ()=>{
          setDisplay(!isdisplay)
          console.log(isdisplay)
      }
   
  return (
    <>
     <Navbar click={handleclick } display={setDisplay} />
     <Sidebar sidebardisplay={isdisplay}/>
    
  <Routes>
    <Route path='/' element={<MainContent/>}/>
    <Route path='/detail' element={<Moviedetail/>}/>
    <Route path='/playmovie' element={<Playvideo/>} />
    <Route path='/tvseries' element={<Tvseries/>}/>
    <Route path='/allepisode' element={<Allepisode/>}/>
    <Route path='/tvdetail' element={<Tvpop/>} />
    {/* <Route path='/' element={<Page/>}/> */}
  </Routes>
    </>
   
  )
}

export default   movie 