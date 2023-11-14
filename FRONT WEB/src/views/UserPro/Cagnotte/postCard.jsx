import React from "react";
import defaultImage from "../../../img/autsh.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AddMontant from "./createCagnote/AddMontant";
const PostCard = ({
  idCagnotte,
  Auteur,
  Titre,
  Somme,
  MontantActuel,
  interet,
  percentage,
  GetAllCagnotte,
  desc,
  status,
}) => {
  const organisationId = window.localStorage.getItem("organisationId");

  return (
    <div>
      <div class="relative max-w-xs rounded overflow-hidden max-h-xs shadow-xl flex-col flex justify-center ">
       {!organisationId?( <AddMontant idCagnotte={idCagnotte} GetAllCagnotte={GetAllCagnotte} />):null}
        <div className="  flex justify-center items-end">
          <div className="mb-8" style={{ width: 200, height: 200 }}>
            <CircularProgressbar
              value={percentage}
              text={`${percentage.toFixed(2)}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#0099ff",
                textColor: "#fff",
                pathColor: "#fff",
                textSize: 15,
                trailColor: "transparent",
              })}
            />
          </div>

          {status === "Non Atteint" ? (
            <div className="absolute w-full  flex items-center justify-center rounded-b-lg bg-orange-400  text-brand-500 hover:cursor-pointer">
              <p className="text-white">Objectif {status}</p>
            </div>
          ) : (
            <div className="absolute w-full flex items-center justify-center rounded-b-lg bg-green-600  text-brand-500 hover:cursor-pointer">
              <p className="text-white">Objectif {status}</p>
            </div>
          )}
        </div>

        <div class="p-4">
          <div class=" flex justify-between mb-2 ">
            <p className="text-md text-gray-400 ">Lancé par</p>
            <p className="text-md font-bold text-gray-400">{Auteur}</p>
          </div>
          <div class="font-bold text-xl mb-2 w-full">{Titre}</div>
          <div className="max-w-56 ">
            <p className=" text-sm lead h-10  line-clamp-4 overflow-auto  max-w-56">
              {desc}{" "}
            </p>
          </div>
        </div>
        <div class="mt-4  flex items-center justify-center">
          <div className="flex flex-col  items-center justify-center border-r w-4/12 border-gray-700 ">
            <label className="text-[12px] font-bold ">Target</label>
            <span class=" bg-green-600 w-11/12 text-center rounded text-sm font-semibold text-white mt-1 mb-2">
              {Somme} <b>DA</b>
            </span>
          </div>{" "}
          <div className="flex flex-col  items-center justify-center border-r w-4/12 border-gray-700 ">
            <label className="text-[12px] font-bold">Raised</label>
            <span class=" bg-blue-500 w-11/12 text-center rounded text-sm font-semibold text-white mt-1 mb-2">
              {MontantActuel} <b>DA</b>
            </span>
          </div>{" "}
          <div className="flex flex-col  items-center justify-center  w-4/12 ">
            <label className="text-[12px] font-bold ">Bénéifice</label>
            <span class=" bg-purple-700 rounded w-11/12 text-center  text-sm font-semibold text-white mt-1 mb-2">
              {interet} <b>DA</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
