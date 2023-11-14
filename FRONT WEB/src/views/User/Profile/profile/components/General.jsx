import Card from "../../../../../components/card";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import UpdateImage from "../../../../../components/Auth/updateimage";
import { MyContext } from "../../../../../layouts/home/User";
const General = ({}) => {
const profile =useContext(MyContext)
  const [showModal, setShowModal] = React.useState(false);
  const token =  window.localStorage.getItem('token');

  const [userData, setUserData] = useState({
    fname: profile.fname,
    lname: profile.lname,
    email: profile.email,
  });
 const id = window.localStorage.getItem("id");
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit =async (event) => {
    event.preventDefault();
    const res = await axios.put(`http://localhost:4000/user/${id}`, userData,   {headers: {
      Authorization: `JWT ${token}`,
    },})
      
     if(res.data.success===true)
     {   console.log(res.data);

   setShowModal(false)
   window.location.reload()}else{
    console.log(res.data.message);

   }


        // Mettre à jour l'état de l'utilisateur ou rediriger vers une autre page
    
    
  };



 
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-2 w-full flex justify-between">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
        <button
        class="linear  flex items-center  justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Modifier le profil 
      </button>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Nom</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {profile.fname}          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Prénom</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {profile.lname}  
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Mail</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {profile.email}  
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Compte</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {profile.UserType}            </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl mb-4 bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Status</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {profile.status}  
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 mb-4 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Date de naissance</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            20 July 1986
          </p>
        </div>
      </div>
      {showModal ? (
      <>
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative w-auto my-6 mx-auto bg-white rounded-xl  max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold"> Mettre à jour</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div class="px-12 py-8 w-full">
              
                  
                 
                <form class="w-full  " onSubmit={handleSubmit}>
                 <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-4 ">
              
                    <input
                      type="text"
                      name="fname"
                      id="fname"
                      value={userData.fname||profile.fname}
                      onChange={handleChange}
                      class="bg-gray-50 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                      placeholder="Nom"
                      
                    />
                 
                  
                    <input
                      type="text"
                      name="lname"
                      id="lname"
                      value={userData.lname||profile.lname}
                      onChange={handleChange}
                      class="bg-gray-50  outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black"
                      placeholder="Prénom"
                      
                    />
               
                 </div>
                  <div className="mb-4">
                    <input
                      type="email" name="email" value={userData.email||profile.email} onChange={handleChange}
                  
                      class="bg-gray-50  outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black"
                      placeholder="Adresse email"
                      
                    />
                  </div>
            
                 
                  <button
                    type="submit"
                    class="linear mt-4 w-full flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                  >
                    Mettre à jour
                  </button>
                
                </form>
              </div>
  
             
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
      <div className="z-0 col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
      <UpdateImage/>
        </div>
    </Card>

  );
};

export default General;
