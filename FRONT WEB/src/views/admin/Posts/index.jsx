import React, { useEffect, useState } from 'react'
import defaultImage from "../../../img/autsh.png";

import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import PostCardAdmin from '../../../components/card/PostCardAdmin';
import Addost from '../../User/Dons/AddPost/Addost';
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const token = window.localStorage.getItem("token");
  
    const getAllPosts= async () => {
        const res = await axios.get("http://localhost:4000/getAllArticle", {
            headers: {
                Authorization: `JWT ${token}`,
            },
        });
        if (res.data.success === true) {
            setPosts(res.data.data);
        }
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
      
      useEffect(() => {
        getAllPosts();
    },[]);
    const filteredUsers = posts.filter((i) => i.type === "don");
    
  return (
    <div className='mt-4'>
  <div className='justify-end items-end flex'>
  <Addost getAllPost={getAllPosts}/>
  </div>
    <div className="mt-4 grid h-full w-full   ">
        
        <div className="z-10 grid lg:grid-cols-4   gap-8 md:grid-cols-3 sm:grid-cols-2 2xl:grid-cols-1">
        {filteredUsers.map((posts) => {return     <PostCardAdmin
           id={posts._id}
            title={posts.nom}
            author={posts.auteur}
            price={posts.prix}
            image={posts.image || defaultImage } 
            desc={posts.desc}
            status={posts.status}
            btn={<MdDeleteForever/>}
            handleClick={() => deleteUser(posts._id, posts.nom)}
        
          />})}
   
        </div>

        </div>
    </div>
   
  )
}

export default Posts