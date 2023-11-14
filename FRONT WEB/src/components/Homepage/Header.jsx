import React, { useState, useEffect,useContext } from "react";
// import data
import { header } from "../../variables/data";
// import icons
import { HiMenuAlt4, HiOutlineX } from "react-icons/hi";
// import components
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import defaultImage from '../../img/defaultProfile.png'
import { Link } from "react-router-dom";
import axios from "axios";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { MdLogout, MdPerson } from "react-icons/md";
import Dropdown from "../dropdown";
import { MyContext } from "../../layouts/home/User";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { TbLayoutDashboard } from "react-icons/tb";
const Header = () => {
  const token = window.localStorage.getItem("token");
  const profile = useContext(MyContext);
  const IsUserPro = window.localStorage.getItem("IsUserPro");

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
  const [darkmode, setDarkmode] = React.useState(false);

  // mobile nav state
  const [mobileNav, setMobileNav] = useState(false);
  // header state
  const [isActive, setIsActive] = useState(false);
  // destructure header data
  const { logo, btnText } = header;
  // scroll event
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });
  return (
    <header
      className={`${
        isActive
          ? "lg:top-0 bg-lightPrimary dark:!bg-navy-900 fixed shadow-2xl"
          : " sticky lg:top-[0px]"
      } py-6 lg:py-4  w-full transition-all  z-10`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
          <img src={logo} className="h-16" alt="logo" />
  
        {/* nav - initially hidden - show on desktop mode */}
        <div
          className="hidden lg:flex"
          // data-aos="fade-down"
          // data-aos-delay="400"
        >
          <Nav />
        </div>
        {/* cta button - initially hidden - show on desktop mode */}
        <div className="flex justify-center items-center gap-8">
     
      {
          <div
            className="cursor-pointer text-gray-600"
            // data-aos="fade-down"
            // data-aos-delay="400"
            onClick={() => {
              if (darkmode) {
                document.body.classList.remove("dark");
                setDarkmode(false);
              } else {
                document.body.classList.add("dark");
                setDarkmode(true);
              }
            }}
          >
            {darkmode ? (
              <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
            ) : (
              <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
            )}
          </div>
      }
          {!token && !mobileNav ? (
            <Link
              to={"/login"}
              className="btn btn-sm btn-outline hidden lg:flex"
              // data-aos="fade-down"
              // data-aos-delay="400"
            >
              {btnText}
            </Link>
          ) : (
        <>
            <Dropdown
            button={
              <img
              alt="A person walking on a beach during sunset"
                className="h-10 w-10 rounded-full"
                // data-aos="fade-down"
                // data-aos-delay="400"
                src={profile.avatar || defaultImage}
             
              />
            }
            children={
              <div 
              
              className= {`${
                !IsUserPro
                  ? "h-48"
                  : " h-56"
              } flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none`}
              
              >
                <div className="mt-3 ">
                  <div className="flex justify-center items-center gap-2">
                    <p className="text-sm font-bold text-right text-navy-700 dark:text-white">
                     {profile.fname}                    {profile.lname}
  
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
  
                <div className="mt-3 ml-1 flex flex-col">
                <div className=" flex gap-24 items-center justify-center p-2 ">
                  <a
                    href="/user/userProfile"
                    className="text-md font-medium text-dark hover:text-dark flex gap-[88px] items-center justify-center "
                  >
                    Mon profile 
                  <MdPerson className="h-6 w-6" />
                  </a>
                  </div>
               { IsUserPro?
                   <div className=" flex gap-24 items-center justify-center p-2 ">
                   <a
                     href="/user/userProEspace"
                     className="text-md font-medium text-dark hover:text-dark flex gap-[83px] items-center justify-center "
                   >
                     Mon espace 
                   <TbLayoutDashboard className="h-6 w-6" />
                   </a> 
                   </div>
                  
               :null}
                 
                  <div className=" flex gap-16 items-center justify-center p-2  ">
                  <a
                    href="/Message"
                    className="text-md font-medium text-dark hover:text-dark flex gap-16 items-center justify-center "
                  >
                    Mes messages 
                  <HiChatBubbleLeftRight className="h-6 w-6" />
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
         
            </>
          )}
        </div>
        {/* mobile nav trigger btn - hidden on desktop */}
        <button className="lg:hidden" onClick={() => setMobileNav(!mobileNav)}>
          {mobileNav ? (
            <HiOutlineX className="text-3xl text-blue-500" />
          ) : (
            <HiMenuAlt4 className="text-3xl text-blue-500" />
          )}
        </button>
        {/* mobile nav - hidden on desktop */}
        <div
          className={`${
            mobileNav ? "left-0" : "-left-full"
          }  fixed top-0 bottom-0 w-[60vw] lg:hidden transition-all`}
        >
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
