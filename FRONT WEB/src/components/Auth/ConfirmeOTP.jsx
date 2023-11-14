import axios from "axios";
import React, { useEffect, useState } from "react";
import PO from "../../img/welcome-img.png";

const ConfirmeOTP = () => {
  const bb = window.localStorage.getItem("user");
  const myObject = JSON.parse(bb);
  const userId = myObject.data._id;
  const [otp, setOTP] = useState("");

  const handleonChange = ({ target }) => {
    const { value } = target;
    setOTP(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:4000/verifier", {
        otp,
        userId,
      });
      console.log(data.success);
      alert(data.message);
      window.location.href = "./ImageUpload";
    } catch (error) {
      if (error?.response?.data) {
        console.log(error.response.data);
        alert(error.response.data.message);
        console.log(otp);
      }
      console.error(error);
    }
  };
  const resetOtp = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:4000/resetOtp", {
       id: userId,
      });
      console.log(data.success);
      alert(data.message);
      
    } catch (error) {
      if (error?.response?.data) {
        console.log(error.response.data);
        alert(error.response.data.message);
        console.log(otp);
      }
      console.error(error);
    }
  };
  useEffect(() => {
    console.log(userId);
    console.log(otp);
  }, []);

  return (
    <section className=" relative h-full py-32 ">
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
                  Confirmer votre compte
                </h1>
              </div>

              <div className="mb-4 flex justify-center align-middle ">
                <input
                  className="w-5/12 bg-gray-100 text-gray-900 mt-2 p-3 tracking-4 text-center  text-3xl rounded-lg focus:outline-none focus:shadow-outline"
                  type="number"
                  maxLength="4"
                  placeholder="----"
                  name="otp"
                  onChange={handleonChange}
                  value={otp}
                />
              </div>

              <div className="text-center  justify-center mt-4 mb-4">
                <button
                  type="submit"
                  className=" text font-bold  tracking-wide bg-blue-900 text-gray-100 p-2 text-xl rounded w-5/12
                        focus:outline-none focus:shadow-outline hover:bg-blue-800 hover:shadow-lg"
                >
                  Confirmer{" "}
                </button>

                <button
                  type="button" onClick={resetOtp}
                  className=" justify-center w-48  mb-4  py-1  text-gray-500 font-bold  text-sm   rounded  hover:text-blue-500  transition duration-150 ease-in-out"
                >
                  Renvoyer le code 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmeOTP;
