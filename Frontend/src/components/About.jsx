import React from 'react';

const AboutUs = () => {
  return (
    <section className=" py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
        {/* Image on top */}
        <div className="w-full">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="Business Collaboration"
            className="rounded-lg shadow-lg object-cover w-full h-64 md:h-96"
          />
        </div>

        {/* Text Content below the image */}
        <div className="text-center md:text-left">

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Welcome to <span className="font-semibold text-indigo-600">Fundify</span>, the premier online platform dedicated to bridging the gap between visionary entrepreneurs and forward-thinking investors in India.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            In today’s dynamic business environment, many promising startups and innovative business ideas struggle to find the right investment and mentorship to grow. At the same time, investors often face challenges in discovering credible opportunities that align with their financial goals. Our platform was born out of the need to create a seamless, transparent, and efficient marketplace where entrepreneurs, investors, bankers, and business advisors can connect, collaborate, and thrive together.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex justify-center md:justify-start items-center gap-2">
            <span role="img" aria-label="target">🎯</span> Our Mission
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            To empower entrepreneurs by providing them direct access to a diverse pool of investors and expert advisors, enabling smarter investment decisions and fostering sustainable business growth.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex justify-center md:justify-start items-center gap-2">
            <span role="img" aria-label="rocket">🚀</span> What We Offer
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-3 max-w-xl mx-auto md:mx-0 text-left">
            <li>🔹 A secure and user-friendly portal where business people can post their innovative ideas and proposals.</li>
            <li>🔹 A dedicated space for investors to explore, evaluate, and invest in high-potential ventures.</li>
            <li>🔹 Access to banking professionals offering loan solutions tailored for startups and growing businesses.</li>
            <li>🔹 Expert business advisors sharing insights, answering queries, and guiding entrepreneurs towards success.</li>
          </ul>

          <p className="mt-8 text-indigo-600 font-semibold text-lg">
            Join us to transform your ideas into reality and make impactful investments with confidence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
