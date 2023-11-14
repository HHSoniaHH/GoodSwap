import axios from 'axios'
import React ,{createContext, useContext, useEffect, useState}from 'react'
import UserInfo from '../../components/Auth/UserInfo'
import Footer from '../../components/Homepage/Footer'
import Header from '../../components/Homepage/Header'
import ProfilePage from './Profile/ProfilePage'
// export const MyContext = createContext({});
// import { MyContext } from '../../layouts/home/userHome'; 
const UserProfile = () => {
  // const profile=useContext(MyContext);
  // useEffect(() => {
  //   const token = window.localStorage.getItem('token');
  //   async function fetchUserInfo() {
  //     try {
  //      const response = await axios.get('http://localhost:4000/profile', {
  //         headers: {
  //           Authorization: `JWT ${token}`,
  //         },
  //       });

  //       setProfile(response.data.profile);

  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   if (token) {
  //     fetchUserInfo();
  //   }
  // }, []);
  return (
   
    <div className='bg-lightPrimary dark:!bg-navy-900 block justify-center items-center '>
       
      
        <ProfilePage  />
    
    
 
    </div>
 

  )
}

export default UserProfile