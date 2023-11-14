import React from 'react';
// import data
import { product } from '../../variables/data';
// import components
import Cards from './Cards';

const Product = () => {
  // destructure product data
  const { title } = product;
  return (
    <section className='section'>
      <div className='container  ml-12 '>
      <h2
          className='h2 mb-12 lg:mb-12 text-center text-navy-700 dark:text-white'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          {title}
        </h2>
       
        {/* title & subtitle */}
        <div className='flex flex-col justify-center  items-center lg:flex-row mb-10 lg:mb-20'>
      <Cards />
        </div>
        {/* cards */}
       
      </div>
    </section>
  );
};

export default Product;
