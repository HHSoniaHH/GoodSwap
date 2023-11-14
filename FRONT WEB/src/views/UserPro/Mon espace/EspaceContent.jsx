import React, { useContext, useEffect, useState } from "react";

import { MyContext } from "../../../layouts/home/User";

import GetCagnotteByUser from "../Cagnotte/GetCagnotte/GetCagnotteByUser";
import OrganisationsProfile from "../Organisations/OrganisationsProfile";
import GetAllEvenement from "../Evenements/GetAllEvenement";

const EspaceContent = ({ active }) => {


  return (
    <div className="w-full justify-center ">
      {/* profile */}
      {active === 1 && (
        <>
           <OrganisationsProfile/>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
         </div>
      )}
      {active === 3 && (
        <>
               
        <GetAllEvenement/>
       
        </>
      ) }
        {active === 4 && (
        <><GetCagnotteByUser />
        </>
      ) }
     
     
    </div>
  );
};




export default EspaceContent;
