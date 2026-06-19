// src/components/FreeBooks.jsx
import Slider from "react-slick";
import { motion } from "framer-motion";
import Img1 from "../assets/products/first.jpg"; // 👈 replace with your book image
import Img2 from "../assets/products/second.jpg"; // 👈 replace with your book image
import Img3 from "../assets/products/third.jpg"; // 👈 replace with your book image
import Img4 from "../assets/products/fourth.jpg"; // 👈 replace with your book image
import { NavLink } from "react-router-dom";

const FreeBooks = () => {
  const books = [
    {
      id: 1,
      title: "Summer Shawls",
      desc: "A short description about the story book. Enjoy free",
      img: Img1,
    },
    {
      id: 2,
      title: "For Women",
      desc: "Learn science with easy explanations and fun illustrations.",
      img: Img2,
    },
    {
      id: 3,
      title: "Winter Blanket",
      desc: "Explore world history in simple and engaging language.",
      img: Img3,
    },
    {
      id: 4,
      title: "Best Shawls",
      desc: "Solve math problems with easy step-by-step guidance.",
      img: Img4,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Your Choice <span className="text-gray-400 ">Order</span>
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Alll Kind of varieties will manufacture by orders with low discount rates from current market.
          </p>
        </motion.div>




        {/* Slider */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* First items */}
          <NavLink to='/stoon'>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 h-full w-full hover:scale-105">
              <img
                src={Img1}
                alt='Not Found'
                className="w-full h-48 object-contain mb-4 mx-auto "
              />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white ml-14 flex gap-2">
                Stoon
                <span className="bg-pink-500 text-white rounded-full ml-2 text-sm px-3 py-0.5">20% discount</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                A short description about the story book. Enjoy free
              </p>
              <div className="mt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Buy Now
                </button>
              </div>
            </div>
          </NavLink>
          {/* Second items */}
          <NavLink to='/summer'>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 h-full w-full hover:scale-105">
              <img
                src={Img2}
                alt='Not Found'
                className="w-full h-48 object-contain mb-4 mx-auto"
              />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white ml-14 flex gap-2">
                For Women
                <span className="bg-pink-500 text-white rounded-full ml-2 text-sm px-3 py-0.5">20% discount</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                A short description about the story book. Enjoy free
              </p>
              <div className="mt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Buy Now
                </button>
              </div>
            </div>
          </NavLink>
          {/* Thirs items */}
          <NavLink to='/winter'>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 h-full w-full hover:scale-105">
              <img
                src={Img3}
                alt='Not Found'
                className="w-full h-48 object-contain mb-4 mx-auto"
              />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white ml-14 flex gap-2">
                Winter Blanket
                <span className="bg-pink-500 text-white rounded-full ml-2 text-sm px-3 py-0.5">20% discount</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                A short description about the story book. Enjoy free
              </p>
              <div className="mt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Buy Now
                </button>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default FreeBooks;
