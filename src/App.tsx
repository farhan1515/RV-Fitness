import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Trainers from './components/Trainers';
import Gallery from './components/Gallery';
import Programs from './components/Programs';
import Membership from './components/Membership';
import Location from './components/Location';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Navbar />
          <Hero />
          <About />
          <Trainers />
          <Gallery />
          <Programs />
          <Membership />
          <Testimonials />
          <Location />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;