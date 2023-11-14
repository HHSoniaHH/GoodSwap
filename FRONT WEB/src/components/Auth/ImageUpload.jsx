import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Homepage/Header";

const ImageUpload = (props) => {
  const [file, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log()
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
      window.localStorage.setItem("loggedIn", true);

      console.log(response.data);
      window.location.href='./user';
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <>
   <Header/>
    <div className="flex justify-center ">
      <form className="w-64 items-center">
        <div class="flex items-center justify-center w-full mt-8 mb-16">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-blue-600 dark:hover:border-gray-200 dark:hover:bg-gray-100"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mb-3 text-gray-900"
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
              </svg>
              <p class="mb-2 text-sm text-gray-900 dark:text-gray-900">
                
            <input id="dropzone-file" onChange={handleFileChange} type="file" className="hidden" />
               {file?(<img  width={120} alt=" profile" src={require('../../assets/img/correct.png')} />):<span class="font-semibold">Selectionner pour charger une photo</span>}
              </p>
            </div>
          </label>
        </div>
        <div className="flex gap-12 justify-center ">
          <button
          onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Charger
          </button>

          <Link class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" to={"/user"}>ignorer</Link>
        </div>
      </form>
    </div></>
  );
};

export default ImageUpload;
