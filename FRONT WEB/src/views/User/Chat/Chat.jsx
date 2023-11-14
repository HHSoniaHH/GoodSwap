import React, { useContext, useEffect, useRef, useState } from 'react'
import "./ChatBox.css";
import Conversation from './Conversation';
import ChatBox from './ChatBox';
import axios from 'axios';
import { io } from "socket.io-client";
import { MdLogout, MdPerson } from 'react-icons/md';
import Dropdown from '../../../components/dropdown';
import defaultImage from "../../../img/defaultProfile.png";
import { IoMdHome } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { TbAlignBoxRightBottomFilled } from 'react-icons/tb';
import { HiOutlineHome } from 'react-icons/hi';

const Chat = () => {
    
    const [user, setUser] = useState(null);
    const idConnceter = window.localStorage.getItem("id");

    const [profile,setProfile]=useState("");
  const [hideFooter, setHideFooter] = useState(false);

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
    const logOut = async () => {
      try {
        const token = window.localStorage.getItem("token");
  
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
        return false;
      }
    };
    // setHideFooter(true)
    const socket = useRef();
    const [chats,setChat]=useState([])
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    useEffect(()=>{
const getChat =async()=>{
    try {
        await axios.get(`http://localhost:4000/chat/${idConnceter}`,).then(res=>{
          setChat(res.data)
        console.log(res.data)
        })
        
    } catch (error) {
        console.log(error)
    }
}
getChat()
    },[user])




   // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", idConnceter);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

 // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


 // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== idConnceter);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  return (
<>
   <div className="Chat bg-lightPrimary">
    {/* Left Side */}
    <div className="Left-side-chat">
<div className='p-6 justify-center items-center flex'>
<img src={require('../../../img/logo.png')} className='w-36 h-18' alt="" />
</div>
      <div className="Chat-container bg-white">
        <h2 className='text-xl font-poppins font-bold text-blueSecondary'>Discussions</h2>
        <div className="Chat-list">
          {chats.map((chat) => (
            <div
              onClick={() => {
                setCurrentChat(chat);
              }}
            >
              <Conversation
                data={chat}
                currentUser={idConnceter}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right Side */}

    <div className="Right-side-chat ">
    <div className='flex justify-end items-center gap-16 p-4'>
    <Link to="../user">
        <HiOutlineHome className='text-3xl cursor-pointer text-blueSecondary'/>
      </Link>
     <div className='flex items-center space-x-4'>
     <p className="text-sm font-bold text-right text-navy-700 dark:text-white">
                    {profile.fname}   {profile.lname}
  
                    </p>
    <Dropdown
            button={
              <img
              alt="A person walking on a beach during sunset"
                className="h-12 w-12 rounded-full"
                // data-aos="fade-down"
                // data-aos-delay="400"
                src={ profile.avatar|| defaultImage}
             
              />
            }
            children={
              <div className=" flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                <div className="mt-3 ">
                  <div className="flex justify-center items-center gap-2">
                  
                  </div>
                </div>
                <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
  
                <div className="mt-3 ml-1 flex flex-col">
                  
                <div className=" flex gap-48 items-center justify-center p-2 ">
                  <a
                    href="/user/userProfile"
                    className="text-md font-medium text-dark hover:text-dark flex gap-24 items-center justify-center "
                  >
                    Mon profile 
                  <MdPerson className="h-6 w-6" />
                  </a>
                  </div>
                 
                  <hr />
              <div className=" flex gap-20 items-center justify-center p-2 "onClick={logOut}>
              <button
                
               
                    className="  text-md font-medium text-red-400 hover:text-red-600"
                  >Déconnecter
                  </button><MdLogout className=" h-6 w-6"/>
              </div>
                </div>
              </div>
            }
            classNames={"py-2 top-8 -left-[180px] w-max "}
          
          />
     </div>
     
     <div>
   
     </div>
      </div>
      <ChatBox
        chat={currentChat}
        currentUser={idConnceter}
        setSendMessage={setSendMessage}
        receivedMessage={receivedMessage}
        online={currentChat}

      
      />
    </div>
  </div>



</>
  )
}

export default Chat