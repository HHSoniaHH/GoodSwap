import React, { useContext, useState } from "react";
import { CiBookmarkPlus } from "react-icons/ci";
import { MyContext } from "../../layouts/home/User";
import { useParams } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";

import axios from "axios";

const AjouterUnAvis = ({ fetchUserInfo, userId ,username}) => {
  const [showModal, setShowModal] = React.useState(false);
  const id = window.localStorage.getItem("id");
  const profile = useContext(MyContext);
  const [avis, setAvis] = useState({
    createdBy: id,
    auteur: profile.fname + "" + profile.lname,
    text: "",
    rating: 0,
  });

  const handleChange = (e) => {
    setAvis({
      ...avis,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    const { createdBy, auteur, text, rating } = avis;
    e.preventDefault();
    axios
      .post(`http://localhost:4000/ajouterAvis/${userId}`, avis)
      .then((res) => {
        console.log(res.data);
      
        setShowModal(false);
        setAvis({
            createdBy: avis.createdBy,
            auteur: avis.auteur,
            text: "",
            rating: 0,
        })
        fetchUserInfo();
      });
  };

  return (
    <div>
      <button
        class="linear  flex items-center  justify-center rounded  text-brand-500 px-2 py-2 text-sm font-bold  transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 hover:text-white"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <CiBookmarkPlus size={25} />
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative  my-6 mx-auto bg-white rounded-xl  w-4/12">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold ">
                    {" "}
                    Ajouter un nouveau avis   
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
            
                  <form class="w-full mt-4 " onSubmit={handleSubmit}>
                  <div className=" mb-2">
                      <textarea
                        name="text"
                        value={avis.text}
                        onChange={handleChange}
                        rows="2"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg   focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                        placeholder="textription du don"
                      ></textarea>
                    </div>
   <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="rating">
            Evaluer {username}:
          </label>
          <div className="flex items-center">
            <StarRatingComponent
              name="rating"
              starCount={5}
              value={avis.rating}
              onStarClick={(value) =>
                setAvis((prevValues) => ({
                  ...prevValues,
                  rating: value,
                }))
              }
              required
              editing={true}
              renderStarIcon={(index, value) => {
                return (
                  <span
                    className={index <= value ? "text-yellow-400" : "text-gray-400"}
                    style={{ fontSize: "30px", width: "30px", height: "30px" }}
                  >
                    ★
                  </span>
                );
              }}
            />
            <span className="ml-2 text-gray-700 font-bold">
              {avis.rating} sur 5 étoiles
            </span>
          </div>
          </div>
              

                    <button
                      type="submit"
                      class="w-full text-white flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl py-2   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Ajouter    <CiBookmarkPlus size={25} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default AjouterUnAvis;
