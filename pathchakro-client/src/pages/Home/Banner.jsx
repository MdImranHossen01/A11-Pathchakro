import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const slides = [
    {
      id: 1,
      title: "Your Online Study Group, Reimagined",
      description: "Collaborate, create assignments, provide feedback, and succeed together. Pathchakro is the smart way to study with friends.",
      image: "https://images.pexels.com/photos/8429503/pexels-photo-8429503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Explore Assignments",
      link: "/assignments"
    },
    {
      id: 2,
      title: "Learn Smarter, Not Harder",
      description: "Join thousands of students who are already improving their grades through collaborative learning and smart assignment management.",
      image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Get Started",
      link: "/register"
    },
    {
      id: 3,
      title: "Transform Your Learning Experience",
      description: "Access a world of educational resources, connect with peers, and excel in your academic journey with our innovative platform.",
      image: "https://images.pexels.com/photos/714699/pexels-photo-714699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Discover More",
      link: "/about"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative min-h-[70vh] overflow-hidden shadow-xl">
      {/* Slides */}
      <div className="relative h-[70vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="max-w-3xl px-4 text-center text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="mb-8 text-lg md:text-xl max-w-2xl mx-auto">
                  {slide.description}
                </p>
                <Link to={slide.link}>
                  <motion.button
                    className="btn btn-primary btn-lg text-white font-semibold px-8 py-3 rounded-full shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {slide.cta}
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-xl" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={toggleAutoplay}
        className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;