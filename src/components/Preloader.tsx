import React, { useEffect, useState } from 'react';
import { Dumbbell } from 'lucide-react';

const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark">
      <div className="w-full max-w-md px-8 flex flex-col items-center">
        <div className="animate-pulse-slow mb-8">
          <Dumbbell size={64} className="text-primary" />
        </div>
        <h1 className="text-light text-4xl md:text-6xl font-bebas mb-4 tracking-wider">
          RV FITNESS
        </h1>
        <p className="text-primary text-xl font-bebas mb-6 tracking-wide">
          A Smarter Way To Get Fit.
        </p>
        <div className="w-full bg-dark-light rounded-full h-2.5 mb-4">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-light-dark text-sm">{progress}%</p>
      </div>
    </div>
  );
};

export default Preloader;