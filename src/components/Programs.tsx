import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Clock, BarChart3, UserCircle2 } from 'lucide-react';

interface ProgramProps {
  title: string;
  description: string;
  duration: string;
  intensity: number;
  trainer: string;
  image: string;
  delay: number;
}

const programs: ProgramProps[] = [
  {
    title: 'CrossFit',
    description: 'High-intensity functional movements that combine gymnastics, weightlifting, and cardio.',
    duration: '60 min',
    intensity: 5,
    trainer: 'Marcus Wilson',
    image: 'https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg?auto=compress&cs=tinysrgb&w=800',
    delay: 0.1
  },
  {
    title: 'HIIT',
    description: 'Quick, intense bursts of exercise followed by short recovery periods that keep your heart rate up.',
    duration: '45 min',
    intensity: 4,
    trainer: 'Sarah Johnson',
    image: 'https://images.pexels.com/photos/4162578/pexels-photo-4162578.jpeg?auto=compress&cs=tinysrgb&w=800',
    delay: 0.2
  },
  {
    title: 'Strength Training',
    description: 'Focus on building muscle mass, strength, and endurance using weights and resistance equipment.',
    duration: '75 min',
    intensity: 3,
    trainer: 'Alex Rodriguez',
    image: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=800',
    delay: 0.3
  },
  {
    title: 'Yoga Flow',
    description: 'Connect movement with breath in this flowing sequence of poses that improve flexibility and mindfulness.',
    duration: '60 min',
    intensity: 2,
    trainer: 'Emily Chen',
    image: 'https://images.pexels.com/photos/4056530/pexels-photo-4056530.jpeg?auto=compress&cs=tinysrgb&w=800',
    delay: 0.4
  }
];

const Program: React.FC<ProgramProps> = ({ 
  title, 
  description, 
  duration, 
  intensity, 
  trainer, 
  image, 
  delay 
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Create an array of 5 items for the intensity display
  const intensityArray = Array.from({ length: 5 }, (_, i) => i < intensity);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="card overflow-hidden"
    >
      <div className="h-48 overflow-hidden rounded-t-lg -mx-6 -mt-6 mb-6">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <h3 className="text-2xl font-bebas mb-3 text-primary">{title}</h3>
      <p className="text-light-dark mb-4">{description}</p>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center text-light-dark">
          <Clock size={16} className="mr-2 text-primary" />
          <span>{duration}</span>
        </div>
        
        <div className="flex items-center text-light-dark">
          <BarChart3 size={16} className="mr-2 text-primary" />
          <span className="mr-2">Intensity:</span>
          <div className="flex">
            {intensityArray.map((active, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full mr-1 ${
                  active ? 'bg-primary' : 'bg-dark-lighter'
                }`}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center text-light-dark">
          <UserCircle2 size={16} className="mr-2 text-primary" />
          <span>Trainer: {trainer}</span>
        </div>
      </div>
      
      <a 
        href="#location" 
        className="btn btn-primary mt-6 inline-block w-full"
      >
        Book a Class
      </a>
    </motion.div>
  );
};

const Programs: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="programs" className="section-padding bg-dark">
      <div className="container">
        <motion.h2 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title mb-16"
        >
          Our Programs
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <Program key={index} {...program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;