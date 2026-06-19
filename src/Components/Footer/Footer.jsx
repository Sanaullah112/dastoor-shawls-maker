// src/components/Footer.jsx
import logo from "../../assets/products/logo.jpg";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";


const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top newsletter / connect section */}
      <div className="px-6 md:px-12 py-10 border-b border-gray-700">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-green-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-green-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-green-400">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Connect With Us</h3>
            <p className="mb-4">For wholesale & queries:</p>
            <p>
              Email:{" "}
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sanaarman033@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400">anwarrahman1315@gmail.com</a>
            </p>
            <a href="https://wa.me/923329886187?text=Hi%20I%20want%20to%20order%20a%20shawl"
              target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-400" ><FaWhatsapp className="text-green-500 text-xl" />0332-9886187 </a>
            <div className="flex space-x-4 mt-4">
              <NavLink to="https://web.facebook.com/profile.php?id=100063894284500" target="_blank" rel="noreferrer" className="hover:text-green-400">
                <FaFacebookF />
              </NavLink>
              <NavLink to="https://instagram.com/anwarkhayal" target="_blank" rel="noreferrer" className="hover:text-green-400">
                <FaInstagram />
              </NavLink>
              <NavLink to="https://wa.me/923329886187?text=Hi%20I%20want%20to%20order%20a%20shawl" target="_blank" rel="noreferrer" className="hover:text-green-400">
                <FaWhatsapp />
              </NavLink>
            </div>
          </div>
          <div>
            <img src={logo} alt="Not Found" className="h-[200px] rounded-3xl hover:scale-125" />
          </div>
        </div>
      </div>

      {/* Bottom links & copyright */}
      <div className="px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-4 md:mb-0">
            © {currentYear} DastoorShawlsMaker • All rights reserved
          </p>
          <div className="flex space-x-4">
            <Link to="/team" className="hover:text-green-400">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-green-400">
              Privacy Policy
            </Link>
            <Link to="/blog" className="hover:text-green-400">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
