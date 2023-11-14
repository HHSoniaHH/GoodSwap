import axios from 'axios'
import React ,{createContext, useEffect, useState}from 'react'

import Header from '../../components/Homepage/Header';
import Footer from '../../components/Homepage/Footer';
import UserProfile from '../../views/User/UserProfile';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserHome from '../../views/User/UserHome';
import Chat from '../../views/User/Chat/Chat';
import ArticleDetail from '../../components/Auth/ArticleDetail';
import ProfileOther from '../../views/User/ProfileOtherUser/ProfileOther';
import ProtectedRootUserPro from '../../components/Auth/ProtectedRootUserPro';
import GetCagnotteByUser from '../../views/UserPro/Cagnotte/GetCagnotte/GetCagnotteByUser';
import EspacePage from '../../views/UserPro/Mon espace/EspacePage';
import GetAllCagnote from '../../views/User/Cagnottes/GetAllCagnote';
import GetAllEvenement from '../../views/UserPro/Evenements/GetAllEvenement';
import GetAllEvent from '../../views/User/Evemenemts/GetAllEvent';

export const MyContext = createContext({});

const User = () => {
  const [profile,setProfile]=useState("");
  const [hideFooter, setHideFooter] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    async function fetchUserInfo() {
      try {
       const response = await axios.get('http://localhost:4000/profile', {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });

        setProfile(response.data.profile);

      } catch (error) {
        console.error(error);
      }
    }

    if (token) {
      fetchUserInfo();
    }
  }, []);
  return (
    <MyContext.Provider value={profile} > 
    <div className='bg-lightPrimary dark:!bg-navy-900 block justify-center items-center '>
        <Header/>
      
        <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
               

              <Route
               
                  path="/"
                  element={<Navigate to="/user/userHome" replace />}
                />
                <Route path="/userHome" element={<UserHome />} />
                <Route path="/userProfile" element={<UserProfile />} />
                <Route path="/ArticleDetail/:id" element={<ArticleDetail />} />
                <Route path="/Article/auteur/:id" element={<ProfileOther />} />
                <Route path="/userProfile" element={<UserProfile />} />
                <Route path="/AllCagnotte" element={<GetAllCagnote />} />
                <Route path="/AllEvent" element={<GetAllEvent />} />

                <Route path="/" element={<ProtectedRootUserPro />}>
            <Route path="/userProEspace" element={< EspacePage/>} />

            </Route>

              </Routes>
            </div>
            {hideFooter ? null : <Footer/>}

            
    </div>
    </MyContext.Provider>

  )
}

export default User