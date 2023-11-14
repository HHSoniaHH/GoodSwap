import React, { useEffect, useState } from "react";
import styles from "./styles";
import ProfileSideBar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";

const ProfilePage = () => {
  const [active, setActive] = useState(1);

  return (
    <div>
   
      <div className={`${styles.section} flex bg-lightPrimary relative gap-5 `}>
        <div className="w-[180px] 800px:w-[335px] sticky 800px:mt-0 mt-[2%]">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
       <ProfileContent active={active} />
     

      </div>
    </div>
  );
};

export default ProfilePage;
