import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Page = () => {
    const [data, setData] = useState(null)
    useEffect(()=>{
axios.get("https://tmdb.modiavii66.workers.dev/tv/popular?page=1")
.then((res)=>
setData(res.data.results))
    },[])
  
//   useEffect(()=> {
//     console.log(data[0].adult)
//   },[data])
  return (
 <div>
         {
            data && (
                data.map((movie)=> (
               <div className='' key={movie.id}>{movie?.id}</div>

            ))
                
            )

            
         }
    </div>
  )
}

export default Page