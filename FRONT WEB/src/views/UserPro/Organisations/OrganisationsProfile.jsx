import React from 'react'
import GeneralInfoOrgan from './GeneralInfoOrgan'
import Banner from './Banner'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import AddOrganisations from './AddOrganisations'

const OrganisationsProfile = () => {
  const [organ,setOraganisation]=useState([])
  const id =window.localStorage.getItem('id')
  const organisationId =window.localStorage.getItem('organisationId')

  useEffect(()=>{
    getOrganByUser()
  },[])
  const print=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:4000/print').then(res=>{
  alert(res.data.message)
})
  }
  const getOrganByUser =()=>{
    
       axios.get(`http://localhost:4000/getAllOrganisationByUser/${id}`).
      then(res=>{
        setOraganisation(res.data.data)
        console.log(res.data.data)
      })
  
    
      
    }
    
  return (
  <>
  { organisationId ? <div className="flex w-full flex-col gap-5">
    <div className="w-full mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
      <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
        <Banner
         image={organ.image}
         NomOrganisation={organ.NomOrganisation}
         EmailOrganisation={organ.EmailOrganisation}
        />
      </div>
      <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
        <GeneralInfoOrgan
        NomOrganisation={organ.NomOrganisation}
        Dirigeant={organ.DirigeantNom}
        TelOrganisation={organ.TelOrganisation}
        EmailOrganisation={organ.EmailOrganisation}
        adresse={organ.AdresseOrganisation}

        />
      </div>
   
<button    onClick={print}>
  print
</button>

    </div>

  </div>: <div className='flex justify-center h-96 items-center align-middle'>
  <AddOrganisations getOrganByUser={getOrganByUser}/>
    </div>}</>
  )
}

export default OrganisationsProfile