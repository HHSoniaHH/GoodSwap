import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import ImageUpload from "./components/Auth/ImageUpload";
import Aos from "aos";
import ProtectedRoot from "./components/Auth/ProtectedRoot";

import PublicRoot from "./components/Auth/PublicRoot";
import ProtectedRootAdmin from "./components/Auth/ProtectedRootAdmin";

import SignUp from './layouts/Auth/sign-up'
import Login from './layouts/Auth/login'
import Home from './layouts/home/Home'
import Contact from './layouts/home/Contact'
import Forgot from './layouts/Auth/Reinistailisermdp'
import NewPass from './layouts/Auth/NewMdp'


import ConfirmeOTP from "./components/Auth/ConfirmeOTP";
import Admin from "./layouts/admin";
import UserProfile from "./views/User/UserProfile";
import ArticleDetail from "./components/Auth/ArticleDetail";
import User from "./layouts/home/User";
import Chat from "./views/User/Chat/Chat";
import ProfileOther from "./views/User/ProfileOtherUser/ProfileOther";
import MesDemandeDonnation from "./views/User/Mes demandes Donnation/Donnation";
import GetCagnotteByUser from "./views/UserPro/Cagnotte/GetCagnotte/GetCagnotteByUser";
import ProtectedRootUserPro from "./components/Auth/ProtectedRootUserPro";

function App() {
  Aos.init({
    duration: 1800,
    offset: 100,
  });
  return (
    <div className="className='overflow-hidden'  ">
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoot />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/forgot" element={<Forgot />} />
            <Route exact path="/contact" element={<Contact />} />

          <Route exact path="/verifier" element={<ConfirmeOTP />} />
            <Route exact path="/reset-password" element={<NewPass />} />

          </Route>

          <Route path="/" element={<ProtectedRoot />}>

            <Route path="/ImageUpload" element={<ImageUpload />} />
            <Route path="user/*" element={<User />} />
           
            <Route path="/Message" element={< Chat/>} />
          
          </Route>
        <Route Route path="/" element={<ProtectedRootAdmin />}>
          <Route path="admin/*" element={<Admin />} />
          <Route path="/Article/auteur/:id" element={<ProfileOther />} />
          <Route path="/ArticleDetail/:id" element={<ArticleDetail />} />
          </Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
