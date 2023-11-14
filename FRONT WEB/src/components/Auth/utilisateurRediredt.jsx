import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes, unstable_HistoryRouter,  } from "react-router-dom";
import Admin from "../../layouts/Admin";


import Adminpage from "./Adminpage";
import UserInfo from "./UserInfo";

export default function UtilisateurDetails() {
    const [profile, setUserData] = useState("");
    const [admin, setAdmin] = useState(false);


   

return admin? (<>
<Admin profile={profile} />

</>) :
 <UserInfo profile={profile} />;


}