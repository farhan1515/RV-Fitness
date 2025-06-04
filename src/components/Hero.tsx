import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative w-full h-screen flex items-center bg-hero-pattern bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-dark/70"></div>
      
      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto md:ml-0 px-4 text-center md:text-left pt-16 md:pt-20"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-anton mb-8 text-light leading-none">
            <span className="text-primary">Welcome to</span> <br />
            <span className="mt-4 block">RV FITNESS</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-oswald mb-8 text-secondary tracking-wide"
          >
            A Smarter Way To Get Fit.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-light-dark mb-10 max-w-xl"
          >
            Transform your body and mind with our expert trainers, state-of-the-art equipment, 
            and customized fitness programs designed to help you reach your goals.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <button
              type="button"
              className="btn btn-primary font-oswald"
              onClick={() => {
                const locationSection = document.getElementById('location');
                if (locationSection) {
                  locationSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Join Now
            </button>
            <button
              type="button"
              className="btn btn-outline text-light font-oswald"
              onClick={() => {
                const locationSection = document.getElementById('location');
                if (locationSection) {
                  locationSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Book a Free Trial
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.a 
        href="#about"
        initial={{ opacity: 0, y: -20 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.5, 
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-light"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} strokeWidth={1.5} />
      </motion.a>
    </section>
  );
};

export default Hero;