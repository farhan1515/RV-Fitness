import React, { useState, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { X } from "lucide-react";

// Import images from assets folder
import rv1 from "../assets/rv1.webp";
import rv2 from "../assets/rv2.webp";
import rv3 from "../assets/rv3.webp";
import rv4 from "../assets/rv4.webp";
import rv5 from "../assets/rv5.webp";
import rv6 from "../assets/rv6.webp";
import rv7 from "../assets/rv7.webp";
import rv8 from "../assets/rv8.webp";

// Placeholder image for loading state
const placeholderImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiM0MjQ2NTEiLz48L3N2Zz4=";

const images = [
  {
    src: rv1,
    alt: "Dumbbell Bench Press and variety of Dumbbells",
    placeholder: placeholderImage,
  },
  {
    src: rv2,
    alt: "Chest Fly Machine and cardio training",
    placeholder: placeholderImage,
  },
  {
    src: rv3,
    alt: "Bench Press and Incline Bench Press",
    placeholder: placeholderImage,
  },
  {
    src: rv4,
    alt: "Cable crossover machine for chest exercises",
    placeholder: placeholderImage,
  },
  {
    src: rv5,
    alt: "Sweat, Strength and Boxing",
    placeholder: placeholderImage,
  },
  {
    src: rv6,
    alt: "Pushups and Mobility Training area",
    placeholder: placeholderImage,
  },
  {
    src: rv7,
    alt: "Leg press machine for lower body strength",
    placeholder: placeholderImage,
  },
  {
    src: rv8,
    alt: "Treadmill for running and walking exercises",
    placeholder: placeholderImage,
  },
];

// Lazy loaded image component
const LazyImage = ({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(placeholderImage);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  React.useEffect(() => {
    if (inView) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLoaded(true);
      };
    }
  }, [inView, src]);

  return (
    <div
      ref={ref}
      className="w-full h-64 bg-dark-light overflow-hidden rounded-lg"
    >
      {!isLoaded && (
        <div className="w-full h-full flex items-center justify-center bg-dark-light">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        onClick={onClick}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ aspectRatio: "16/9" }}
      />
    </div>
  );
};

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string>("");

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const openLightbox = (src: string, alt: string) => {
    setSelectedImage(src);
    setSelectedAlt(alt);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
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
            >
              <LazyImage
                src={image.src}
                alt={image.alt}
                onClick={() => openLightbox(image.src, image.alt)}
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
          <div className="max-w-full max-h-[85vh] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <img
              src={selectedImage}
              alt={selectedAlt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              onLoad={(e) => {
                // Hide spinner after image loads
                if (e.currentTarget.parentElement) {
                  const spinner =
                    e.currentTarget.parentElement.querySelector("div");
                  if (spinner) spinner.style.display = "none";
                }
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
