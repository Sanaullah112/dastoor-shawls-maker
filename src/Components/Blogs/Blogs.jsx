// src/pages/Blogs.jsx
import { Link } from "react-router-dom";
import Img1 from "../../assets/products/blog1.jpg";
import Img2 from "../../assets/products/blog2.jpg";
import Img3 from "../../assets/products/blog3.jpg";
import { NavLink } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Pure Woolen Swati shalw. Swati Handmade Embroidery Double Border.",
    date: "Oct 01, 2025",
    excerpt:
      "Learn how to style your dastoor shawl in 5 unique ways this winter to look elegant and cozy at the same time.",
    img: Img1,
  },
  {
    id: 2,
    title: "Pure Woolen Swati shalw. Swati Handmade Embroidery Double Border.",
    date: "Sep 20, 2025",
    excerpt:
      "Tips and tricks to make your dastoor shawl last longer — maintenance, storage, and cleaning.",
    img: Img2,
  },
  {
    id: 3,
    title: "What Makes Pakistani Velvet Shawls Unique?",
    date: "Sep 10, 2025",
    excerpt:
      "Discover the craftsmanship and materials that make Pakistani velvet shawls stand out from the rest.",
    img: Img3,
  },
  // add as many as you want...
];

const Blogs = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Blogs & Insights
        </h2>
          <NavLink to='/' className='flex justify-center mb-4 -mt-4 max-w-20 mx-auto px-4 py-2 text-gray-400 bg-blue-500 hover:bg-blue-800 font-bold rounded-2xl text-center'>Back</NavLink>
        

        <div className="grid gap-8 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              to='/blogs'
              key={post.id}
              className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {post.date}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-indigo-600">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blogs"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
