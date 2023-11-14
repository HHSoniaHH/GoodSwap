import React from "react";
import Card from "../card";
import { FcRating } from "react-icons/fc";
export const Avis = ({ avatar, username, commentaire, rate }) => {
  return (
   
      <Card extra="!flex-row flex-grow     rounded">
        <div className="p-2 items-center w-3/12 flex">
          <img
            alt="A person walking on a beach during sunset"
            className="h-12 w-12 rounded-full"
            // data-aos="fade-down"
            // data-aos-delay="400"
            src={avatar}
          />
        </div>

        <div className="h-50 flex mt-2 w-6/12 ">
          <div className=" flex flex-col  w-9/12 justify-center">
            <h4 className="text-sm font-bold  text-navy-700 dark:text-white">
              {username}
            </h4>
            <p className=" text-xs lead h-8  line-clamp-4 overflow-auto  ">
              {commentaire}
            </p>{" "}
          </div>

        </div>
          <div className="p-3 gap-1 flex items-center w-3/12">
            <span>{rate}/5 </span>
            <FcRating size={18} />
          </div>
      </Card>
 
  );
};
