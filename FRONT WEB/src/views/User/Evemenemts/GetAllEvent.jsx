import React from 'react'
import axios from 'axios'

import { useEffect } from 'react'
import { useState } from 'react'
import GetTicket from '../../UserPro/Evenements/Tickets/GetTicket'
const GetAllEvent = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    GetAllEvents();
  }, []);
  const GetAllEvents = async () => {
    axios
      .get(`http://localhost:4000/getAllEvent`)
      .then((res) => {
        setEvents(res.data.data);
        console.log(res.data.data);
      });
  };


  return (
    <div class="p-10 gap-4">
    {events.map((event) => {
      const date = new Date(event.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      return (
        <div class=" w-full lg:max-w-full lg:flex mb-4 ">
          <div class="h-48 lg:h-auto lg:w-48 flex-none  bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            <img src={require("../../../img/autsh.png")} alt="" />
          </div>
          <div class="border-r border-b w-full border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="mb-8  ">
              <p class="text-sm text-gray-600 flex items-center">
                <svg
                  class="fill-current text-gray-500 w-3 h-3 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                </svg>
                {event.titre}{" "}
              </p>
              <div class="text-gray-900 font-bold text-xl mb-2">
                {event.location}{" "}
              </div>
              <h1>{formattedDate} </h1>

              <div className="max-w-56 ">
                <p className=" text-sm lead h-10  line-clamp-4 overflow-auto  max-w-56">
                  {event.description}
                </p>
              </div>
            </div>
            <div class="flex justify-between    ">
             <div className="flex flex-col ">
             <div className="flex  items-center gap-16">
                <label htmlFor="">Nombre de participants</label>
                <p class="text-gray-900 leading-none">
                  {event.nbrParticipant}
                </p>
              </div>
              <div className="flex  items-center gap-10">
                <label htmlFor="">Nombre de telespectateurs</label>
                <p class="text-gray-900 leading-none">
                  {event.nbrTelespectateur}
                </p>
              </div>
             </div>
             <div className="gap-4 items-center flex">
             <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
Inscrire
             <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
</button>
<GetTicket EventId={event._id}/>
             </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
  )
}

export default GetAllEvent