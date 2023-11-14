

import TableUser from "./components/TableUser";
import TableUserPro from "./components/TableUserPro";
import { MdBarChart } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import Widget from "../../../components/widget/Widget";
import { useEffect, useState } from "react";
import axios from "axios";
import DemandeUpgrade from "./components/DemandeUpgrade";

const Tables = () => {
  const [tableLength, setTableLength] = useState();
  const [UserProLength, setUserProLength] = useState();
  const [users, setUsers] = useState([]);
  const token = window.localStorage.getItem("token");
  const [demande,setDemande]=useState([]);





  useEffect(() => {
    getAllUser();


  }, []);
  const getAllUser = async () => {
    const res = await axios.get("http://localhost:4000/getAllUser", {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    if (res.data.success === true) {
      setUsers(res.data.data);
      setDemande(res.data.data.Avis);
    }
  };
  const Admin = users.filter((i) => i.UserType === "Admin");

  const filteredUsers = users.filter((i) => i.UserType === "Utilisateur");
  const filteredUsersPRO = users.filter((i) => i.UserType === "Organisateur");
  const deleteUser = async (id, name) => {
    if (
      window.confirm(`Est ce que vous voulez vraiment supprimer ${name}!!!!`)
    ) {
      const res = await axios.delete(`http://localhost:4000/deleteUser/${id}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }).then(response=>{
      if (response.data.success === true) {
        getAllUser();
        alert(response.data.message);
      } else {
      }})
    }
  };
  





  return (
    <div className="mt-5 mb-5  block h-full grid-cols-1 gap-5 md:grid-cols-2">
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 mb-4 3xl:grid-cols-6">
  
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Nombre d'admin"}
          subtitle={Admin.length}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Nombre d'utilisateurs"}
          subtitle={filteredUsers.length}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Nombre des organisateurs"}
          subtitle={filteredUsersPRO.length}
        />
        </div>
      <div className="mb-5">
        <TableUser
        filteredUsers={filteredUsers}
        getAllUser={getAllUser}
        deleteUser={deleteUser}
        onTableLength={(length)=>{setTableLength(length)}}
        />
      </div>
      <div className="mb-5">
        <TableUserPro
                 onUserProLength={(length)=>{setUserProLength(length)}}

        />
        <p></p>
      </div>
      <div className="mb-5">
        <DemandeUpgrade

        />
        <p></p>
      </div>
    </div>
  );
};

export default Tables;
