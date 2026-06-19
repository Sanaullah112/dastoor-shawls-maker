import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTruck, FaCheckCircle } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10 uppercase tracking-wide">
          Contact Information
        </h1>

        <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10">
          {/* Left Side */}
          <div className="space-y-6 text-left">
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-indigo-600 text-xl mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Phone No.</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  <a
                    href="https://wa.me/923329886187"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600"
                  >
                    +92 3329886187
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-indigo-600 text-xl mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Email ID</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anwarrahman1315@gmail.com"
                     target="_blank"
                     rel="noopener noreferrer" className="hover:text-indigo-600"> anwarrahman1315@gmail.com
                   </a>
                </p> 
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-indigo-600 text-xl mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Address</h2>
                <p className="text-gray-600 dark:text-gray-300">Swat, Pakistan</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6 text-left">
            <div className="flex items-start gap-4">
              <FaTruck className="text-indigo-600 text-xl mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Shipping</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Continental Plaza, Makan Bagh Mingora Swat
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaCheckCircle className="text-indigo-600 text-xl mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Quality</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Finest woolen shawls paired with timeless designs
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Explore More
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                NEW SHAWLS • Women • Men • Our Brand • Sale • Blogs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
