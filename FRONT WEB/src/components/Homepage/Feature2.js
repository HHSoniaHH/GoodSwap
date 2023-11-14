import React from 'react';
// import data
import { features } from '../../variables/data';

const Feature2 = () => {
  // destructure features
  const { feature2 } = features;
  // destructure feature2
  const { pretitle, title, subtitle, btnLink, btnIcon, image } = feature2;
  return (
    <section className='section min-h-[500px]'>
      <div className='container mx-auto '>
      <div className='flex flex-col lg:flex-row lg:items-center lg:gap-x-[30px]'>
          {/* image */}
          <div className='flex-1' data-aos='fade-right' data-aos-offset='2' data-aos-delay='200'>
            <img src={image} alt='' />
          </div>
          {/* text */}
          <div className='flex-1 ' data-aos='fade-left' data-aos-offset='2' data-aos-delay='200'>

            <div className='pretitle'>{pretitle}</div>
            <h2 className='title text-navy-700 dark:text-white'>{title}</h2>
            <p className='lead'>{subtitle}</p>
            <button className='btn-link flex items-center gap-x-3 hover:gap-x-5 transition-all' >
              {btnLink} <img src={btnIcon} alt='' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature2;
