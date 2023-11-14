import React, { useEffect, useState, createContext} from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/index.jsx";
import Sidebar from "../../components/sidebar/index.jsx";
import Footer from "../../components/footer/Footer";
import routes from "../../views/admin/routes.js";
import axios from "axios";
import ArticleDetail from "../../components/Auth/ArticleDetail.jsx";
import ProfileOther from "../../views/User/ProfileOtherUser/ProfileOther.jsx";
export const MyContext = createContext({});

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const [profile, setUserData] = useState("");


  useEffect(() => {
    const token = window.localStorage.getItem('token');

    async function fetchUserInfo() {
      try {
       const response = await axios.get('http://localhost:4000/profile', {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        console.log(response.data.profile)
        setUserData(response.data.profile)

      } catch (error) {
        console.error(error);
      }
    }

    if (token) {
      fetchUserInfo();
    }
  }, []);
  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <MyContext.Provider value={profile}> 
      <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)}  />
      {/* Navbar & Main Content */}
      <div className="h-full w-full  bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[220px]`}
        >
          {/* Routes */}
          <div className="h-full ">
            <Navbar
            profile={profile}
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}

                <Route
                profile={profile}
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
                          <Route path="/ArticleDetail/:id" element={<ArticleDetail />} />
                          <Route path="/Article/auteur/:id" element={<ProfileOther />} />


              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
      </MyContext.Provider>

  );
}
