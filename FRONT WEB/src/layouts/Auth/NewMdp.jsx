import React from 'react'
import '../../App.css'
import ResetPass from '../../components/Auth/ResetPassword'
import Footer from '../../components/Homepage/Footer'
import Header from '../../components/Homepage/Header'
const NewPass = () => {
  return (
    
<div className='login bg-lightPrimary dark:!bg-navy-900'>
    <Header/>
    <ResetPass/>
    <Footer/>
</div>

    
  )
}

export default NewPass