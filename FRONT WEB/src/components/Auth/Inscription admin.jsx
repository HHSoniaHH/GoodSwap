import React, { useState } from "react"
import { Link } from "react-router-dom"
import PO from "../../img/p.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  InscriptionAdmin= ()=> {

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Admin");

  const handleSubmit = (e) => {
  
      e.preventDefault();

      console.log(fname, lname, email, password);
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          email,
          lname,
          password,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.success === true) {
         
            toast.success('Inscrit avec succes', {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
              setTimeout(fonctionAExecuter, 2000);
             
              function fonctionAExecuter()
  
             {
              window.location.href='./login';
             }

            }     else if (data.success===false){
              toast.error(data.message, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
          
        });
    
  };




  return (
    <div>
        <section className=" relative h-full">
  <div className=" px-16 h-full text-gray-800  pt-0 pb-20 mb-16">
    <div
      className="flex xl:justify-between lg:justify-between lg:ml-16 justify-center items-center flex-wrap   "
    >
     <div
        className="grow-0 shrink-1  md:shrink-0 basis-auto lg:ml-8 xl:w-5/12 lg:w-5/12 md:w-5/12  md:mb-11"
      >
        <img
          src={PO}
          className="w-5/6 "
          alt="Sample"
        />
      </div>
      <div className=" w-full mt-0 p-2 my-0 md:px-4 lg:w-6/12   rounded-2xl shadow-2xl">
        <form   onSubmit={handleSubmit}>
         
          <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <h1 className="text-center  text-blue-900 font-bold text-2xl mx-4 mb-2">Créer un nouveau Admin</h1>
          </div>
     

        




          
          

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-4 mt-2">
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            id="name"
            name="fullname"
            type="text" placeholder="Nom" 
            onChange={(e) => setFname(e.target.value)}

            />
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
             id="lastName"
             name="lastname"
            type="text" placeholder="Prenom"
            onChange={(e) => setLname(e.target.value)}
          
             />
        </div>
        <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 mb-1 rounded-lg focus:outline-none focus:shadow-outline"
             id="email"
             name="email"
            type="email" placeholder="Adresse Email"
            onChange={(e) => setEmail(e.target.value)}
             />
               <div className="w-full grid-cols-1 gap-3 md:grid-cols-2 mt-2 mb-4">
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
             id="password"
             name="password"
            type="password" placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
        
             />
        </div>

        <div className="block ">
           
         <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-2 mt-2">
         
       {/* <div className="flex items-center pl-4 border  rounded border-[#ffaa45] h-8">
           <input  id="bordered-radio-2" type="radio"  name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "/>
         <label htmlfor="bordered-radio-2" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-black">Utilisateur Pro</label>
        </div> */}
         </div>
          
          </div>

       
             
          <div className="text-center  justify-center">
					<button className=" text font-bold tracking-wide bg-blue-900 text-gray-100 p-2 text-xl rounded w-full 
                      focus:outline-none focus:shadow-outline hover:bg-blue-800 hover:shadow-lg"
                      type="submit"       
            >Créer un Admin</button>
            <ToastContainer/>
       
             
          <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p className="text-sm mx-4 mb-0  font-semibold  pt-1 text-center ">
              Je suis un membre ?
              
             
                 
            </p>
            </div>
            <Link className="text-white  duration-200  ease-in-out"
              to="/login"> 
              <button 
              type="button"
              className=" justify-center w-4/6  mb-4  py-2 bg-[#ffaa45] text-white font-bold  text-md   rounded shadow-md hover:bg-[#FFC060]  transition duration-150 ease-in-out"
             >Se connecter</button>
              </Link>
          </div>
        </form>
      </div>

      



    </div>
  </div>
</section>
    </div>
  )
}
 


export default InscriptionAdmin