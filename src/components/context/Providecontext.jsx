import React, { useState, useEffect } from 'react'
import Createcontext from './Createcontext'
import axios from 'axios'

const Providecontext = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [detail, setDetail] = useState(null)
  const [display, setDisplay] = useState(false)
  // const [displaymovie, setDisplaymovie] = useState(false)
  const [search, setSearch] = useState("")
  const [similarid, setSimilarid] = useState("")
  const [searchmovie, setSearchmovie] = useState([])
  const [tvid, setTvid] = useState("")
  const [loading, setLoading] = useState(false);
  const [selectseasonn, setSelectedSeasonn] = useState([])
  const [selectepisode, setSelectepisode] = useState([])
  const [selectedSeason, setSelectedSeason] = useState(null)

  console.log("season", selectseasonn)
  console.log("tvid", tvid)
  useEffect(() => {
    setLoading(true)
    axios.get("https://tmdb.modiavii66.workers.dev/movies/popular?page=1")
      .then(res => {
        setMovies(res.data.results)
      })
      .finally(() => setLoading(false));
  }, [])
  //  const seasonallepisode = (tvid, seasonid)=> {
  //   const season = seasonid.split(" ")
  //    axios.get(`https://api.themoviedb.org/3/tv/${tvid}/season/${season[1]}?api_key=8feaa6410559e6461f3c6544a5ca30da`)
  //   .then(res => console.log("seson", res.data))
  // }

  useEffect(() => {
    if (search) {
      axios.get(`https://tmdb.modiavii66.workers.dev/search/multi?query=${search}&page=1`)
        .then(res => {
          setSearchmovie(res?.data?.results)
          console.log(res.data)
        })
    }
  }, [search])

  //  useEffect(()=>{
  //     axios.get("https://api.themoviedb.org/3/tv/19530?api_key=8feaa6410559e6461f3c6544a5ca30da")
  //     .then(res=> console.log("tv series", res.data?.seasons))
  //   },[])




  const handledisplay = () => {
    setDisplay(!display)
  }

  return (
    <Createcontext.Provider value={{
      detail,
      setDetail,
      display,
      setDisplay, handledisplay,
      // setDisplaymovie,
      // displaymovie,
      movies, setSearch,
      search, setSimilarid,
       similarid, setSearchmovie,
        searchmovie, tvid, setTvid,
         loading, setLoading,
          selectseasonn, selectepisode,
           setSelectedSeasonn, setSelectepisode, 
           selectedSeason, setSelectedSeason

    }}> {children}</Createcontext.Provider>
  )
}

export default Providecontext