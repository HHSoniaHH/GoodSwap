import React, { useEffect, useState } from "react";
import styles from "./styles";

import EspaceSideBar from "./EspaceSideBar";
import EspaceContent from "./EspaceContent";

const EspacePage = () => {
  const [active, setActive] = useState(1);

  return (
    <div>
   
      <div className={`${styles.section} flex bg-lightPrimary relative gap-5 `}>
       <EspaceContent active={active} />
        <div className="w-[180px] 800px:w-[335px] sticky 800px:mt-0 mt-[2%]">
          <EspaceSideBar active={active} setActive={setActive} />
        </div>
     

      </div>
    </div>
  );
};

export default EspacePage;
