import React from "react";

// Admin Imports
import MainDashboard from "./default";
import NFTMarketplace from "./marketplace";
import Profile from "./profile";
import DataTables from "./tables";
import Posts from "./Posts";



// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdPeopleAlt,
  MdPerson,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  // {
  //   name: "Articles",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  {
    name: "Utilisateurs",
    layout: "/admin",
    icon: <MdPeopleAlt className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Mon profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Posts",
    layout: "/admin",
    path: "posts",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Posts />,
  },
  // {
  //   name: "Detail",
  //   layout: "/admin",
  //   path: "/ArticleDetail/:id",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <ArticleDetail />,
  // },



];
export default routes;
