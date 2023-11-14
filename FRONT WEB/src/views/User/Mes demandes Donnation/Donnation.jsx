
       


import { MdBarChart } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import Widget from "../../../components/widget/Widget";
import { useEffect, useState } from "react";
import axios from "axios";
import MesDemandeEnAttente from "./mesDemandeEnAttente";
import MesDemandeAccepter from "./MesDemandeAccepter";

const MesDemandeDonnation = () => {
  const [tableLength, setTableLength] = useState();
  const [UserProLength, setUserProLength] = useState();
  const [demande, setDemandes] = useState([]);
  const id = window.localStorage.getItem("id");





  useEffect(() => {
    getAlldemande();


  }, []);
  const getAlldemande = async () => {
    const res = await axios.get(`http://localhost:4000/getAlldemandeByDonnateur/${id}`).then(res=>{setDemandes(res.data.data)})

      
    
  };

  const filterDemandeAttente = demande.filter((i) => i.status === "Attente");
  const filterDemandeAccepte = demande.filter((i) => i.status === "Accepter");

  // const filteredUsersPRO = users.filter((i) => i.UserType === "Organisateur");
  const FinaliserDon = async (id,articleId) => {
    if (
      window.confirm(`Est ce que vous etes satisfait   !!!!`)
    ) {
      const res = await axios.delete(`http://localhost:4000/finaliserDemandeArticle/${id}`, {data:{articleId}}).then(response=>{
      if (response.data.success === true) {
        getAlldemande();
        alert(response.data.message);
      } else {
      }})
    }
  };
  const AccepterDemande = async (id,articleId) => {
    if (
      window.confirm(`Est ce que vous voulez vraiment accepeter  ?`)
    ) {
      const res = await axios.put(`http://localhost:4000/accepterDemandeArticle/${id}`, {articleId}).then(response=>{
      if (response.data.success === true) {
        getAlldemande();
        alert(response.data.message);
      } else {
      }})
    }
  };
  const RefuserDemande = async (id,adopteurId,articleId) => {
    if (
      window.confirm(`Est ce que vous voulez vraiment reufuser  ${adopteurId} ?`)
    ) {
      const res = await axios.delete(`http://localhost:4000/refuserDemandeArticle/${id}`, {data:{adopteurId:adopteurId,articleId:articleId}}).then(response=>{
     
        getAlldemande();
        alert(response.data.message);
    
     })
    }
  };
  





  return (
    <div className="mt-5 mb-5  block h-full grid-cols-1 gap-5 md:grid-cols-2">
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 mb-4 3xl:grid-cols-6">
  
      
        {/* <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Nombre d'utilisateurs"}
          subtitle={filteredUsers.length}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Nombre des organisateurs"}
          subtitle={filteredUsersPRO.length}
        /> */}
        </div>
      <div className="mb-5">
        <MesDemandeEnAttente
  filterDemandeAttente={filterDemandeAttente}
  AccepterDemande={AccepterDemande}
  RefuserDemande={RefuserDemande}

        />
        
      </div>
      <div className="mb-5">
      <MesDemandeAccepter
  filterDemandeAccepte={filterDemandeAccepte}


        />
        <p></p>
      </div>
    </div>
  );
};

export default MesDemandeDonnation;
 
