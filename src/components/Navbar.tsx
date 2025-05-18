import React, { useState, useEffect } from "react";
import { Menu, X, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png"; // adjust path as needed

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Trainers", href: "#trainers" },
  { name: "Gallery", href: "#gallery" },
  { name: "Programs", href: "#programs" },
  { name: "Membership", href: "#membership" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#location" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Determine active section based on scroll position
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute("id");

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight &&
          id
        ) {
          setActiveSection(`#${id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-dark shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <img src={logo} alt="RV Fitness Logo" className="h-16 mr-2" />
          <div>
            <h1 className="text-3xl font-anton tracking-widest text-light">
              RV FITNESS
            </h1>
            <p className="text-1xl text-primary tracking-wider font-oswald">
              A Smarter Way To Get Fit.
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`nav-link font-oswald text-base tracking-wider ${
                    activeSection === link.href ? "active" : ""
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation Button */}
        <button
          className="lg:hidden text-light hover:text-primary transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="lg:hidden bg-dark-light absolute top-full left-0 right-0 shadow-xl"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="border-b border-dark-lighter last:border-none"
              >
                <a
                  href={link.href}
                  className={`block px-6 py-3 hover:bg-dark-lighter hover:text-primary transition-colors font-oswald tracking-wider ${
                    activeSection === link.href ? "text-primary" : "text-light"
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
