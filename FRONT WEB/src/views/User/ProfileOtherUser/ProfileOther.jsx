import React, { useEffect, useState,createContext } from 'react';
import axios from 'axios';
import defaultimage from '../../../img/defaultProfile.png'
import { useParams } from 'react-router-dom';
import Banner from '../Profile/profile/components/Banner';
import Header from '../../../components/Homepage/Header';
import Footer from '../../../components/Homepage/Footer';
import Widget from '../../../components/widget/Widget';

import { Avis } from '../../../components/widget/Avis';
import { IoChatbubblesOutline } from 'react-icons/io5';
import AjouterUnAvis from '../../../components/widget/AjouterUnAvis';

export const MyContext = createContext({});
function ProfileOther() {
    const { id } = useParams();
const [user,setUser]=useState("");
const idSender = window.localStorage.getItem('id');
const [avis,setAvis]=useState([]);

const token = window.localStorage.getItem('token');
const [Data, setData] = useState(
    {senderId:idSender,
    receiverId:id
   })
   async function fetchUserInfo() {
    try {
      await axios.get(`http://localhost:4000/user/${id}`).then(res=>{console.log(res.data);
          setUser(res.data.data);
          setAvis(res.data.data.Avis);});
          
     

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    

    if (token) {
      fetchUserInfo();
    }
  }, []);
 
  const createChat =async ()=>{
    await axios.post('http://localhost:4000/chat/', Data).then(res=>{
      console.log(res.data)
     
if(res.data.success===false){
  if (
    window.confirm(`Vous avez déja eu une conversation avec ${user.fname}  ${user.lname} Vous voulez accèder directement vers votre boite message`)
  ) {
    window.location.href = `/Message`;
  }else{return   
  }
  }else { window.location.href = `/Message`;}

 
    }
  
    );
  
  }
  return (
   
    <MyContext.Provider value={user} > 

<div className='bg-lightPrimary dark:!bg-navy-900'>

<div class="flex  gap-4  ">
<div className='w-3/12 flex  h-96 flex-col rounded-xl     '>

 <h4 className="ml-1  text-2xl font-bold text-navy-700 dark:text-white text-center mb-4">
 Avis des utilisateurs

          </h4>
          <div className='items-center flex justify-end'>
<AjouterUnAvis  userId={user._id}
                username={user.fname +"        "+ user.lname}
               fetchUserInfo={()=>fetchUserInfo()}


/>

</div>
<div className='overflow-y-auto p-5 rounded-xl  '>
{avis.map((review) => (
        <div key={review._id} className='mb-2 '  >
<Avis
    avatar={review.avatar || defaultimage}
    commentaire={review.text}
    username={review.auteur}
    rate={review.rating}

  />
        </div>
      ))}

</div>


</div>
       <div className='w-3/6'>
       <Banner 
         image= {user.avatar || defaultimage}
         username={user.fname + user.lname}
         email={user.email}
          smiles={user.smiles}
          />

            
       </div>
 
</div>
      <div class="text-center my-3 flex gap-6 justify-center">
          { id!==idSender? <button
      onClick={createChat}
        className="linear  flex items-center  justify-center gap-5 rounded text-white bg-brand-500 px-2 py-2 text-xl font-bold  transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 hover:text-white"
        >Je contacte le Swaper    <IoChatbubblesOutline size={25} />
        
      </button>:null}
            </div>

<Footer/>
</div>
</MyContext.Provider>
   
  );
}

export default ProfileOther;






