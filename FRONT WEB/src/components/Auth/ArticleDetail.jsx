import axios from "axios";
import React, { useCallback, useEffect, createContext, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Homepage/Footer";
import Header from "../Homepage/Header";
import UpdatePoste from "./updatePost";
export const ContextPost = createContext({});

const ArticleDetail = () => {
  const { id } = useParams();
  const IsAdmin = window.localStorage.getItem("IsAdmin");
  const token = window.localStorage.getItem("token");
  const idUser = window.localStorage.getItem("id");
  const [article, setArticle] = useState({});
  const userProfile = article.createdBy;

  const getArticle = useCallback(async () => {
    await axios
      .get(`http://localhost:4000/product/${id}`, {
        headers: { Authorization: `JWT ${token}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setArticle(res.data.data);
      });
  }, [id, token]);

  useEffect(() => {
    getArticle();
    console.log(userProfile);
  }, [getArticle]);
  const ProfileAuteur = () => {
    {
      IsAdmin
        ? (window.location.href = `/admin/Article/auteur/${article.createdBy}`)
        : (window.location.href = `/user/Article/auteur/${article.createdBy}`);
    }
  };

  //demander un article
  const handleDemandeArticle = (e) => {
    e.preventDefault();

    if (
      window.confirm(`Est ce que vous voulez vraiment demander l'article? `)
    ) {
      axios
        .post(`http://localhost:4000/createDemandeArticle`, {
            articleId: id,
            adopteurId: idUser,
            donneurId: userProfile,
        })
        .then((res) => {
         alert(res.data.message);
        });
    }
  };
  return (
    <ContextPost.Provider value={article}>
      <div className="bg-lightPrimary dark:!bg-navy-900">
      

        <div class="md:flex items-start justify-center py-10 h-full w-full 2xl:px-20 md:px-6 px-4">
          <div class=" md:block hidden">
            <img class="w-full rounded-2xl" alt="" src={article.image} />
          </div>

          <div class="xl:w-2/5 md:w-1/2 lg:ml-8 lg:w-full md:ml-6 md:mt-0 ">
            <div class="border-b border-gray-200 ">
              <p class="text-xl text-right leading-none text-gray-600 dark:text-gray-300 ">
                {article.type}
              </p>
              <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
                {article.nom}
              </h1>
            </div>
            <div class="py-4 border-b border-gray-200 flex items-center justify-between">
              <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
                Catigorie
              </p>
              <div class="flex items-center justify-center">
                <p class="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">
                  {article.catigorie}
                </p>
              </div>
            </div>
            <div class="py-4 border-b border-gray-200 flex items-center justify-between">
              <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
                Status
              </p>
              <div class="flex items-center justify-center">
                <p class="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">
                  {article.status}
                </p>
              </div>
            </div>
            <div className=" w-full mb-2 ">
              <p class="xl:pr-48 md:w-full text-base lg:leading-tight w-full leading-normal text-gray-600 dark:text-gray-300 mt-7">
                {article.desc}
              </p>
              <p class="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">
                Product Code: {article._id}
              </p>
              <p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
                prix: {article.prix}
              </p>
              <p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
                {article.createdBy}
              </p>
              <p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
                Depth: 5.1 inches
              </p>
              <p class="md:w-96 text-base leading-normal text-gray-600 dark:text-gray-300 mt-4">
                Composition: 100% calf leather, inside: 100% lamb leather
              </p>
            </div>
          
          
            {userProfile !== idUser && article.status!=='Recuperer'?    <button
            onClick={handleDemandeArticle}
            className="linear w-full flex items-center mb-6 justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Demander
          </button>:null}
           
            {userProfile !== idUser ? (
           <>
           
              <button
                className="linear w-full flex items-center mb-6 justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                onClick={ProfileAuteur}
              >
                Visiter le profile
              </button></>
               
            ) : null}
            {IsAdmin || idUser === userProfile &&  article.status!=='Recuperer' ? <UpdatePoste /> : null}
          </div>
        </div>
        {IsAdmin ? null : <Footer />}
      </div>
    </ContextPost.Provider>
  );
};

export default ArticleDetail;
