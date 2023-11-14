import { useContext, useEffect } from "react";
import Banner from "./components/Banner";
import General from "./components/General";
import { MyContext } from "../../../../layouts/home/User";
import defaultImage from '../../../../img/defaultProfile.png'
import MaDemandeUpgrade from "./components/MaDemandeUpgrade";


const ProfileOverview = () => {
  const profile= useContext(MyContext);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-full mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
    
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
      
          <General
          
          
          />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <Banner 
         image= {profile.avatar || defaultImage}
         username={profile.fname + profile.lname}
         email={profile.email}
         smiles={profile.smiles}
          />
        </div>
     


      </div>
 
    </div>
  );
};

export default ProfileOverview;
