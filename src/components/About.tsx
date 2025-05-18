import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Target, Flame, BarChart } from 'lucide-react';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon, delay }) => {
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
      className="card flex flex-col items-center text-center p-6 md:p-8"
    >
      <div className="bg-primary rounded-full p-4 mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bebas mb-3">{title}</h3>
      <p className="text-light-dark">{description}</p>
    </motion.div>
  );
};

const About: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: textRef, inView: textInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="about" className="section-padding bg-about-pattern bg-fixed bg-cover relative">
      <div className="absolute inset-0 bg-dark-gradient"></div>
      <div className="container relative">
        <motion.h2 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title mb-16"
        >
          About Us
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -50 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl md:text-4xl font-bebas mb-6 text-primary">
              Our Journey
            </h3>
            <p className="mb-6 text-light-dark">
              Founded in 2018, RV FITNESS was born from a passion to create a fitness
              environment where everyone feels empowered. Our founder, a former professional athlete,
              wanted to combine cutting-edge training methods with a supportive community atmosphere.
            </p>
            <p className="mb-6 text-light-dark">
              We believe fitness is more than just physical transformation—it's a journey that strengthens
              your mind, builds your confidence, and transforms your life. Our state-of-the-art facility
              is designed to inspire and motivate you to push beyond your limits.
            </p>
            <p className="text-light-dark">
              Whether you're a beginner or an experienced athlete, RV FITNESS offers the guidance,
              equipment, and community you need to succeed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={textInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="aspect-video rounded-lg overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              alt="RV Fitness interior" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            icon={<Target size={32} className="text-light" />}
            title="Personalized Training"
            description="Custom workout plans tailored to your unique goals, fitness level, and preferences."
            delay={0.1}
          />
          <Feature
            icon={<Flame size={32} className="text-light" />}
            title="High-Intensity Workouts"
            description="Effective, efficient training sessions designed to maximize results in minimal time."
            delay={0.2}
          />
          <Feature
            icon={<BarChart size={32} className="text-light" />}
            title="Track Your Progress"
            description="Advanced fitness tracking to monitor improvements and keep you motivated."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default About;