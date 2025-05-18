import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PlanProps {
  title: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: {
    text: string;
    included: boolean;
  }[];
  recommended?: boolean;
  delay: number;
}

const plans: PlanProps[] = [
  {
    title: 'Basic',
    price: { monthly: 39, yearly: 29 },
    features: [
      { text: 'Gym Access (6AM-10PM)', included: true },
      { text: 'Basic Fitness Assessment', included: true },
      { text: 'Access to Group Classes', included: false },
      { text: 'Personal Training Session', included: false },
      { text: 'Nutrition Consultation', included: false },
      { text: '24/7 Access', included: false },
    ],
    delay: 0.1
  },
  {
    title: 'Premium',
    price: { monthly: 69, yearly: 59 },
    recommended: true,
    features: [
      { text: 'Gym Access (6AM-10PM)', included: true },
      { text: 'Advanced Fitness Assessment', included: true },
      { text: 'Access to Group Classes', included: true },
      { text: '2 Personal Training Sessions', included: true },
      { text: 'Nutrition Consultation', included: false },
      { text: '24/7 Access', included: false },
    ],
    delay: 0.2
  },
  {
    title: 'Ultimate',
    price: { monthly: 99, yearly: 89 },
    features: [
      { text: 'Gym Access (24/7)', included: true },
      { text: 'Advanced Fitness Assessment', included: true },
      { text: 'Unlimited Group Classes', included: true },
      { text: '4 Personal Training Sessions', included: true },
      { text: 'Nutrition Consultation', included: true },
      { text: 'Wellness App Premium', included: true },
    ],
    delay: 0.3
  },
];

const Plan: React.FC<PlanProps> = ({ 
  title, 
  price, 
  features, 
  recommended = false, 
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
      className={`card relative overflow-hidden border-2 ${
        recommended 
          ? 'border-primary transform scale-105 shadow-lg shadow-primary/20' 
          : 'border-dark-lighter'
      }`}
    >
      {recommended && (
        <div className="absolute top-0 left-0 right-0 bg-primary py-1 text-center text-light font-bebas">
          RECOMMENDED
        </div>
      )}
      
      <div className={`text-center ${recommended ? 'mt-6' : 'mt-0'}`}>
        <h3 className="text-3xl font-bebas mb-2">{title}</h3>
      </div>
      
      <div className="text-center my-6">
        <p className="text-light-dark text-sm uppercase mb-1">Starting from</p>
        <div className="flex items-center justify-center">
          <span className="text-4xl font-bebas text-primary">$</span>
          <span className="text-5xl font-bebas mr-2">{price.monthly}</span>
          <span className="text-light-dark">/month</span>
        </div>
        <p className="text-light-dark text-sm mt-1">Or ${price.yearly}/month billed annually</p>
      </div>
      
      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            {feature.included ? (
              <Check size={18} className="text-secondary mr-2 flex-shrink-0" />
            ) : (
              <X size={18} className="text-light-darker mr-2 flex-shrink-0" />
            )}
            <span className={feature.included ? 'text-light-dark' : 'text-light-darker'}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>
      
      <a 
        href="#location" 
        className={`btn w-full ${recommended ? 'btn-secondary' : 'btn-primary'}`}
      >
        Choose Plan
      </a>
    </motion.div>
  );
};

const Membership: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="membership" className="section-padding bg-dark-light">
      <div className="container">
        <motion.h2 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title mb-8"
        >
          Membership Plans
        </motion.h2>
        
        <div className="flex justify-center mb-16">
          <div className="bg-dark-lighter p-1 rounded-full inline-flex">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`py-2 px-6 rounded-full transition-colors ${
                billingPeriod === 'monthly' 
                  ? 'bg-primary text-light' 
                  : 'text-light-dark hover:text-light'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`py-2 px-6 rounded-full transition-colors ${
                billingPeriod === 'yearly' 
                  ? 'bg-primary text-light' 
                  : 'text-light-dark hover:text-light'
              }`}
            >
              Yearly <span className="text-secondary text-xs ml-1">Save 20%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Plan 
              key={index} 
              {...plan} 
              price={{
                monthly: billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly,
                yearly: plan.price.yearly
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;