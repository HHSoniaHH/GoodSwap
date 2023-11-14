import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdateImage = () => {
    const [file, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const token =  window.localStorage.getItem('token');
      const formData = new FormData();
      formData.append('profile',
  
        file
     );
  
      try {
        const response = await axios.post('http://localhost:4000/upload-profile', formData, {
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
  return (
    <div>
                  <ToastContainer/>

   <form className="flex items-center justify-between">
        <div class="flex items-center justify-center  mt-2 mb-2">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center   border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-blue-600 dark:hover:border-gray-200 dark:hover:bg-gray-100"
          >
            <div class="flex flex-col items-center justify-center ">
         
              <p class="text-sm text-gray-900 dark:text-gray-900">
                
            <input id="dropzone-file" onChange={handleFileChange} type="file" className="hidden" />
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
          onClick={handleSubmit}
            className="linear  flex items-center  justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="submit"
          >
            Changer votre photo de profile
          </button>

        </div>
      </form>
    </div>
  )
}

export default UpdateImage