import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
  {
    src: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Weightlifting area with barbells and weights',
  },
  {
    src: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Person using rowing machine in gym',
  },
  {
    src: 'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Group fitness class in action',
  },
  {
    src: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Person doing pull-ups',
  },
  {
    src: 'https://images.pexels.com/photos/4398880/pexels-photo-4398880.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Modern gym equipment',
  },
  {
    src: 'https://images.pexels.com/photos/260352/pexels-photo-260352.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Spinning class on stationary bikes',
  },
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const openLightbox = (src: string) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="section-padding bg-dark-light">
      <div className="container">
        <motion.h2 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title mb-16"
        >
          Gym Gallery
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openLightbox(image.src)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover gallery-item transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-dark bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-light text-center p-4">
                  <p className="font-bebas text-xl">{image.alt}</p>
                  <span className="text-sm text-primary">Click to enlarge</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark bg-opacity-90 p-4 lightbox"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-light hover:text-primary transition-colors"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged gallery image" 
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;