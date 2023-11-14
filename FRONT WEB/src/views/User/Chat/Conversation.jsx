import axios from 'axios';
import React, { useEffect, useState } from 'react'
import defaultImage from '../../../img/defaultProfile.png'
import "./ChatBox.css";

const Conversation = ({currentUser,data,online}) => {

    const [userData, setUserData] = useState(null)
    
    useEffect(()=> {
      const userId = data.members.find((id)=>id!==currentUser)
      console.log(userId)
        const getUserData = async ()=> {
          try
          {
           await axios.get(`http://localhost:4000/user/${userId}`).then(res=>{
                setUserData(res.data.data)
             console.log(res.data.data)
              })
             
             
          }
          catch(error)
          {
            console.log(error)
          }
        }
    
        getUserData();
      }, [])

    return (
        <>
        <div className="w-64 justify-start  flex  p-2 ">
        <div class="flex items-center space-x-4 rounded border conversation bg-lightPrimary w-full p-2">
                  <img
                    src={userData?.avatar || defaultImage}
                    class="w-12 h-12 rounded-full"
                    alt="Profile"
                  />
                  <div class="flex flex-col">
                    <div class="text-lg font-bold">
                      {userData?.fname} {userData?.lname}
                    </div>
                    <div class="flex items-center space-x-2">
                      <span style={{ color: online ? "#51e200" : "red" }}>
                        {online ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>
        </div>
      </>
      );
    };
    
    export default Conversation;
  