import React from 'react'
import InscriptionGlobale from '../../components/Auth/InscriptionGlobale'
import Footer from '../../components/Homepage/Footer'
import Header from '../../components/Homepage/Header'

const SignUP= () => {
  return (
    <div className='bg-lightPrimary dark:!bg-navy-900'>
    <Header/>
    <InscriptionGlobale/>
    <Footer/>
    </div>
  )
}

export default SignUP