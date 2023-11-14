import React, { useContext } from "react";
import {
  AiOutlineCreditCard,

} from "react-icons/ai";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { MdOutlineTrackChanges ,MdOutlinePostAdd, MdHandshake, MdLibraryBooks,} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";


const EspaceSideBar = ({ setActive, active }) => {


  return (
    <div className="sticky !z-50  lg:!z-50  bg-white shadow-sm rounded-[10px] p-4 pt-8 ">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() =>{ setActive(1)}}
      >
        <RxPerson size={20} color={active === 1 ? "blue" : ""} />
        <span className={`pl-3 text-[12px]  ${active === 1 ? "text-[blue]" : ""}  `}>
          Mon organisation
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <MdLibraryBooks size={20} color={active === 2 ? "blue" : ""} />
        <span className={`pl-3 text-[12px] ${active === 2 ? "text-[blue]" : ""}  `}>
          Mes annonces
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => { setActive(3)}}
      >
        <MdHandshake size={20} color={active === 3 ? "blue" : ""} />
        <span className={`pl-3 text-[12px] ${active === 3 ? "text-[blue]" : ""}   `}>
          Mes événements
        </span>
      </div>

      

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4)}
      >
        <MdOutlineTrackChanges size={20} color={active === 4 ? "blue" : ""} />
        <span className={`pl-3 text-[12px]  ${active === 4 ? "text-[blue]" : ""} 800px:block `}>
        Mes cagnottes

        </span>
      </div>

      {/* <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <AiOutlineCreditCard size={20} color={active === 5 ? "blue" : ""} />
        <span className={`pl-3 ${active === 5? "text-[blue]" : ""} 800px:block `}>
        D.donnations
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <TbAddressBook size={20} color={active === 6 ? "blue" : ""} />
        <span className={`pl-3 ${active === 6 ? "text-[blue]" : ""} `}>
          
        </span>
      </div> */}

    
    </div>
  );
};

export default EspaceSideBar;
