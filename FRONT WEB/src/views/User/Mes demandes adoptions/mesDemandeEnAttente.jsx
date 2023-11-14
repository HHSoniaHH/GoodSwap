


import React, {  useState } from "react";
import Card from "../../../components/card";
import CardMenu from "../../../components/card/CardMenu";

const MesDemandeEnAttente = ({filterDemandeAttente,AnnulerDemande}) => {
  const [users, setUsers] = useState([]);

  const token = window.localStorage.getItem("token");



 
 





  return (
   <>
   
   <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between">
        <div class="text-xl font-bold text-orange-500 dark:text-white">
          Mes demandes en attentes
        </div>
        <CardMenu />
      </div>
     
      { filterDemandeAttente.length!==0 ? <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table  className="w-full">
          <thead>
            <tr>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs ml-2 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                 Article
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
            Adopteur
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Donnateur
                
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
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                action
              </th>
            </tr>
          </thead>
          <tbody >
          {filterDemandeAttente.map((demande) => {
              return (
                <>
                  {" "}
                  <tr>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {demande.ArticleNom} 
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  
                      <span className={"ml-3 font-bold "}>
                      {demande.adopteurNom}
                      </span>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {demande.donnateurNom}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-circle text-yellow-500 mr-2">
                        {demande.status}
                      </i>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <button
                         
                         class="font-medium border border-red-500 p-2  text-red-600  rounded dark:text-white hover:text-red-300"
                         onClick={() => AnnulerDemande(demande._id,demande.adopteurId, demande.articleId)}
                       >
                         Annuler
                       </button>
                </td>
           
                  
                  </tr>
              
                </>
              );
            })}
          </tbody>
        </table>
      </div>:<>
      
     <h1>Aucune demandes en attentes est disponible</h1>
      </>}
    </Card>
   </>
  );
};

export default MesDemandeEnAttente;
