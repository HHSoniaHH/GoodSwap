import React from 'react';
// import data
import { features } from '../../variables/data';

const Feature1 = () => {
  // destructure features
  const { feature1 } = features;
  // destructure feature1
  const { pretitle, title, subtitle, btnLink, btnIcon, image } = feature1;
  return (
    <section className='section ùb-32' id='section1'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:gap-x-[30px]'>
          {/* text */}
          <div className='flex-1' data-aos='fade-right' data-aos-offset='2' data-aos-delay='200'>
            <div className='pretitle'>{pretitle}</div>
            <h2 className='title text-navy-700 dark:text-white'>{title}</h2>
            <p className='lead'>{subtitle}</p>
            <button className='btn-link flex items-center gap-x-3 hover:gap-x-5 transition-all' >
              {btnLink} <img src={btnIcon}  alt='' />
            </button>
          </div>
          {/* image */}
          <div className='flex-1 ' data-aos='fade-left' data-aos-offset='2' data-aos-delay='200'>
            <img src={image} className="w-120" alt='' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature1;
