import React from 'react';

// import aos
import Aos from 'aos';
// import aos css
import 'aos/dist/aos.css';
import Header from '../../components/Homepage/Header';
import Hero from '../../components/Homepage/Hero';
import Feature1 from '../../components/Homepage/Feature1';
import Feature2 from '../../components/Homepage/Feature2';
import Feature3 from '../../components/Homepage/Feature3';
import Product from '../../components/Homepage/Product';
import Pricing from '../../components/Homepage/Pricing';
import Testimonials from '../../components/Homepage/Testimonials';
import Cta from '../../components/Homepage/Cta';
import Footer from '../../components/Homepage/Footer';

// import components


const Home = () => {
  // initialize aos
  Aos.init({
    duration: 1800,
    offset: 100,
  });
  return (
    <div className='overflow-hidden bg-lightPrimary dark:!bg-navy-900'>
      <Header />
      <Hero />
      <Feature1 />
      <Feature2 />
      <Feature3 />
      <Product />
      <Pricing />
      <Testimonials />
      <Cta />
      <Footer />
      {/* <div className='h-[4000px]'></div> */}
    </div>
  );
};

export default Home;
