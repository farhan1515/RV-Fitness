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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      ref={ref}
      className="w-full h-64 bg-dark-light overflow-hidden rounded-lg cursor-pointer relative"
      onClick={handleClick}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-light z-10">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ aspectRatio: "16/9" }}
        onClick={handleClick}
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
    setSelectedAlt("");
    document.body.style.overflow = "auto";
  };

  const handleImageClick = (src: string, alt: string) => {
    console.log("Image clicked:", alt); // Debug log
    openLightbox(src, alt);
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
                onClick={() => handleImageClick(image.src, image.alt)}
              />
              <div className="absolute inset-0 bg-dark bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center pointer-events-none">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-[85vw] h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            style={{ minWidth: "320px", minHeight: "240px" }}
          >
            <button
              className="absolute -top-4 -right-4 text-white hover:text-primary transition-all z-30 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 shadow-xl hover:scale-110 transform transition-transform backdrop-blur-sm"
              aria-label="Close lightbox"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>

            <div className="absolute inset-0 flex items-center justify-center z-5">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>

            <img
              src={selectedImage}
              alt={selectedAlt}
              className="max-w-full max-h-full object-contain rounded-xl relative z-10 shadow-2xl"
              style={{
                filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
              }}
              onLoad={(e) => {
                const spinner =
                  e.currentTarget.parentElement?.querySelector(
                    "div.animate-spin"
                  );
                if (spinner) (spinner as HTMLElement).style.display = "none";
              }}
            />

            {/* Image caption with glassmorphism effect */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-40 backdrop-blur-md text-white p-4 rounded-xl z-20 border border-white border-opacity-20">
              <p className="text-center font-bebas text-xl tracking-wide">
                {selectedAlt}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
