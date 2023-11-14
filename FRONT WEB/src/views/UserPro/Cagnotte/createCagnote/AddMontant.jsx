 
 import React, { useContext, useState } from "react";
import { CiBookmarkPlus } from "react-icons/ci";



import axios from "axios";

const AddMontant = ({ idCagnotte,GetAllCagnotte}) => {
  const [showModal, setShowModal] = React.useState(false);
  const id = window.localStorage.getItem("id");

  const [montant, setMontant] = useState({
    idDonnateur: id,
    Montant:''

  });

  const handleChange = (e) => {
    setMontant({
      ...montant,
      [e.target.name]: e.target.valueAsNumber,
    });
  };
  const handleSubmit = (e) => {

    e.preventDefault();
    axios
      .post(`http://localhost:4000/addMontant/${idCagnotte}`, montant)
      .then((res) => {
        console.log(res.data);
      console.log(montant.Montant)
        setShowModal(false);
        setMontant({
            idDonnateur: id,
            Montant:''
        })
        GetAllCagnotte();
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
                    Ajouter un montant   
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
            
                  <form class="w-full mt-4 flex flex-col justify-center items-center " onSubmit={handleSubmit}>
                  
                  <div className="flex justify-center items-center w-full mb-4 gap-1 ">
                  <input
                      type="number"
                      name="Montant" value={ Number(montant.Montant)} onChange={handleChange}
                      class="bg-gray-50  outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8/12 p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black"
                      placeholder="Montant"
                      
                    />
                   <label className="text-xl font-poppins font-bold" htmlFor="">DA</label>
                  </div>

                    <button
                      type="submit"
                      class="w-9/12 text-white flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl py-2   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Valider    
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

export default AddMontant;
