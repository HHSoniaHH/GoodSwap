import { createPopper } from "@popperjs/core";
import React, { useContext } from 'react';
import { MyContext } from '../../layouts/Admin';
import defaultImage from '../../img/defaultProfile.png'

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start', // set placement to top-left
      
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const profile = useContext(MyContext);
  return (
    <>
    
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex justify-center mb-2 align-middle">
            
          <span className="w-12 h-12 text-sm text-white mr-4 bg-gray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={profile.avatar || defaultImage}
            />
          </span>
          <div className="block mt-4">
          <h1 className="text-md font-bold">{profile.fname} {profile.lname} 
          </h1>
          <p className="lead text-sm">{profile.email}</p>
          </div>

        </div>
     
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white  text-base z-50 float-right py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-xs py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
     Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-xs py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-xs py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a>
        <div className="h-0 my-2 border border-solid border-gray-100" />
        <a
          href="#pablo"
          className={
            "text-xs py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Seprated link
        </a>
      </div>
    
    </>
  );
};

export default UserDropdown;
