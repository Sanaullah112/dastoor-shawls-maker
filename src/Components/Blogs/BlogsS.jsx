import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Img1 from "../../assets/products/blogs1.webp";
import Img2 from "../../assets/products/blogs2.webp";
import Img3 from "../../assets/products/blogs3.webp";
import Img4 from "../../assets/products/blogs4.webp";
import Img5 from "../../assets/products/blogs5.webp";
import Img6 from "../../assets/products/blogs6.jpg";
import Img7 from "../../assets/products/blogs7.jpg";
import Img8 from "../../assets/products/blogs8.jpg";
import Img9 from "../../assets/products/blogs9.jpg";
import Img10 from "../../assets/products/blogs10.jpg";
import Img11 from "../../assets/products/blogs11.jpg";
import Img12 from "../../assets/products/blogs12.jpg";
import Img13 from "../../assets/products/blogs13.jpg";
import Img14 from "../../assets/products/blogs14.jpg";
import Img15 from "../../assets/products/blog1.jpg";
import Img16 from "../../assets/products/blog2.jpg";
import Img17 from "../../assets/products/blog3.jpg";

const BlogsS = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Timeless Elegance — The Art of Shawl Making",
      excerpt:
        "Discover the craftsmanship and passion that go into creating our exclusive shawl collections, blending tradition with contemporary design.",
      img: Img1,
      date: "October 5, 2025",
    },
    {
      id: 2,
      title: "Lambs Wool Men Shawl",
      excerpt:
        "Learn how to style your shawl in five elegant ways this winter — perfect for casual outings or festive gatherings.",
      img: Img2,
      date: "September 25, 2025",
    },
    {
      id: 3,
      title: "Lambs Wool Men Shawl",
      excerpt:
        "We believe in slow fashion and responsible production. Learn how our artisans and natural fibers support sustainable fashion.",
      img: Img3,
      date: "September 15, 2025",
    },
    {
      id: 4,
      title: "Lambs Wool Men Shawl",
      excerpt:
        "We believe in slow fashion and responsible production. Learn how our artisans and natural fibers support sustainable fashion.",
      img: Img4,
      date: "September 15, 2025",
    },
    {
      id: 5,
      title: "Swiss Cotton",
      excerpt:
        "Full jall chakankari. Size 88*45",
      img: Img5,
      date: "September 15, 2025",
    },
    {
      id: 6,
      title: "Swati Embroidery",
      excerpt:
        "Woolen shawl made by handlooms. Size 94*44",
      img: Img6,
      date: "September 15, 2025",
    },
    {
      id: 7,
      title: "Pure Wool Swati Plans Shawls",
      excerpt:
        "We believe in slow fashion and responsible production. Learn how our artisans and natural fibers support sustainable fashion.",
      img: Img7,
      date: "September 15, 2025",
    },
    {
      id: 8,
      title: "Pure woolen Swati shawls",
      excerpt:
        "Hand looms embroidery+ tarkashi & lovely name Sana",
      img: Img8,
      date: "September 15, 2025",
    },
    {
      id: 9,
      title: "Pure Swiss lown",
      excerpt:
        "Hand made embroidery & tarkashi work. Size 88*48",
      img: Img9,
      date: "September 15, 2025",
    },
    {
      id: 10,
      title: "Sustainability in Fashion — Our Commitment",
      excerpt:
        "We believe in slow fashion and responsible production. Learn how our artisans and natural fibers support sustainable fashion.",
      img: Img10,
      date: "September 15, 2025",
    },
     {
      id: 11,
      title: "Swiss Cotton",
      excerpt:
           "Full jall chakankari. Size 88*45",
      img: Img11,
      date: "September 15, 2025",
    },
     {
      id: 12,
      title: "Swiss Cotton",
      excerpt:
        "Full jall chakankari. Size 88*45",
      img: Img12,
      date: "September 15, 2025",
    },
     {
      id: 13,
      title: "Swiss Cotton",
      excerpt:
        "Full jall chakankari. Size 88*45",
      img: Img13,
      date: "September 15, 2025",
    },
     {
      id: 14,
      title: "Swiss Cotton",
      excerpt:
        "Full jall chakankari. Size 88*45",
      img: Img14,
      date: "September 15, 2025",
    },
     {
      id: 15,
      title: "Pure Woolen Swati Shawl.",
      excerpt:
        "Swati handmade embroidery double border. Size 94*45",
      img: Img15,
      date: "September 15, 2025",
    },
    {
      id: 16,
      title: "Pure Woolen Swati Shawl.",
      excerpt:
        "Swati handmade embroidery double border. Size 94*45",
      img: Img16,
      date: "September 15, 2025",
    },
    {
      id: 17,
      title: "Pure Woolen Swati Shawl.",
      excerpt:
        "Swati handmade embroidery double border. Size 94*45",
      img: Img17,
      date: "September 15, 2025",
    },
  ];
   const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Our Blogs
        </h2>
        <NavLink to='/blog' className='flex justify-center mb-4 -mt-4 max-w-20 mx-auto px-4 py-2 text-gray-400 bg-blue-500 hover:bg-blue-800 font-bold rounded-2xl text-center'>Back</NavLink>

        <div className="grid gap-8 md:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-indigo-600 cursor-pointer" onClick={() => navigate(`/blogs/${post.id}`, { state: post })}>
                  {post.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                 <button
                  onClick={() =>
                    navigate(`/blogs/${post.id}`, { state: post })
                  }
                  className="text-indigo-600 font-medium hover:underline cursor-pointer">Read More →</button>
              </div>
            </div>
          ))};
        </div>
      </div>
    </section>
  );
};

export default BlogsS;
