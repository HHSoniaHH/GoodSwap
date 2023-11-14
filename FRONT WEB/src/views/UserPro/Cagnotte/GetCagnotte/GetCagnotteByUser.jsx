import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import PostCard from '../postCard.jsx'
import AddCagnotte from '../createCagnote/AddCagnotte.jsx'
const GetCagnotteByUser = () => {
const [cagnotte,setCagnotte]=useState([])
const [user,setUser]=useState([])
const organisationId =window.localStorage.getItem('organisationId')

useEffect(()=>{
    GetCagnotteOfUser();
},[])
const GetCagnotteOfUser =async()=>{
    try {
        
await axios.get(`http://localhost:4000/getAllCagnotteByUser/${organisationId}`).then(res=>{
    setCagnotte(res.data.data)
    setUser(res.data.user)

    console.log(res.data)

})

    } catch (error) {
        
    }
}

  return (
    <>
{ organisationId ?
  <>
  <AddCagnotte GetCagnotteOfUser={GetCagnotteOfUser}/>
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
          GetCagnotteOfUser={GetCagnotteOfUser}
  
          />
      )
         
  })
  
  }
  
  
  
  
  </div></>:<div className='flex justify-center h-96 items-center align-middle'>
  <h1 className='text-xl font-poppins tracking-2 font-bold text-red-500  '>Vous  devez  ajouter  votre  propre  organisation
  pour lancer une cagnotte </h1>
    </div>}

  </>
  )
}

export default GetCagnotteByUser


