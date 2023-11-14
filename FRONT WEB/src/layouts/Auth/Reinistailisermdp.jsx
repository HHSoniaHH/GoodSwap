import React from 'react'
import '../../App.css'
import ForgotPass from '../../components/Auth/DemandeReset'
import Footer from '../../components/Homepage/Footer'
import Header from '../../components/Homepage/Header'
const Forgot = () => {
  return (
    
<div className='Forgot bg-lightPrimary dark:!bg-navy-900'>
    <Header/>
    <ForgotPass/>
    <Footer/>
</div>

    
  )
}

export default Forgot