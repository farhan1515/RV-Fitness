import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail } from 'lucide-react';

interface TrainerProps {
  name: string;
  expertise: string;
  image: string;
  instagram?: string;
  linkedin?: string;
  email?: string;
  delay: number;
}

const trainers: TrainerProps[] = [
  {
    name: 'Alex Rodriguez',
    expertise: 'Strength & Conditioning',
    image: 'https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=800',
    instagram: '#',
    linkedin: '#',
    email: '#',
    delay: 0.1
  },
  {
    name: 'Sarah Johnson',
    expertise: 'Cardio & HIIT',
    image: 'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=800',
    instagram: '#',
    linkedin: '#',
    email: '#',
    delay: 0.2
  },
  {
    name: 'Marcus Wilson',
    expertise: 'CrossFit & Functional Training',
    image: 'https://images.pexels.com/photos/6456300/pexels-photo-6456300.jpeg?auto=compress&cs=tinysrgb&w=800',
    instagram: '#',
    linkedin: '#',
    email: '#',
    delay: 0.3
  },
  {
    name: 'Emily Chen',
    expertise: 'Yoga & Flexibility',
    image: 'https://images.pexels.com/photos/5384538/pexels-photo-5384538.jpeg?auto=compress&cs=tinysrgb&w=800',
    instagram: '#',
    linkedin: '#',
    email: '#',
    delay: 0.4
  }
];

const Trainer: React.FC<TrainerProps> = ({ 
  name, 
  expertise, 
  image, 
  instagram, 
  linkedin, 
  email, 
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
      <img 
        src={image} 
        alt={name} 
        className="w-full h-96 object-cover object-center"
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent p-6">
        <h3 className="text-2xl font-bebas">{name}</h3>
        <p className="text-primary">{expertise}</p>
      </div>
      
      <div className="trainer-socials absolute top-0 right-0 p-4 flex flex-col gap-3 opacity-0 transform translate-y-2 transition-all duration-300">
        {instagram && (
          <a 
            href={instagram} 
            className="bg-dark-light p-2 rounded-full hover:bg-primary transition-colors duration-300"
            aria-label={`${name}'s Instagram`}
          >
            <Instagram size={20} className="text-light" />
          </a>
        )}
        
        {linkedin && (
          <a 
            href={linkedin} 
            className="bg-dark-light p-2 rounded-full hover:bg-primary transition-colors duration-300"
            aria-label={`${name}'s LinkedIn`}
          >
            <Linkedin size={20} className="text-light" />
          </a>
        )}
        
        {email && (
          <a 
            href={`mailto:${email}`} 
            className="bg-dark-light p-2 rounded-full hover:bg-primary transition-colors duration-300"
            aria-label={`Email ${name}`}
          >
            <Mail size={20} className="text-light" />
          </a>
        )}
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