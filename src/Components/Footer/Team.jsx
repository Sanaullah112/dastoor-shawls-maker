import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import Img from '../../assets/products/sana.jpg';
import Img2 from '../../assets/products/anwar.jpg';
import Img3 from '../../assets/products/mehboob.jpg';


const teamMembers = [
  {
    name: "Sanaullah",
    role: "Founder & Lead Designer",
    image: Img, // Replace with your actual image path
    bio: "With a deep passion for traditional craftsmanship, Sanaullah leads Dastoor Shawls Maker with a focus on elegance and authenticity.",
    social: {
      instagram: "https://www.instagram.com/mehboob575867?igsh=MTZjMXA1cHhrYzA2aA%3D%3D&utm_source=qr",
      facebook: "https://web.facebook.com/profile.php?id=100063894284500",
      tikTok: "https://www.tiktok.com/@nadiahandmadelifestyle?_t=ZS-90NFbyGHrlY&_r=1",
    },
  },
  {
    name: "Mehboob ur Rahman",
    role: "Creative Director",
    image: Img3,
    bio: "Handlooms embroidery designer Graduate ",
    social: {
      instagram: "https://www.instagram.com/mehboob575867?igsh=MTZjMXA1cHhrYzA2aA%3D%3D&utm_source=qr",
      facebook: "https://web.facebook.com/profile.php?id=100063894284500",
      tikTok: "https://www.tiktok.com/@nadiahandmadelifestyle?_t=ZS-90NFbyGHrlY&_r=1",
    },
  },
  {
    name: "Anwar Rahman",
    role: "Owner of Dastoor shawls maker",
    image: Img2,
    bio: "Anwarrahman is Onwer of Dastoor Shawls Maker if you can contact us to first contact to Anwar Rahman.",
    social: {
      instagram: "https://instagram.com/anwarkhayal",
      facebook: "https://web.facebook.com/profile.php?id=100063894284500",
      tikTok: "https://www.tiktok.com/@nadiahandmadelifestyle?_t=ZS-90NFbyGHrlY&_r=1",
    },
  },
];

const Team = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Meet Our Team
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            The heart of <strong>Dastoor Shawls Maker</strong> — a team of
            passionate artisans, designers, and innovators dedicated to
            preserving the beauty of traditional shawl making.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm text-indigo-600">{member.role}</p>
                <p className="mt-3 text-gray-600 text-sm">{member.bio}</p>

                <div className="flex justify-center gap-4 mt-5">
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    <FaInstagram size={18} />
                  </a>
                  <a
                    href={member.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    <FaFacebookF size={18} />
                  </a>
                  <a
                    href={member.social.tikTok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    <FaTiktok size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-12 text-gray-500 text-sm">
          At Dastoor Shawls Maker, every design begins with a story and ends
          with craftsmanship that lasts generations.
        </footer>
      </div>
    </main>
  );
};

export default Team;
