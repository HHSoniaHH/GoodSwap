import axios from 'axios';
import React, { useEffect,createContext, useState } from 'react'
import Chat from './Chat';
export const profileContext=createContext() 
const Awid = () => {
    const [profile,setProfile]=useState("");
    const token = window.localStorage.getItem('token');
    useEffect(() => {
     
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
  return (
    <profileContext.Provider value={profile} >
        <Chat/> 
   </profileContext.Provider>
  )
}

export default Awid