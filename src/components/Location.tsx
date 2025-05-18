import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";

const Location: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would send this data to a backend server
    console.log("Form submitted:", formData);
    setFormSubmitted(true);

    // Reset the form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    // Hide the success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <section id="location" className="section-padding bg-dark-light">
      <div className="container">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title mb-16"
        >
          Location & Contact
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-lg overflow-hidden h-64 mb-8">
              {/* This would normally be a Google Map embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.266647253179!2d78.48667531487673!3d17.447292688032282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99c8b609a75b%3A0x1f9c2e0f947509e0!2sStreet%20Number%2012%2C%20W%20Marredpally%20Rd%20500029%2C%20Marredpally%20West%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1715945959610!5m2!1sen!2sin"
                className="w-full h-full border-2 border-dark-lighter rounded-lg"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin
                  size={24}
                  className="text-primary mr-4 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-bebas mb-1">Our Location</h3>
                  <p className="text-light-dark">
                  Street Number 12, W Marredpally Rd 500029, Marredpally West, Hyderabad
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone
                  size={24}
                  className="text-primary mr-4 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-bebas mb-1">Phone Number</h3>
                  <p className="text-light-dark">99590 23143</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail
                  size={24}
                  className="text-primary mr-4 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-bebas mb-1">Email Address</h3>
                  <p className="text-light-dark">info@rvfitness.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock
                  size={24}
                  className="text-primary mr-4 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-bebas mb-2">Opening Hours</h3>
                  <table className="text-light-dark">
                    <tbody>
                      <tr>
                        <td className="pr-6 pb-1">Monday - Friday</td>
                        <td>5:00 AM - 11:00 PM</td>
                      </tr>
                      <tr>
                        <td className="pr-6 pb-1">Saturday</td>
                        <td>6:00 AM - 10:00 PM</td>
                      </tr>
                      <tr>
                        <td className="pr-6">Sunday</td>
                        <td>7:00 AM - 8:00 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="card">
              <h3 className="text-2xl font-bebas mb-6">Get In Touch</h3>

              {formSubmitted ? (
                <div className="bg-dark p-4 rounded-lg text-center">
                  <Check size={48} className="text-secondary mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-light-dark">
                    Thank you for reaching out. We'll get back to you as soon as
                    possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-light-dark mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-dark text-light p-3 rounded-md focus:outline-none focus:ring focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-light-dark mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-dark text-light p-3 rounded-md focus:outline-none focus:ring focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block text-light-dark mb-1"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-dark text-light p-3 rounded-md focus:outline-none focus:ring focus:ring-primary"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-light-dark mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-dark text-light p-3 rounded-md focus:outline-none focus:ring focus:ring-primary resize-none"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-full">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
