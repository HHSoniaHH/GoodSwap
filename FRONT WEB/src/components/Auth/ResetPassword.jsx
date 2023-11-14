import React, { useEffect, useState } from "react";
import PO from "../../img/welcome-img.png";
import axios from "axios";

const ResetPass = () => {
  // const location = useLocation();
  const [invalidUser, setInvalidUser] = useState("");
  const [busy, setBusy] = useState(true);

  const [error, setError] = useState('');

  const [newPassword, setNewPassword] = useState({
      password:'',
      confirmPassword:''
    });
    // const { token, id } = querystring.parse(location.search);
    
  // console.log(location);




  
  
  const handleOnchange = ({target})=>{
    const {name, value}=target
    setNewPassword({...newPassword,[name]:value})
    

    
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const id = window.localStorage.getItem("userId");
    const {password,confirmPassword}=newPassword
    if(password.trim().length < 8 || password.trim().length > 20 )
    {return setError('Entrer un mot de passe entre 8 et 20 ')}
    if(password!==confirmPassword ){
        return setError('les mots de passe ne sont pas cohérents ')
    }
    try {
        const { data } = await axios.post(
            `http://localhost:4000/reset`
            ,{id,password});
        console.log(data);
        if(data.success){
          alert(data.message)
          window.location.href='./login';
           
        }
        if (!data.success) {
          
          alert(data.message)
        }
      } catch (error) {
        if (error?.response?.data) {
          const { data } = error.response;
          if (!data.success) {
            alert(data.message)
          }
  
          return console.log(error.response.data);
        }
        console.log(error);
      }

}





  return (
    <section className=" relative h-full py-16 ">
      <div className=" px-16 h-full text-gray-800  pt-4 pb-20 mb-16">
        <div
          className="flex xl:justify-between lg:justify-between lg:ml-16 justify-center items-center flex-wrap
         "
        >
          <div className="grow-0 shrink-1  md:shrink-0 basis-auto lg:ml-8 xl:w-5/12 lg:w-5/12 md:w-5/12  md:mb-0">
            <img
              src={PO}
              className="w-5/6"
              alt="Sample"
              data-aos="faderight"
              data-aos-delay="500"
            />
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="900"
            className="  w-full mt-0 p-2 my-0 md:px-4 lg:w-6/12   rounded-2xl shadow-2xl"
          >
            <form onSubmit={handleSubmit}>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <h1 className="text-center  text-blue-900 font-bold text-2xl mx-4 mb-4">
                  Créer un nouveau mot de passe
                </h1>
              </div>
             {error && <p className="text-white text-center bg-red-600 p-2 mb-3 ">{error}</p>}
              <div className="mb-4">
                <input
                  className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  onChange={handleOnchange}

                  placeholder="Enter ton nouveau mot de passe"
                />
              </div>
              <div className="mb-4">
                <input
                  className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="password"
                  name="confirmPassword"
                  onChange={handleOnchange}
                  placeholder="Confirmer ton mot de passe"
                />
              </div>

              <div className="text-center  justify-center mt-4 mb-4">
                <button
                type="submit"
                  className=" text font-bold tracking-wide bg-blue-900 text-gray-100 p-2 text-xl rounded w-full 
                      focus:outline-none focus:shadow-outline hover:bg-blue-800 hover:shadow-lg"
                >
                  Mettre à jour{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPass;
