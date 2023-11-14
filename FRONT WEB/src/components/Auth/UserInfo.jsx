import React, { useEffect, useState,createContext } from 'react';
import axios from 'axios';
import defaultimage from '../../img/defaultProfile.png'
import UpdateUser from './UpdateUser';

export const MyContext = createContext({});

function UserInfo() {
const [profile,setProfile]=useState("");
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    async function fetchUserInfo() {
      try {
       const response = await axios.get('http://localhost:4000/profile', {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });

        setProfile(response.data.profile);

      } catch (error) {
        console.error(error);
      }
    }

    if (token) {
      fetchUserInfo();
    }
  }, []);
 
  const logOut = async() => {
   
      try {
        const token =  window.localStorage.getItem('token');
    
        if (token !== null) {
          const res = await axios.get("http://localhost:4000/logout", {
            headers: {
              Authorization: `JWT ${token}`,
            },
          });
          if (res.data.success) {
            window.localStorage.clear();
      
            window.location.href = "./login";
    
            return true;
          }
        }
        return false;
      } catch (error) {
        console.log("error in sign out method", error.message);
        return false
      
    };
  };

  return (
   
    <MyContext.Provider value={profile} > 
<div className='bg-lightPrimary dark:!bg-navy-900'>

<div class="flex items-center  h-screen w-full justify-center ">

<div class="max-w-lg w-full  ">
    <div class="bg-white shadow-2xl border-1 rounded-lg h-96">
        <div class="photo-wrapper p-2 flex">
            <img class="w-32 h-32 rounded-full mx-auto" src={ profile.avatar||defaultimage} alt="John Doe"/>
           
        </div>
        <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{profile.fname} {profile.lname}</h3>
           
            <table class="text-xs my-3">
                <tbody>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td class="px-2 py-2">{profile.email}</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Type</td>
                    <td class="px-2 py-2">{profile.UserType}</td>
                </tr>
            </tbody></table>

            <div class="text-center my-3 flex gap-6 justify-center">
            <UpdateUser/>
                <button onClick={logOut}            
                 className="bg-red-600 hover:bg-red-400 block text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center  "
 href="#">Déconnecter</button>
            </div>

        </div>
    </div>
</div>

</div>

</div>
</MyContext.Provider>
   
  );
}

export default UserInfo;




