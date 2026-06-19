import React from "react";
import { motion } from "framer-motion";

const Section = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="mb-12"
  >
    <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-3">{title}</h2>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{children}</p>
  </motion.div>
);

const About = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
          About Us
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A legacy of craftsmanship, elegance, and cultural heritage woven into every thread.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto space-y-10">
        <Section title="Who We Are">
          We are one of the pioneers of the Shawl manufacturing and trading industry in Pakistan and
          have been carrying this business forward generation after generation.
        </Section>

        <Section title="Vision">
          We aim to bring the value of culture, the beauty of art, and the appreciation of timeless
          fashion into everyday life by creating fashion products that inspire confidence and pride
          in our customers and craftsmen.
        </Section>

        <Section title="Mission">
          Our mission is to be a leading force in the fashion industry by creating beautiful,
          high-quality, handcrafted shawls through the expertise of our artisans. We continue our
          legacy of crafting heirloom fashion accessories for generations of today and tomorrow.
        </Section>

        <Section title="Values">
          <strong className="block text-lg mt-4 text-indigo-600">Beauty & Authenticity</strong>
          To create and nurture beauty and authenticity by offering aesthetically high-value products
          produced by our world-class artisans.
          <br /><br />
          <strong className="block text-lg mt-4 text-indigo-600">Responsibility</strong>
          To pay utmost attention to what we create, how we create it, and how it impacts people and
          society.
          <br /><br />
          <strong className="block text-lg mt-4 text-indigo-600">Integrity</strong>
          To remain true to our history as an ethical and trustworthy brand, maintaining transparency,
          honesty, and accountability.
          <br /><br />
          <strong className="block text-lg mt-4 text-indigo-600">Customer First</strong>
          To ensure that we delight our customers by delivering timeless products of the highest
          quality.
        </Section>

        <Section title="CSR & Responsibility">
          We have deep compassion for our valued artisans. For generations, skilled Kashmiri artists
          have carried the tradition of Pashmina shawl-making through adversity and change. Our brand
          was founded with a commitment to empower these artisans and showcase their exceptional
          craftsmanship to the world.
          <br /><br />
          Dastoor was built on the belief that every artisan deserves respect, opportunity, and fair
          recognition. We collaborate directly with skilled individuals — not factories — ensuring
          inclusivity across age, gender, and background. Every year, we reinvest in our communities
          to foster growth, empowerment, and sustainability.
        </Section>

        <Section title="Sustainability">
          We proudly promote eco-friendly practices by using premium natural fibers — pure wool,
          gossamer silk, cashmere, and merino. In an era of fast fashion, sustainability is not the
          easiest path, but it is the most honorable one. At Dastoor, we champion slow fashion that
          values artistry, durability, and environmental harmony.
        </Section>

        <Section title="Shawls for All People">
          We believe in creating shawls for everyone — regardless of age, gender, or background. Our
          collections are designed to be universal, reflecting the spirit of inclusivity that defines
          our brand.
        </Section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-3">
            Become Part of Our Legacy
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join us in celebrating tradition, art, and craftsmanship. Together, we continue to carry
            forward a story of beauty, culture, and timeless style.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
