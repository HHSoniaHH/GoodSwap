import React, { useContext } from 'react';
import { MyContext } from '../../views/admin/Profile';
import UpdateImage from '../Auth/updateimage';
import defaultImage from './defaultProfile.png'
// components

export default function CardProfile() {
  const profile = useContext(MyContext);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative flex justify-center align-middle">
                <img
                  alt="..."
                  src={ profile.avatar ||defaultImage }
                  className="shadow-xl rounded-full h-auto align-middle border-none    w-2/4 max-w-50-px"
                />
              </div>
            </div>
            
            <div className="w-full  text-center   flex justify-center align-middle">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                    22
                  </span>
                  <span className="text-sm text-blueGray-400">Friends</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                    10
                  </span>
                  <span className="text-sm text-gray-400">Photos</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                    89
                  </span>
                  <span className="text-sm text-gray-400">Comments</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center ">
            <h3 className="text-2xl font-semibold leading-normal mb-2 text-gray-700 mb-2">
             {profile.fname} {profile.lname}
            </h3>
            <div className="text-lg leading-normal mt-0 mb-2 text-gray-400 font-bold ">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400"></i>{" "}
              {profile.email}
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-gray-400"></i>
              Solution Manager - Creative Tim Officer
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              University of Computer Science
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-11/12 px-4">
                <p className="mb-4 text-xs leading-relaxed text-start text-gray-700">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                  and records all of his own music, giving it a warm, intimate
                  feel with a solid groove structure. An artist of considerable
                  range.
                </p>
                <a
                  href="#pablo"
                  className="font-normal text-lightBlue-500"
                  onClick={(e) => e.preventDefault()}
                >
                  Show more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
