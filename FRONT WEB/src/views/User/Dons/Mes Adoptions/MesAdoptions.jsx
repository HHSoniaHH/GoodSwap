
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { MdBarChart, MdDeleteForever } from 'react-icons/md';
import PostCard from '../../../../components/card/PostCard';
import defaultImage from '../../../../img/autsh.png'
import Addost from '../AddPost/Addost';
import { IoDocuments } from 'react-icons/io5';
import Widget from '../../../../components/widget/Widget';
import { MyContext } from '../../../../layouts/home/User';
const MesAdoptions = () => {

    const [posts, setPosts] = useState([]);
    const token = window.localStorage.getItem("token");
    const id = window.localStorage.getItem("id");
    useEffect(() => {
      
        getAllPosts();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getAllPosts= async () => {
       
        axios.get(`http://localhost:4000/${id}/articlesAdopter`)
        .then(response => {
            setPosts(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    const deleteUser = async (id, name) => {
        if (
          window.confirm(`Est ce que vous voulez vraiment supprimer ${name}!!!!`)
        ) {
          const res = await axios.delete(`http://localhost:4000/deleteArticle/${id}`, {
            headers: {
              Authorization: `JWT ${token}`,
            },
          });
          if (res.data.success === true) {
            console.log(res.data.message);
            getAllPosts();
          } else {
          }
        }
      };
    const MesAdoptions = posts.filter((i) => i.type === "don");
    const MesAdoptionsRecuperer= posts.filter((i) => i.status === "Recuperer");
    const MesAdoptionsReserver = posts.filter((i) => i.status === "Reserver");
    const MesAdoptionsDisponible = posts.filter((i) => i.status === "Disponible");

    
  return (
    
    <div className=" grid h-full w-full   ">
            <div className="mt-3 pr-2 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 mb-4 3xl:grid-cols-6">
  
  <Widget
    icon={<MdBarChart className="h-7 w-7" />}
    title={"Nombre de dons recuperés"}
    subtitle={MesAdoptionsRecuperer.length}
  />
   <Widget
    icon={<MdBarChart className="h-7 w-7" />}
    title={"Nombre de dons réservés"}
    subtitle={MesAdoptionsReserver.length}
  />
   <Widget
    icon={<MdBarChart className="h-7 w-7" />}
    title={"Nombre de dons disponibles"}
    subtitle={MesAdoptionsDisponible.length}
  />

  </div>
      <div className='flex justify-end relative mb-1'>

      </div>
        <div className=" grid  gap-5  md:grid-cols-3  lg:grid-cols-4 xs:grid-cols-1 sm:grid-cols-2 xs:flex sm:justify-center sm:items-center " >
        {MesAdoptions.map((posts) => {return    <>
            <PostCard 
           id={posts._id}
           title={posts.nom}
           author={posts.auteur}
           price={posts.prix}
           image={posts.image || defaultImage } 
           desc={posts.desc}
           status={posts.status}
           btn={<MdDeleteForever/>}
           handleClick={() => deleteUser(posts._id, posts.nom)}
           zed={posts.createdBy}
         />
        
         </>
         
          })}
   
        </div>

        </div>
  )
}

export default MesAdoptions


