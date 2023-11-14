import React, { useState } from 'react';
// import data
import { pricing } from '../../variables/data';
// import icons
import { HiCheck, HiOutlineArrowNarrowRight } from 'react-icons/hi';

const Pricing = () => {
  // index state
  const [index, setIndex] = useState(1);
  // destructure pricing
  const { title, cards } = pricing;
  return (
    <section className='section'>
      <div className='container ml-8 '>
        {/* title */}
        <h2
          className='h2 mb-10 lg:mb-20 text-center text-navy-700 dark:text-white'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          {title}
        </h2>
        {/* cards */}
        <div className='  flex justify-center items-center lg:flex-row lg:gap-x-[30px] gap-y-[30px] lg:gap-y-0 '>
          {cards.map((card, cardIndex) => {
            // destructure card
            const { icon, title, services, price, userAmount, btnText, delay } =
              card;
            // card
            return (
              <div
                data-aos='fade-up'
                data-aos-delay={delay}
                data-aos-offset='300'
                key={cardIndex}
              >
                <div
                  onClick={() => setIndex(cardIndex)}
                  className={`${
                    cardIndex === index
                      ? 'bg-white shadow-2xl'
                      : 'border border-grey'
                  } w-[350px] h-[500px] rounded-[12px] p-[40px] cursor-pointer transition-all`}
                >
                  {/* card icon */}
                  <div className='mb-8'>
                    <img src={icon} alt='' />
                  </div>
                  {/* card title */}
                  <div   className={`${
                    cardIndex === index
                      ? ' text-dark dark:text-navy-700'
                      : ' text-navy-700 dark:text-white'
                  } text-[32px] font-semibold mb-8 `}
                   >{title}</div>
                  {/* card services */}
                  <div className='flex flex-col gap-y-2 mb-6'>
                    {services.map((service, index) => {
                      // destructure service
                      const { name } = service;
                      return (
                        <div
                          className='flex items-center gap-x-[10px]'
                          key={index}
                        >
                          <HiCheck className='text-light' />
                          <div className='dark:text-light'>{name}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className='mb-10'>
                    <div>
                      <span   className={`${
                    cardIndex === index
                      ? ' text-white dark:text-navy-700'
                      : ' text-navy-700 dark:text-white'
                  } text-2xl font-semibold `}>{price}/</span>
                      <span className='text-xl text-light font-light'>
                        year
                      </span>
                    </div>
                    <div className='text-base text-light'>{userAmount}</div>
                  </div>
                  {/* btn */}
                  <button
                    className={`${
                      cardIndex === index
                        ? 'bg-accent hover:bg-accentHover text-white'
                        : 'border border-accent text-accent'
                    } btn btn-sm space-x-[14px]`}
                  >
                    <span>{btnText}</span>
                    <HiOutlineArrowNarrowRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
