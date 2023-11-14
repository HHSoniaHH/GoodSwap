import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import defaultImage from "../../../img/defaultProfile.png";
import axios from "axios";
import InputEmoji from "react-input-emoji";
import { format } from "timeago.js";
import { HiOutlinePaperAirplane } from "react-icons/hi";

const ChatBox = ({
  currentUser,
  chat,
  receivedMessage,
  setSendMessage,
  online,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/user/${userId}`
        );
        setUserData(data.data);
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/message/${chat._id}`
        );
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database

    try {
      const { data } = await axios.post(
        "http://localhost:4000/message/",
        message
      );
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };
  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);
  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      <div className="ChatBox-container shadow">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header shadow ">
              <div className="follower">
                <div class="flex items-center space-x-4">
                  <img
                    src={userData?.avatar || defaultImage}
                    class="w-12 h-12 rounded-full"
                    alt="Profile"
                  />
                  <div class="flex flex-col">
                    <div class="text-lg font-bold">
                      {userData?.fname} {userData?.lname}
                    </div>
                  
                  </div>
                </div>
               
              </div>
            </div>
            {/* chat-body */}

            <div className="chat-body  ">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own  bg-gradient-to-r from-blue-500 to-blue-600  "
                        : "message bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  "
                    }
                  >
                    <span className="text-white font-poppins font-medium ">
                      {message.text}
                    </span>
                    <span className="text-gray-200 font-poppins">
                      {format(message.createdAt)}
                    </span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender  max-w-32 relative  ">
              <div onClick={() => imageRef.current.click()}>+</div>
           
            <InputEmoji
                placeholder="Ecrivez votre message"
                onEnter={() => console.log("enter")}
                borderRadius={5}
                fontSize={15}
                value={newMessage}
                onChange={handleChange}
              />
              {/* <input type="text"   value={newMessage}
                onChange={handleChange}
                placeholder="tapper"  /> */}
          
              <button
                className=" mb-2 rounded-[5px]   bg-brand-900 w-56 flex justify-center items-center h-12 text-xl font-bold text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
                onClick={handleSend}
              >
                Envoyer{" "}
                <HiOutlinePaperAirplane className="text-3xl transform rotate-90 ml-8 text-white" />
              </button>
              {/* <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              /> */}
              
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Cliquer pour commancer votre conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
