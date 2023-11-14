import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import PO from '../../img/welcome-img.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Connexion = ()=>{
  const [isActive, setIsActive] = useState(false);


  const {setProfile} = useState({});

   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    function handleLoginSubmit(event) {
      event.preventDefault();
  
      axios.post('http://localhost:4000/login', {
        email: email,
        password: password
      })
      .then(response => {
console.log(response.data)    
if (response.data.success === true) {
  
  window.localStorage.setItem("token", response.data.token);
  window.localStorage.setItem("loggedIn", true);
  window.localStorage.setItem("id", response.data.user._id);
  
  if(response.data.user.status==='Active'){
  toast.success('Connecté avec succes', {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
    setTimeout(fonctionAExecuter,2500);
   
    function fonctionAExecuter()

   {
    // window.location.href='./app';
  if(response.data.user.UserType==='Admin'){
    window.location.href='./admin';
    window.localStorage.setItem("IsAdmin", true);


 }else if(response.data.user.UserType==='Organisateur'){
   window.location.href='./user';
   window.localStorage.setItem("IsUserPro", true);
if(response.data.user.organisationId){
  window.localStorage.setItem("organisationId",response.data.user.organisationId);

}

  //  window.location.href='./organisateur';

 } else if (response.data.user.UserType==='Utilisateur'){
   window.location.href='./user';
 }
 
}

}else{
  toast.error('Votre compte est désactivé', {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  window.localStorage.clear();

}

}
else if (response.data.success===false){
  toast.error(response.data.message, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: true,
    
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     })
      .catch(error => {
    });
    }





return(
  <section className=" relative h-full ">
  <div className=" px-16 h-full text-gray-800  pt-4 pb-20 mb-16">
    <div
      className="flex xl:justify-between lg:justify-between lg:ml-16 justify-center items-center flex-wrap
         "
    >
     
     <div
        className="grow-0 shrink-1  md:shrink-0 basis-auto lg:ml-8 xl:w-5/12 lg:w-5/12 md:w-5/12  md:mb-0"
      >
        <img
          src={PO}
          className="w-5/6"
          alt="Sample"
          data-aos='faderight'
          data-aos-delay='500'
        />
      </div>

      <div   data-aos='fade-up'
          data-aos-delay='500'className="  w-full mt-0 p-2 my-0 md:px-4 lg:w-6/12   dark:shadow-gray-800   shadow-2xl rounded-2xl ">
        <form onSubmit={handleLoginSubmit}>
         
          <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <h1 className="text-center  text-blue-900 font-bold text-2xl mx-4 mb-4  dark:text-white">Connexion</h1>
          </div>

        
        <div className="mb-1">
        <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 mb-1 rounded-lg dark:border dark:border-gray-700 dark:!bg-navy-900 focus:outline-none focus:shadow-outline"
            type="email" placeholder="Adresse Email"
            onChange={(e) => setEmail(e.target.value)} />
			
        </div>
        <div className="mb-4">
        <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none dark:border dark:border-gray-700 dark:!bg-navy-900 focus:shadow-outline"
            type="password" placeholder="Mot de passe" 
            onChange={(e) => setPassword(e.target.value)}/>
        </div>


     

          <div className="flex justify-end items-center ">
          <Link className="text-white  duration-200  ease-in-out"
              to="/forgot"> 
              <button 
              type="button"
              className=" justify-center w-48  mb-4  py-1  text-gray-500 font-bold  text-sm   rounded  hover:text-blue-500  transition duration-150 ease-in-out"
             >Mot de passe oublié?</button>
              </Link>

          </div>
             
          <div className="text-center  justify-center">
					<button className=" text font-bold tracking-wide bg-blue-900 text-gray-100 p-2 text-xl rounded w-full 
                      focus:outline-none focus:shadow-outline hover:bg-blue-800 hover:shadow-lg">
            Se connecter
          </button>
          <ToastContainer/>

          <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p className="text-sm mx-4 mb-0  font-semibold  pt-1 text-center text-navy-700 dark:text-white  ">
              Je suis nouveau membre ?
              
             
                 
            </p>
            </div>
            <Link className="text-white  duration-200  ease-in-out"
              to="/signup"> 
              <button 
              type="button"
              className=" justify-center w-4/6  mb-4  py-2 bg-[#ffaa45] text-white font-bold  text-md   rounded shadow-md hover:bg-[#FFC060]  transition duration-150 ease-in-out"
             >Créer un compte</button>
              </Link>




            
           

          </div>
        </form>
      </div>



    </div>
  </div>
</section>
)
}

export default Connexion