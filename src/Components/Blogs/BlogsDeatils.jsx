// src/pages/BlogDetails.jsx
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const blog = location.state; // data from BlogsS.jsx

  if (!blog) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-gray-700">Blog not found.</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <img
          src={blog.img}
          alt={blog.title}
          className="w-[500px] h-[500px] object-cover mx-auto rounded-xl shadow-lg"
        />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-6">
          {blog.title}
        </h1>
        <p className="mt-3 text-gray-700 dark:text-gray-300">{blog.excerpt}</p>

        <div className="mt-8 flex justify-center gap-4">
          <p
            className="text-sm p-4"
          >
            You Can Order It In Our Collection Page Please Go : <span className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700"><NavLink to='/collection'>Here</NavLink></span>  
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
