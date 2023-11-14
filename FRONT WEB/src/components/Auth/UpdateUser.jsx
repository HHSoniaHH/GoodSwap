import React, { useState,useContext } from 'react';
import axios from 'axios';
import { MyContext } from './UserInfo';
import UpdateImage from './updateimage';

function UpdateUser() {
  const [showModal, setShowModal] = React.useState(false);
  const token =  window.localStorage.getItem('token');
  const profile = useContext(MyContext);

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
  
    <>
      
    <button
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Modifier le profil 
      </button>
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
             
                  <UpdateImage />
                  <hr/>
                <form class="w-full mt-4 " onSubmit={handleSubmit}>
                 <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-2 ">
              
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
                  <div className="mb-2">
                    <input
                      type="email" name="email" value={userData.email||profile.email} onChange={handleChange}
                  
                      class="bg-gray-50  outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black"
                      placeholder="Adresse email"
                      
                    />
                  </div>
            
                 
                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl py-2   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
    </>
  );
}

export default UpdateUser