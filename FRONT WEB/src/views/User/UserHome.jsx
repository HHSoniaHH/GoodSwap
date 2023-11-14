import React, { useEffect, useState } from 'react'
import defaultImage from "../../img/autsh.png";

import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import PostCard from '../../components/card/PostCard';

const UserHome = () => {
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
    const filteredPosts = posts.filter((i) => i.type === "don");
    
  return (
    <div className='mt-12 relative'>
  <div className='justify-end items-end flex'>
  </div>
    <div className="mt-4 grid h-full w-full   ">
        
        <div className=" grid lg:grid-cols-4   gap-8 md:grid-cols-3 sm:grid-cols-2 2xl:grid-cols-1">
        {filteredPosts.map((posts) => {return     <PostCard
           id={posts._id}
            title={posts.nom}
            author={posts.auteur}
            price={posts.prix}
            image={posts.image || defaultImage } 
            desc={posts.desc}
            zed={posts.createdBy}
            status={posts.status}
            btn={<MdDeleteForever/>}
            handleClick={() => deleteUser(posts._id, posts.nom)}
        
          />})}
   
        </div>

        </div>
    </div>
   
  )
}

export default UserHome