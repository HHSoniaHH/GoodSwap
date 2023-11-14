import React from 'react';
// import data
import { navPublic,navProfile } from '../../variables/data';

const Nav = () => {
  const token = window.localStorage.getItem("token");

  return (
    <nav>
   {token?     <ul className='flex gap-x-10'>
        {navProfile.map((item, index) => {
          // destructure item
          const { href, name } = item;
          return (
            <li key={index}>
              <a className='hover:text-blue-800 text-blue-500 dark:text-white transition font-bold border-b border-blue-500 dark:border-white p-2 ' href={href}>
                {name}
              </a>
            </li>
          );
        })}
      </ul>:
      <ul className='flex gap-x-10'>
        {navPublic.map((item, index) => {
          // destructure item
          const { href, name } = item;
          return (
            <li key={index}>
              <a className='hover:text-blue-800 text-blue-500 dark:text-white transition font-bold border-b border-blue-500 dark:border-white p-2 ' href={href}>
                {name}
              </a>
            </li>
          );
        })}
      </ul>}
    </nav>
  );
};

export default Nav;
