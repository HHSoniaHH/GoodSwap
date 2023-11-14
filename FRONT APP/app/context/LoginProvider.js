import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [isLoginpending, setLoginpending] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [posts, setPosts] = useState({});



  const fetchUser = async () => {
    setLoginpending(true);
    const token = await AsyncStorage.getItem('token');


    if (token !== null) {
      const res = await client.get("/profile", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      if (res.data.success) {
         setProfile(res.data.profile);
        setIsLoggedIn(true);
        if(res.data.profile.UserType==='Organisateur'){
          setIsAdmin(true)
          setIsUser(false)

        }else{       
          setIsAdmin(false)
          setIsUser(true)

        }

      }else{
        setProfile({});
        setIsLoggedIn(false);
        setIsAdmin(false)
        setIsUser(false)


      }
      setLoginpending(false);

    
    
    }else{
      setProfile({});
      setIsLoggedIn(false);
      setLoginpending(false);
      setIsAdmin(false)
      setIsUser(false)
      }







  };

  useEffect(() => {
    fetchUser();

  }, []);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
        isLoginpending,
        setLoginpending,
        isAdmin, setIsAdmin,isUser, setIsUser
        ,posts, setPosts
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
