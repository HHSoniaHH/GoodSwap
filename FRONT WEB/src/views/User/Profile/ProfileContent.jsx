import React, { useContext, useEffect, useState } from "react";

import Dons from '../Dons/Dons'

import ProfileOverview from "./profile";
import mesDemande from "../Mes demandes adoptions/mesDemande";
import { MyContext } from "../../../layouts/home/User";
import MesDemande from "../Mes demandes adoptions/mesDemande";
import MesDemandeDonnation from "../Mes demandes Donnation/Donnation";
import MesAdoptions from "../Dons/Mes Adoptions/MesAdoptions";

const ProfileContent = ({ active }) => {


  return (
    <div className="w-full justify-center ">
      {/* profile */}
      {active === 1 && (
        <>
           <ProfileOverview />
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
  <Dons/>        </div>
      )}
      {active === 3 && (
        <>
                 <MesAdoptions/>

       
        </>
      ) }
        {active === 4 && (
        <>
          <MesDemande/>
        </>
      ) }
          {active === 5 && (
        <>
                 <MesDemandeDonnation/>

        </>
      ) }

     
    </div>
  );
};




export default ProfileContent;
