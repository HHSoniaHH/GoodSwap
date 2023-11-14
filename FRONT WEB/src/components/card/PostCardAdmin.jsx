import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from ".";
import { MdMoreHoriz } from "react-icons/md";
import Dropdown from "../dropdown";

const PostCardAdmin = ({
  title,
  author,
  price,
  image,
  desc,
  extra,
  status,
  handleClick,
  btn,
  id,
}) => {
  const [heart, setHeart] = useState(true);
  const ArtcleDetail = () => {
    window.location.href = `/admin/ArticleDetail/${id}`;
  };
  return (
    <Card 
      extra={`flex flex-col w-64  h-full !p-4 3xl:p-![18px] bg-white  ${extra}`}
    >
      <div className="h-full w-56">
        <div className="flex justify-end mb-2 ">
          <Dropdown 
            button={<MdMoreHoriz/>}
            children={
              <div className="flex h-32 w-48 flex-col fil backdrop-blur-xl bg-lightPrimary  rounded-[20px]  bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">

                <button
                  className="btn mt-2 mb-2 text-red-600    "
                  onClick={handleClick}
                >
                  Supprimer {btn}
                </button>
                <hr />
              </div>
            }
            classNames={"py-2 top-8 -left-[180px] w-max"}
          />
        </div>{" "}
        <div className="relative   w-56" >
          <img
            src={image}
            onClick={ArtcleDetail}
            className="mb-3 h-56 w-56  cursor-pointer rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          <button
            onClick={() => setHeart(!heart)}
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
              {heart ? (
                <IoHeartOutline />
              ) : (
                <IoHeart className="text-brand-500" />
              )}
            </div>
          </button>
        </div>
        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {" "}
              {title}{" "}
            </p>
            <p className=" text-sm lead h-16  line-clamp-4 overflow-auto  max-w-24">
              {desc}{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between  md:items-start  lg:justify-between  2xl:items-start 3xl:items-center 3xl:justify-between">
          <div className="">
            <p className=" text-sm text-left ">{status} </p>

            <div className="flex mb-2  gap-1 justify-start items-center">
              <p className="text-lg text-left font-bold text-brand-500 dark:text-white">
                {price}
              </p>
              <img
                src={require("../../img/smile.png")}
                className="w-6 h-6"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-wrap items-end justify-end">
            <button
              href=""
              onClick={ArtcleDetail}
              className=" mb-2 rounded-[20px]  bg-brand-900 px-2 flex justify-center items-center py-1 text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            >
              Savoir plus
              <svg
                aria-hidden="true"
                class="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <p className="text-sm font-medium text-gray-600  ">
              par {author}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCardAdmin;
