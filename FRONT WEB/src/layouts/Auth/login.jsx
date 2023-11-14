import React from 'react'
import '../../App.css'
import Connexion from '../../components/Auth/Connexion'
import Footer from '../../components/Homepage/Footer'
import Header from '../../components/Homepage/Header'
const Login = () => {
  return (
    
<div className='login bg-lightPrimary dark:!bg-navy-900'>
    <Header/>
    <Connexion/>
    <Footer/>
</div>

    
  )
}

export default Login