import React, { useState } from 'react';
// import data
import { product } from '../../variables/data';
// import images
import ArrowImg from '../../assets/img/product/cards/arrow.svg';

const Cards = () => {
  // index state
  const [index, setIndex] = useState(1);
  // destructure product data
  const { cards } = product;
  return (
    <>
      {/* cards */}
      <div className='flex flex-col gap-y-[30px] lg:flex-row lg:gap-x-[30px]'>
        {cards.map((card, cardIndex) => {
          // destructure card
          const { icon, title, subtitle } = card;
          return (
            <div
              key={cardIndex}
              data-aos='zoom-out'
              data-aos-offset='200'
              data-aos-delay='delay'
            >
              <div
                onClick={() => setIndex(cardIndex)}
                className={`${
                  index === cardIndex && 'bg-white shadow-2xl  dark:text-navy-700 '
                }  w-[350px] h-[350px] flex flex-col justify-center items-center mx-auto p-[65px] text-center rounded-[12px] cursor-pointer transition-all`}
              >
                {/* card icon */}
                <div className='mb-6'>
                  <img src={icon} alt='yay' />
                </div>
                {/* card title */}
                <div className={`${
                    cardIndex === index
                      ? ' text-dark dark:text-navy-700'
                      : ' text-navy-700 dark:text-white'
                  } mb-3 text-[30px] font-medium `} >{title}</div>
                {/* card subtitle */}
                <p className='mb-6 text-light'>{subtitle}</p>
                {/* arrow img */}
                {index === cardIndex && <img src={ArrowImg} alt='yay'/>}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cards;
