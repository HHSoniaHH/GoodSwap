import React, { useState,useContext } from 'react';
import axios from 'axios';
import { ContextPost } from './ArticleDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
export default function UpdatePoste() {
  const [showModal, setShowModal] = React.useState(false);
  const [file, setSelectedFile] = useState(null);
  const token =  window.localStorage.getItem('token');
  const isAdmin =  window.localStorage.getItem('IsAdmin');
  const [categories, setCategories] = useState(null);

  const article = useContext(ContextPost);

  const [product, setProduct] = useState({
    nom: article.nom,
    prix: article.prix,
    desc:article.desc,
    type:'don',
    image: article.image,
    catigorie:article.catigorie,

   
    
  });
const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };


const handleSubmit = (e) => {
    e.preventDefault();



    axios.put(`http://localhost:4000/article/${article._id}`, product,{headers: {
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
            window.location.reload()
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

  const handleFileChangeImage = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpdateImage = async (event) => {
    event.preventDefault();
    const token =  window.localStorage.getItem('token');
    const formData = new FormData();
    formData.append('article',

      file
   );

    try {
      const response = await axios.put(`http://localhost:4000/article/image/${article._id}`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization:`JWT ${token}`
        }
      });

      console.log(response.data);

      toast.success(response.data.message, {
          position: "bottom-center",
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
          window.location.reload()
         }
    } catch (error) {
      console.log(error);
    }
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
        class="linear w-full flex items-center mb-6 justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Modifier  {isAdmin?"l'":"mon "}article 
      </button>
      
        {showModal ? (
      <>
        <div className="fixed inset-0  h-full bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative w-8/12  mx-auto bg-white rounded-xl  max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold"> Mettre à jour</h3>
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
             
              <form className="flex items-center justify-between ">
          <img src={article.image} alt="" className='w-32 h-32' />
        <div class="flex items-center  mt-2 mb-2">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center   border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-blue-600 dark:hover:border-gray-200 dark:hover:bg-gray-100"
          >
            <div class="flex flex-col items-center justify-center ">
         
              <p class="text-sm text-gray-900 dark:text-gray-900">
            <input id="dropzone-file" onChange={handleFileChangeImage} type="file" className="hidden" />
               {file?(<img  width={35} src={require('../../assets/img/correct.png')} />):     <svg
                aria-hidden="true"
                class="w-10 h-10  text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>}
              </p>
            </div>
          </label>
        </div>
        {file?(<h1 className='text-[12px] w-32'>Chargé avec succes</h1>):null}
        <div className="flex gap-12 justify-center ">
          <button
          onClick={handleUpdateImage}
            className="linear  flex items-center  justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="submit"
          >
            Changer votre photo de profile
          </button>

        </div>
      </form>
           
              <form class="w-full mt-4 " onSubmit={handleSubmit}>
                 <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-2 ">
              
                 <div className='block'>
                 <label className='mb-2' htmlFor="">Nom du produit</label> 
                    <input
                      type="text"
                      name="nom" value={product.nom || article.nom } onChange={handleChange}
                      class="bg-gray-50 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                      placeholder="Nom"
                      
                    />
                 </div>
                 
                 <div className='block'>
                 <label className='mb-2' htmlFor="">Valeur du produit</label> 
                    <input
                      type="number"
                      name="prix" value={product.prix || article.prix} onChange={handleChange}
                      class="bg-gray-50  outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black"
                      placeholder="prix"
                      
                    />
               </div>
                 </div>
                 
                  <div className=" mb-2">
                     <div className='block'>
                 <label className='mb-2' htmlFor="">Description du produit</label> 
                    <textarea name="desc" value={product.desc || article.desc} onChange={handleChange}  rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg   focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"  placeholder="Description du don"></textarea>

                                  </div>
                                  </div>

                 <div className="  grid grid-cols-1 gap-3 md:grid-cols-2 mb-2">

                
                 <div className='block mb-2'>
                 <label className='mb-2' htmlFor="">Catigorie du produit</label> 
                 <select  value={product.catigorie || article.catigorie}  onChange={handleChange} name='catigorie' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500  sm:text-sm">
                    <option value=""  disabled>Selectionner une categorie <option value="default" selected></option></option>
  {categories.map(category => (
    <option key={category._id}  value={category.NomCatigorie}>{category.NomCatigorie}</option>
  ))}
    

</select>                           </div>

                      <div className='block mb-2'>
                 <label className='mb-2' htmlFor="">Type du produit</label> 
                           <input
                      type="text" name="type" value={product.type || article.type} onChange={handleChange}
                  
                      class="bg-gray-50   outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black"
                      placeholder="catigorie"
                      
                    />                                  </div>

                  </div>
              
            
                 
                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl py-2   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Mettre A jour                    </button>
                
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
}

