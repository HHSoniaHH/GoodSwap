import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Addost = ({getAllPosts}) => {
    const [showModal, setShowModal] = React.useState(false);
    const token = window.localStorage.getItem("token");
    const id = window.localStorage.getItem("id");
    const [categories, setCategories] = useState(null);

    const [product, setProduct] = useState({
        nom: '',
        prix: '',
        desc:'',
        type:'don',
        image: null,
        catigorie:'',
   
        createdBy:id,
        
      });
    const handleChange = (e) => {
        setProduct({
          ...product,
          [e.target.name]: e.target.value
        });
      };
    const handleImageChange = (e) => {
        setProduct({
          ...product,
          image: e.target.files[0]
        });
      };

    const handleSubmit = (e) => {

        e.preventDefault();
      
        const formData = new FormData();
        formData.append('nom', product.nom);
        formData.append('prix', product.prix);
        formData.append('desc', product.desc);
        formData.append('type', product.type);
        formData.append('catigorie', product.catigorie);
        formData.append('article', product.image);
        formData.append('createdBy', product.createdBy);

        axios.post('http://localhost:4000/createP', formData,{headers: {
            Authorization:`JWT ${token}`
        }})
          .then(response => {
            console.log(response.data);
            if(response.data.success===true){
                setShowModal(false)
            toast.success(response.data.message, {
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
                 
                async function fonctionAExecuter()
               {
                getAllPosts()
               }
            }else if (response.data.success===true){
                toast.error(response.data.message, {
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
          })
          .catch(error => {
            console.log(error);
        
          });
      };

useEffect(()=>{
  axios.get('http://localhost:4000/getAllcat')
    .then(response => {
      setCategories(response.data.data);
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
},[])



  return (
    <>
                        <ToastContainer/>

    <button
        class="linear  flex items-center  justify-center rounded-3xl text-brand-500 px-2 py-2 text-sm font-bold  transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 hover:text-white"
        type="button"
        onClick={() => setShowModal(true)}
      >
<CiCirclePlus  style={{fontWeight:'bold',fontSize:35}}/>   </button>
        {showModal ? (
      <>
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative w-auto my-6 mx-auto bg-white rounded-xl  max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold"> Ajouter un nouveau don </h3>
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
                
                 
                  <hr/>
                <form class="w-full mt-4 " onSubmit={handleSubmit}>
                 <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-2 ">
              
                    <input
                      type="text"
                      name="nom" value={product.nom} onChange={handleChange}
                      class="bg-gray-50 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                      placeholder="Nom"
                      
                    />
                 
                  
                    <input
                      type="number"
                      name="prix" value={product.prix} onChange={handleChange}
                      class="bg-gray-50  outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black"
                      placeholder="prix"
                      
                    />
               
                 </div>
                 
                  <div className=" mb-2">
                   
                    <textarea name="desc" value={product.desc} onChange={handleChange}  rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg   focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"  placeholder="Description du don"></textarea>

                                  </div>

                 <div className=" mb-2">

                
           
                    {/* <input
                      type="text" name="catigorie" value={product.catigorie} onChange={handleChange}
                  
                      class="bg-gray-50  outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black"
                      placeholder="catigorie"
                      
                    /> */}
                    <select  value={product.catigorie}  onChange={handleChange} name='catigorie' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500  sm:text-sm">
                    <option value=""  disabled>Selectionner une categorie <option value="default" selected></option></option>
  {categories.map(category => (
    <option key={category._id}  value={category.NomCatigorie}>{category.NomCatigorie}</option>
  ))}
    

</select>
                  </div>
                  <div className="mb-2">
                    <input
                      type="file" name="image" onChange={handleImageChange}
                  
                      class="bg-gray-50  outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black"
                      placeholder="image"
                      
                    />
                  </div>
            
                 
                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl py-2   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Ajouter                   </button>
                
                </form>
              </div>
    
             
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
    </>
  )
}

export default Addost

