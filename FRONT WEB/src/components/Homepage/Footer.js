import React from "react";
// import data
import { footer } from "../../variables/data";
// import components
import Copyright from "./Copyright";

const Footer = () => {
  // destructure footer data
  const { logo, links, newsletter, form } = footer;
  return (
    <footer className="pt-[142px] pb-[60px]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:justify-between gap-y-8">
          {/* logo */}
          <div 
          // data-aos="fade-up" data-aos-offset="200" data-aos-delay="300"
          >
            <img src={logo} className="h-24 " alt="" />{" "}
          </div>
          {/* list 1 */}
          <div 
          // data-aos="fade-up" data-aos-offset="200" data-aos-delay="500"
          >
            <div className="text-2xl uppercase font-medium mb-6 text-navy-700 dark:text-white">
              Links
            </div>
            <ul className="flex flex-col gap-y-3">
              {links.map((item, index) => {
                // destructure item
                const { href, name } = item;
                return (
                  <li key={index}>
                    <a
                      className="font-medium hover:text-accent transition text-navy-700 dark:text-white"
                      href={href}
                    >
                      {name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* list 2 */}
          <div 
          // data-aos="fade-up" data-aos-offset="200" data-aos-delay="700"
          >
            <div className="text-2xl uppercase font-medium mb-6 text-navy-700 dark:text-white">
              Legal
            </div>
            <ul className="flex flex-col gap-y-3">
              {links.map((item, index) => {
                // destructure item
                const { href, name } = item;
                return (
                  <li key={index}>
                    <a
                      className="font-medium text-navy-700 dark:text-white hover:text-accent transition"
                      href={href}
                    >
                      {name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* newsletter */}
          <div 
          // data-aos="fade-up" data-aos-offset="200" data-aos-delay="900"
          >
            <div className="text-2xl uppercase font-medium mb-6 text-navy-700 dark:text-white">
              {newsletter.title}
            </div>
            <div className="text-xl text-navy-700 dark:text-white mb-[18px]">
              {newsletter.subtitle}
            </div>
            {/* form */}
            <form className="max-w-[349px] mb-[10px]">
              <div className="h-[62px] p-[7px] flex border border-dark rounded-lg">
                <input
                  className="w-full h-full pl-6 border-none outline-none  placeholder:text-dark"
                  type="text"
                  placeholder={form.placeholder}
                />
                <button className="btn btn-sm bg-accent hover:bg-accentHover w-[102px] text-white">
                  {form.btnText}
                </button>
              </div>
            </form>
            <span className="text-sm text-navy-700 dark:text-white">
              {form.smallText}
            </span>
          </div>
        </div>
        <hr
          className="mt-10 mb-5"
          // data-aos="fade-up"
          // data-aos-offset="100"
          // data-aos-delay="200"
        />
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
