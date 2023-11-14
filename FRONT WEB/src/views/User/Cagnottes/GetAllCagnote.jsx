import React from 'react'
import PostCard from '../../UserPro/Cagnotte/postCard'
import axios from 'axios'

import { useEffect } from 'react'
import { useState } from 'react'
const GetAllCagnote = () => {
  const [cagnotte,setCagnotte]=useState([])
const [user,setUser]=useState([])

useEffect(()=>{
  GetAllCagnotte();
},[])
const GetAllCagnotte =async()=>{
    try {
        
await axios.get(`http://localhost:4000/getAllCagnotte`).then(res=>{
    setCagnotte(res.data.data)
    setUser(res.data.user)

    console.log(res.data)

})

    } catch (error) {
        
    }
}
  return (
    <div>
         <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    
    
    {cagnotte.map((cagn)=>{
      return(
          <PostCard
          Auteur={cagn.createdByName}
          percentage={(cagn.MontantActuel/cagn.Somme)*100}
          Titre={cagn.Titre}
          Somme={cagn.Somme}
          desc={cagn.description}
          MontantActuel={cagn.MontantActuel}
          interet={cagn.interet}
          status={cagn.status}
          idCagnotte={cagn._id}
          GetAllCagnotte={GetAllCagnotte}
  
          />
      )
         
  })
  
  }
  
  
  
  
  </div>
    </div>
  )
}

export default GetAllCagnote