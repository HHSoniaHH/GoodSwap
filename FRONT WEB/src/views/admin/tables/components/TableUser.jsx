import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card";
import defaultImage from "../../../../img/defaultProfile.png";

import React, {  useState } from "react";
import axios from "axios";
import UpdateImage from "../../../../components/Auth/updateimage";
const TableUser = ({getAllUser,filteredUsers,deleteUser}) => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const token = window.localStorage.getItem("token");
  const [showModal, setShowModal] = React.useState(false);
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    status: "",
  });



 
 
  const handleEditUser = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleUpdateUser = () => {
    axios
      .put(`http://localhost:4000/user/${editUser._id}`, editUser, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        const updatedUsers = users.map((user) => {
          if (user._id === editUser._id) {
            getAllUser();
          } else {
            return user;
          }
        });
        setUsers(updatedUsers);
        setEditUser(null);
      })
      .catch((error) => {
        console.error(`Error updating user: ${error.message}`);
      });
  };

  const handleCancelEdit = () => {
    setEditUser(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };





  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between">
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          Utilisateurs { filteredUsers.length}
        </div>
        <CardMenu />
      </div>

      <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table  className="w-full">
          <thead>
            <tr>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs ml-2 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Nom <span className="ml-2">Prénom</span>
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Mail
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Status
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Type
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0  font-semibold text-center "
                }
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody >
            {filteredUsers.map((user) => {
              return (
                <>
                  {" "}
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                        src={user.avatar || defaultImage}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>{" "}
                      <span className={"ml-3 font-bold "}>
                        {user.fname} {user.lname}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-circle text-green-500 mr-2">
                        {user.status}
                      </i>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user.UserType}
                    </td>
                    <td className="border-t-0 px-6  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex gap-9 justify-center  items-center">
                        <button
                          href="#"
                          class="font-medium bg-blue-500 p-1 w-16 rounded  text-white dark:text-white hover:text-blue-100"
                          onClick={() => {
                            handleEditUser(user);
                          }}
                        >
                          Modifier
                        </button>
                        <button
                          href="#"
                          class="font-medium text-white bg-red-600 p-1 w-16 rounded dark:text-white hover:text-red-300"
                          onClick={() => deleteUser(user._id, user.fname)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"></td>
                  </tr>
                  {showModal && editUser ? (
                    <>
                      <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
                        <div className="relative w-auto my-6 mx-auto bg-white rounded-xl  max-w-3xl">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                              <h3 className="text-3xl font-semibold">
                                {" "}
                                Mettre à jour
                              </h3>
                              <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                              >
                                <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}
                            <div class="px-12 py-8 w-full">
                              <form class="w-full mt-4 ">
                                
                                <UpdateImage/>
                             
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-6 ">
                                  <input
                                    type="text"
                                    name="fname"
                                    id="fname"
                                    value={editUser.fname || user.fname}
                                    onChange={handleInputChange}
                                    class="bg-gray-50 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                                    placeholder="Nom"
                                  />

                                  <input
                                    type="text"
                                    name="lname"
                                    id="lname"
                                    value={editUser.lname || user.lname}
                                    onChange={handleInputChange}
                                    class="bg-gray-50  outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black"
                                    placeholder="Prénom"
                                  />
                                </div>

                                <div className="mb-6">
                                  <input
                                    type="email"
                                    name="email"
                                    value={editUser.email || user.email}
                                    onChange={handleInputChange}
                                    class="bg-gray-50  outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black"
                                    placeholder="Adresse email"
                                  />
                        
                                </div>
                                <td>
                                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-2 mt-2">
                                    <div class="flex items-center pl-4 border rounded border-[#ffaa45] h-8">
                                      <input
                                        id="bordered-radio-1"
                                        type="radio"
                                        name="status"
                                        value="Active"
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                                      />
                                      <label
                                        htmlfor="bordered-radio-1"
                                        className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-black"
                                      >
                                        Active
                                      </label>
                                    </div>
                                    <div className="flex items-center pl-4 border  rounded border-[#ffaa45] h-8">
                                      <input
                                        id="bordered-radio-2"
                                        type="radio"
                                        name="status"
                                        value="Desactive"
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                                      />
                                      <label
                                        htmlfor="bordered-radio-2"
                                        className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-black"
                                      >
                                        Desactive
                                      </label>
                                    </div>
                                  </div>
                                </td>

                                <div className="flex justify-center gap-9 ">
                                  <button
                                    type="submit"
                                    onClick={() => handleCancelEdit()}
                                    class="w-full text-white bg-gray-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg py-1   text-center dark:bg-gray-300 dark:hover:bg-red-400 dark:focus:ring-gray-800"
                                  >
                                    Annuler
                                  </button>
                                  <button
                                    type="submit"
                                    onClick={() => handleUpdateUser()}
                                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg py-1   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                  >
                                    Mettre à jour
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TableUser;
