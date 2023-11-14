import React, { useState } from "react";
import { Link } from "react-router-dom";
import PO from "../../img/welcome-img.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Inscription = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    UserType: "Utilisateur",
  });
  const { setProfile } = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const singup = await axios.post("http://localhost:4000/cree", formData);

    console.log(singup.data);
    if (singup.data.success === true) {
      window.localStorage.setItem("user", JSON.stringify(singup.data));

      toast.success("Inscrit avec succes", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(fonctionAExecuter, 2000);

      async function fonctionAExecuter() {
        //  const signInRes =  await axios.post('http://localhost:4000/login',
        // { email:formData.email,password:formData.password});
        //  window.localStorage.setItem("token", signInRes.data.token);
        //  window.localStorage.setItem("loggedIn", true);
        //  window.localStorage.setItem("id", signInRes.data.user.id);

        //  if (signInRes.data.success) {
        //    console.log(signInRes.data)

        window.location.href = "./verifier";

        //       }
      }
    } else if (singup.data.success === false) {
      toast.error(singup.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <section className=" relative py-16 h-full">
        <div className=" px-16 h-full text-gray-800  pt-0 pb-20 mb-16">
          <div className="flex xl:justify-between lg:justify-between lg:ml-16 justify-center items-center flex-wrap   ">
            <div className="grow-0 shrink-1  md:shrink-0 basis-auto lg:ml-8 xl:w-5/12 lg:w-5/12 md:w-5/12  md:mb-11">
              <img
                src={PO}
                className="w-5/6 "
                data-aos="fade-right"
                data-aos-delay="500"
                alt="Sample"
              />
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="900"
              className=" w-full mt-0 p-2 my-0 md:px-4 lg:w-6/12 dark:shadow-gray-800    rounded-2xl shadow-2xl"
            >
              <form onSubmit={handleSubmit}>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <h1 className="text-center  text-blue-900 font-bold text-2xl mx-4 mb-2">
                    Créer un nouveau compte
                  </h1>
                </div>

                {/* {userType === "UserPro" ? (
            <div className="mb-3">
              <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 mb-1 rounded-lg focus:outline-none focus:shadow-outline"
             
            type="text" placeholder="Code Secret"
            onChange={(e) => setSecretKey(e.target.value)}
             />
            </div>
          ) : null} */}

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-4 mt-2">
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    placeholder="Nom"
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    placeholder="Prenom"
                    type="text"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                  />
                </div>
                <input
                  className="w-full bg-gray-100 text-gray-900 mt-2 p-3 mb-1 rounded-lg focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Adresse Email"
                />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-4 mt-2">
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    placeholder="Mot de passe"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    placeholder="Confirmer ton mot de passe"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                {/* <div className="block ">
            Inscrit comme 
           
         <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-2 mt-2">
         <div class="flex items-center pl-4 border rounded border-[#ffaa45] h-8">
          <input id="bordered-radio-1" type="radio" name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "/>
        <label htmlfor="bordered-radio-1" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-black">Utilisateur</label>
          </div>
       <div className="flex items-center pl-4 border  rounded border-[#ffaa45] h-8">
           <input  id="bordered-radio-2" type="radio"  name="UserType"
              value="UserPro"
              onChange={(e) => setUserType(e.target.value)}
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "/>
         <label htmlfor="bordered-radio-2" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-black">Utilisateur Pro</label>
        </div>
         </div>
          
          </div> */}

                <div className="text-center  justify-center">
                  <button
                    className=" text font-bold tracking-wide bg-blue-900 text-gray-100 p-2 text-xl rounded w-full 
                      focus:outline-none focus:shadow-outline hover:bg-blue-800 hover:shadow-lg"
                    type="submit"
                  >
                    Créer mon compte
                  </button>
                  <ToastContainer />

                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-sm mx-4 mb-0  font-semibold  pt-1 text-center ">
                      Je suis un membre ?
                    </p>
                  </div>
                  <Link
                    className="text-white  duration-200  ease-in-out"
                    to="/login"
                  >
                    <button
                      type="button"
                      className=" justify-center w-4/6  mb-4  py-2 bg-[#ffaa45] text-white font-bold  text-md   rounded shadow-md hover:bg-[#FFC060]  transition duration-150 ease-in-out"
                    >
                      Se connecter
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inscription;
