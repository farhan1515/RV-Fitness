import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PlanProps {
  title: string;
  price: number;
  duration: string;
  popular?: boolean;
  delay: number;
}

const plans: PlanProps[] = [
  {
    title: 'Monthly',
    price: 2500,
    duration: '1 Month',
    delay: 0.1
  },
  {
    title: 'Quarterly',
    price: 5500,
    duration: '3 Months',
    popular: true,
    delay: 0.2
  },
  {
    title: 'Half Yearly',
    price: 9500,
    duration: '6 Months',
    delay: 0.3
  },
  {
    title: 'Annually',
    price: 14999,
    duration: '12 Months',
    delay: 0.4
  },
];

const features = [
  '24/7 Gym Access',
  'All Equipment Access',
  'Locker & Shower Facilities',
  'Free WiFi',
  'Basic Fitness Assessment',
  'Monthly Progress Tracking'
];

interface PlanButtonProps {
  onClick: () => void;
}

const Plan: React.FC<PlanProps & PlanButtonProps> = ({ 
  title, 
  price, 
  duration,
  popular = false, 
  delay,
  onClick
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Calculate savings for longer durations
  const monthlyEquivalent = (price / parseInt(duration)).toFixed(0);
  const savings = title !== 'Monthly' ? Math.round(((2500 - parseInt(monthlyEquivalent)) / 2500) * 100) : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`relative overflow-hidden rounded-xl border-2 bg-dark-lighter/50 backdrop-blur-sm transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20 ${
        popular ? 'border-primary transform scale-[1.02]' : 'border-dark-lighter'
      }`}
    >
      {/* {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-6 py-1 rounded-full text-sm font-bold text-light">
          MOST POPULAR
        </div>
      )} */}
      
      <div className={`p-8 ${popular ? 'pt-12' : 'pt-8'}`}>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bebas text-primary mb-2">{title}</h3>
          <p className="text-light-dark">{duration} Plan</p>
        </div>
        
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center mb-2">
            <span className="text-2xl mr-1">₹</span>
            <span className="text-5xl font-bold">{price.toLocaleString()}</span>
          </div>
          {savings > 0 && (
            <div className="text-sm text-secondary">
              Save {savings}% vs monthly
            </div>
          )}
          <div className="text-light-dark text-sm mt-1">
            {title !== 'Monthly' && `(₹${monthlyEquivalent}/month)`}
          </div>
        </div>
        
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check size={18} className="text-secondary mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-light-dark">{feature}</span>
            </div>
          ))}
        </div>
        
        <button
          type="button"
          className={`btn w-full btn-primary`}
          onClick={onClick}
        >
          Join Now
        </button>
      </div>
    </motion.div>
  );
};

const Membership: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Helper to scroll smoothly to the Location form section
  const scrollToLocation = () => {
    const locationSection = document.getElementById('location');
    if (locationSection) {
      locationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bebas text-light mb-4">
            Choose Your Plan
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-light-dark max-w-2xl mx-auto">
            Flexible membership options to suit your fitness journey. 
            Longer commitments mean bigger savings!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Plan key={index} {...plan} onClick={scrollToLocation} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-light-dark mb-4">Need help choosing the right plan?</p>
          <button
            type="button"
            onClick={scrollToLocation}
            className="inline-flex items-center text-primary hover:text-secondary transition-colors font-semibold"
          >
            Contact Us <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Membership;