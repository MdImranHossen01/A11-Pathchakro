import React from 'react';
import Banner from './Banner';
import Features from './Features';
import Faq from './Faq';
import HowItWorks from './HowItWorks'; // Notun section import kora hoyeche
import Testimonials from './Testimonials'; // Notun section import kora hoyeche

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <HowItWorks></HowItWorks> {/* Notun section add kora hoyeche */}
      <Testimonials></Testimonials> {/* Notun section add kora hoyeche */}
      <Faq></Faq>
    </div>
  );
};

export default Home;