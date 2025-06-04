import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

// Import trainer images
import t1 from '../assets/T1.webp';
import t2 from '../assets/T2.webp';
import t3 from '../assets/rv2.webp';
import t4 from '../assets/rv4.webp';

interface TrainerProps {
  name: string;
  expertise: string;
  image: string;
  instagram?: string;
  delay: number;
}

const trainers: TrainerProps[] = [
  {
    name: 'Alex Rodriguez',
    expertise: 'Strength & Conditioning',
    image: t1,
    instagram: '#',
    delay: 0.1
  },
  {
    name: 'Vignesh',
    expertise: 'Cardio & HIIT',
    image: t2,
    instagram: '#',
    delay: 0.2
  },
  {
    name: 'Marcus Wilson',
    expertise: 'CrossFit & Functional Training',
    image: t3,
    instagram: '#',
    delay: 0.3
  },
  {
    name: 'Emily Chen',
    expertise: 'Yoga & Flexibility',
    image: t4,
    instagram: '#',
    delay: 0.4
  }
];

const Trainer: React.FC<TrainerProps> = ({ 
  name, 
  expertise, 
  image, 
  instagram, 
  delay 
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="trainer-card relative group overflow-hidden rounded-lg"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bebas text-light">{name}</h3>
            <p className="text-primary">{expertise}</p>
          </div>
          
          {instagram && (
            <a 
              href={instagram} 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark/80 hover:bg-primary/90 p-3 rounded-full transition-colors duration-300"
              aria-label={`${name}'s Instagram`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={24} className="text-light" />
            </a>
          )}
        </div>
      </div>
      
      <div className="p-4 bg-dark">
        <h3 className="text-xl font-bebas text-light">{name}</h3>
        <p className="text-primary">{expertise}</p>
      </div>
    </motion.div>
  );
};

const Trainers: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="trainers" className="section-padding bg-dark">
      <div className="container">
        <motion.h2 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title mb-16"
        >
          Meet Our Trainers
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <Trainer key={index} {...trainer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;