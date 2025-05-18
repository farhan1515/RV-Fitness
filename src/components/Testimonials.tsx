import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  stars: number;
  transformation?: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "RV FITNESS completely transformed my life. I've lost 65 pounds and gained confidence I never thought possible. The trainers are exceptional and the community is so supportive.",
    name: "Michael Chen",
    title: "Member since 2020",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
    stars: 5,
    transformation: "Lost 65 lbs in 10 months"
  },
  {
    quote: "After trying multiple gyms, I finally found my fitness home at B1. The personal attention from trainers and the variety of classes keep me motivated. Best decision I've made for my health.",
    name: "Jessica Williams",
    title: "Member since 2019",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
    stars: 5,
    transformation: "Gained 12 lbs of muscle"
  },
  {
    quote: "As a busy professional, I needed a gym that understood my schedule. RV FITNESS offers 24/7 access and quick, effective workouts. Went from tired dad to energetic athlete in 6 months!",
    name: "David Thompson",
    title: "Member since 2021",
    image: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=800",
    stars: 4,
    transformation: "Completed first marathon"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section-padding bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-20 -mb-20"></div>
      
      <div className="container relative">
        <motion.h2 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title mb-16"
        >
          Success Stories
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-light rounded-lg p-8 md:p-12 relative"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden shrink-0 border-4 border-primary">
                <img 
                  src={currentTestimonial.image} 
                  alt={currentTestimonial.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20}
                      className={i < currentTestimonial.stars ? "text-secondary fill-secondary" : "text-light-darker"}
                    />
                  ))}
                </div>
                
                <blockquote className="text-light-dark italic mb-6 text-lg">
                  "{currentTestimonial.quote}"
                </blockquote>
                
                <div>
                  <p className="text-xl font-semibold">{currentTestimonial.name}</p>
                  <p className="text-primary">{currentTestimonial.title}</p>
                  {currentTestimonial.transformation && (
                    <p className="text-secondary mt-2 font-bebas tracking-wide">
                      {currentTestimonial.transformation}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentIndex ? 'bg-primary w-6' : 'bg-dark-lighter'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                ></button>
              ))}
            </div>
          </motion.div>
          
          <div className="flex justify-center mt-12 space-x-4">
            <button
              onClick={handlePrev}
              className="bg-dark-light hover:bg-primary transition-colors rounded-full p-3"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="bg-dark-light hover:bg-primary transition-colors rounded-full p-3"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;