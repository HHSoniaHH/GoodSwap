
       


import { MdBarChart } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import Widget from "../../../components/widget/Widget";
import React,{ useEffect, useState } from "react";
import axios from "axios";
import MesDemandeEnAttente from "./mesDemandeEnAttente";
import MesDemandeAccepter from "./MesDemandeAccepter";
import { Fragment } from "react";
import { Button, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { Dialog } from "@headlessui/react";
import { confirm } from "react-confirm-box";

const MesDemande = () => {
  const [tableLength, setTableLength] = useState();
  const [UserProLength, setUserProLength] = useState();
  const [demande, setDemandes] = useState([]);
  const id = window.localStorage.getItem("id");

  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    getAlldemande();


  }, []);
  const getAlldemande = async () => {
    const res = await axios.get(`http://localhost:4000/getAlldemandeByAdopteur/${id}`).
    then(res=>{setDemandes(res.data.data)})

      
    
  };

  const filterDemandeAttente = demande.filter((i) => i.status === "Attente");
  const filterDemandeAccepte = demande.filter((i) => i.status === "Accepter");
  const AnnulerDemande = async (id,adopteurId,articleId) => {
    if (
      window.confirm(`Est ce que vous voulez vraiment annuler  ${adopteurId} ?`)
    ) {
      const res = await axios.delete(`http://localhost:4000/AnnulerDemandeArticle/${id}`, {data:{adopteurId:adopteurId,articleId:articleId}}).then(response=>{
     
        getAlldemande();
        alert(response.data.message);
    
     })
    }
  };
  
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
  
  const optionsWithLabelChange = {
    closeOnOverlayClick: false,
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  };


  const onClick = async (options) => {
    const result = await confirm("Are you sure?", options);
    if (result) {
      console.log("You click yes!");
      return;
    }
    console.log("You click No!");
  };

  return (
  <>
   
                
            
   
          
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
  AnnulerDemande={AnnulerDemande}
        />
        
      </div>
      <div className="mb-5">
      <MesDemandeAccepter
  filterDemandeAccepte={filterDemandeAccepte}
  FinaliserDon={FinaliserDon}

        />
        <p></p>
      </div>

     


    </div>
  </>
  );
};

export default MesDemande;
 




