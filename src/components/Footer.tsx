import React from "react";
import {
  Dumbbell,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ChevronRight,
  Mail,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light-dark pt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Dumbbell size={32} className="text-primary mr-2" />
              <h3 className="text-2xl font-bebas tracking-wider text-light">
                RV FITNESS
              </h3>
            </div>
            <p className="mb-6">
              Building stronger bodies and minds since 2018. Our mission is to
              help you become the best version of yourself.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-dark-light hover:bg-primary transition-colors duration-300 p-2 rounded-full"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-dark-light hover:bg-primary transition-colors duration-300 p-2 rounded-full"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-dark-light hover:bg-primary transition-colors duration-300 p-2 rounded-full"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-dark-light hover:bg-primary transition-colors duration-300 p-2 rounded-full"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-xl font-bebas mb-6 text-light">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Programs", "Trainers", "Membership"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="hover:text-primary transition-colors duration-300 flex items-center"
                    >
                      <ChevronRight size={16} className="mr-2 text-primary" />
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Programs */}
          <div className="md:col-span-1">
            <h4 className="text-xl font-bebas mb-6 text-light">Our Programs</h4>
            <ul className="space-y-3">
              {[
                "CrossFit",
                "HIIT",
                "Strength Training",
                "Yoga",
                "Cardio",
                "Personal Training",
              ].map((program) => (
                <li key={program}>
                  <a
                    href="#programs"
                    className="hover:text-primary transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight size={16} className="mr-2 text-primary" />
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h4 className="text-xl font-bebas mb-6 text-light">Newsletter</h4>
            <p className="mb-4">
              Subscribe to our newsletter for workout tips, promotions and updates.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-dark-light text-light px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                required
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary-dark text-light p-2 rounded-r-md"
                aria-label="Subscribe"
              >
                <Mail size={20} />
              </button>
            </form>
          </div> */}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-light py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} RV FITNESS . All Rights Reserved.
          </p>
          {/* <div className="mt-4 md:mt-0">
            <a href="#" className="hover:text-primary mr-6">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
