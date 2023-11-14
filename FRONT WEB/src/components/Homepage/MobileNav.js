import React from 'react';
// import data
import { navPublic,navProfile } from '../../variables/data';

const MobileNav = () => {
  const token = window.localStorage.getItem("token");

  return (
    <div className='bg-blue-700/90 w-full h-full'>
    {token?   <ul className='h-full flex flex-col justify-center items-center gap-y-8'>
{navProfile.map((item, index) => {
  // destructure item
  const { href, name } = item;
  return (
    <li key={index}>
      <a className='link text-white text-xl font-bold border-b border-white p-2 ' href={href}>
        {name}
      </a>
    </li>
  );
})}
</ul>:
 <ul className='h-full flex flex-col justify-center items-center gap-y-8'>
 {navPublic.map((item, index) => {
   // destructure item
   const { href, name } = item;
   return (
     <li key={index}>
       <a className='link text-white text-xl font-bold border-b border-white p-2 ' href={href}>
         {name}
       </a>
     </li>
   );
 })}
</ul>}
    </div>
  );
};

export default MobileNav;
