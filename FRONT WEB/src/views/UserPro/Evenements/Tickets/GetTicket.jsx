import axios from 'axios';
import React, { useEffect, useState } from 'react'
import GetAllEvenement from '../GetAllEvenement';
import AddCagnotte from '../../Cagnotte/createCagnote/AddCagnotte';
import ReserverUnticket from './ReserverUnticket';

const GetTicket = ({EventId}) => {
    const [showModal, setShowModal] = React.useState(false);
    const organisationId = window.localStorage.getItem("organisationId");

const [tickets,setTicket]=useState([])
useEffect(()=>{
getAllTicket()
},[])
const getAllTicket =async ()=>{
    try {
        
        await axios.get(`http://localhost:4000/getAllTicketByEvent/${EventId}`).then(res=>{
            setTicket(res.data.data)
        
            console.log(res.data.data)
        
        })
        
            } catch (error) {
                
            }
}
  return (
    <>
                

                { !organisationId?<button
class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"        type="button"
        onClick={() => setShowModal(true)}
      >
Reserver </button>:<button
class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"        type="button"
        onClick={() => setShowModal(true)}
      >
Mes tickets </button>}
        {showModal ? (
      <>
        <div className="fixed pt-8 inset-0 bg-gray-100 bg-opacity-75 flex justify-center z-50">
          <div className="relative w-full my-6 mx-auto bg-white rounded-xl  max-w-3xl  ">
            {/*content*/}
            <div className="h-full  border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Reservation de tickets</h3>
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
                
              {tickets.map((ticket) => {
        const date = new Date(ticket.date);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        return (
          <div class=" w-full lg:max-w-full lg:flex mb-4 ">
            <div class="h-48 lg:h-auto lg:w-48 flex-none  bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
              <img src={require("../../../../img/autsh.png")} alt="" />
            </div>
            <div class="border-r border-b w-full border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div class="mb-8  ">
             <div className='flex'>
             <label htmlFor=""> Nom de l'evenment :</label>
                <p class="text-sm text-gray-600 flex items-center">
               
                  {ticket.NomEvenement}{" "}
                </p>
             </div>
                <div class="flex">
                 <label htmlFor="">
                 Localisation : 
                 </label>
                 <p class="text-sm text-gray-600 flex items-center">
                 {ticket.location}
                 </p>
                </div>
                <div class="flex">
                 <label htmlFor="">
                 Date : 
                 </label>
                 <p class="text-sm text-gray-600 flex items-center">
                 {formattedDate}
                 </p>
                </div>
      

                <div className="max-w-56 ">
                <label htmlFor="">
                 Description de l'evenement : 
                 </label>
                  <p className=" text-sm lead h-10  line-clamp-4 overflow-auto  max-w-56">
                    {ticket.description}
                  </p>
                </div>
              </div>
              <div class="flex justify-between    ">
               <div className="flex flex-col ">
               <div className="flex  items-center gap-[164px]">
                  <label htmlFor="">Tickets initial</label>
                  <p class="text-gray-900 leading-none">
                    {ticket.nbrTickets}
                  </p>
                </div>
                <div className="flex  items-center text-green-500 gap-32">
                  <label htmlFor="">Tickets  disponible</label>
                  <p class=" leading-none">
                    {ticket.nbrTickets-ticket.telespectateurs.length}
                  </p>
                </div>
                <div className="flex  items-center gap-48">
                  <label htmlFor="">Prix</label>
                  <p class="text-gray-900 leading-none">
                    {ticket.prix} DA
                  </p>
                  
                </div>
                <div className="flex  items-center gap-44">
                  <label htmlFor="">Bénifice</label>
                  <p class="text-gray-900 leading-none">
                    {ticket.beneficeTickets} DA
                  </p>
                  
                </div>
               </div>
 { !organisationId?(<ReserverUnticket idTicket={ticket._id} getAllTicket={getAllTicket}/>):null}
               
              </div>
            </div>
          </div>
        );
      })}
                
            
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

export default GetTicket