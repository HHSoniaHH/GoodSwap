


import React, {  useEffect, useState } from "react";
import Card from "../../../../components/card";
import CardMenu from "../../../../components/card/CardMenu";
import axios from "axios";

const DemandeUpgrade = ({row,}) => {
  const [demandeAll, setDemande] = useState([]);

  const token = window.localStorage.getItem("token");


  useEffect(() => {
    getAllDemande();
  }, []);
  const getAllDemande = async () => {
    const res = await axios.get("http://localhost:4000/getDemandeUpgrade", {
  
    }).then(res=>{

      setDemande(res.data.data);
      console.log(res.data.data)
    });
  };
 
 
  const AccepterDemande = async (id,UserDemandeId) => {
    if (
      window.confirm(`Est ce que vous voulez vraiment accepeter  ?`)
    ) {
      const res = await axios.post(`http://localhost:4000/user/AccepterDemandeUpgrade/${id}`, {UserDemandeId}).then(response=>{
      if (response.data.success === true) {
        getAllDemande();
        alert(response.data.message);
      } else {
      }})
    }
  };
  const RefuserDemande = async (id,UserDemandeId) => {
    if (
      window.confirm(`Est ce que vous voulez vraiment reufuser  ${UserDemandeId} ?`)
    ) {
      const res = await axios.put(`http://localhost:4000/user/RefuserDemandeUpgrade/${id}`, {UserDemandeId}).then(response=>{
     
      getAllDemande();
        alert(response.data.message);
    
     })
    }
  };




  return (
   <>
   
   <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between">
        <div class="text-xl font-bold  text-orange-500 dark:text-white">
          Les demande  en attentes de mise en niveau Organisateur
        </div>
        <CardMenu />
      </div>

   <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table  className="w-full">
          <thead>
            <tr>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs ml-2 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                 Nom Preneom 
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
            Nom d'organisation
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Adresse mail
                
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Téléphone
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Status
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0  font-semibold text-center "
                }
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody >
          {demandeAll.map((demande) => {
              return (
                <>
                  {" "}
                  <tr>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {demande.UserDemandeName} 
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  
                      <span className={"ml-3 font-bold "}>
                      {demande.NomOrganisation}
                      </span>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {demande.EmailOrganisation}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-circle text-navy-900 mr-2">
                        {demande.TelOrgansiation}
                      </i>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-circle text-yellow-500 mr-2">
                        {demande.status}
                      </i>
                    </td>
                   
                  
                    <td className="border-t-0 px-6  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex gap-9 justify-center  items-center">
                        <button
                          href="#"
                          class="font-medium bg-blue-500 p-1 w-16 rounded  text-white dark:text-white hover:text-blue-100"
                                                 onClick={() => AccepterDemande(demande._id, demande.UserDemandeId)}

                        >
                          Accepter
                        </button>
                        <button
                          href="#"
                          class="font-medium text-white bg-red-600 p-1 w-16 rounded dark:text-white hover:text-red-300"
                          onClick={() => RefuserDemande(demande._id, demande.UserDemandeId)}
                        >
                          Refuser
                        </button>
                      </div>
                    </td>               
                                    </tr>
              
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
   </>
  );
};

export default DemandeUpgrade;



