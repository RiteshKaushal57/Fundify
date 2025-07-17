import React, { useRef, useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Founder, FinTech Startup",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback:
      "Fundify made it effortless to connect with the right investors. The process was smooth, secure, and transparent. Our business is now thriving thanks to the expert guidance and funding we received!"
  },
  {
    name: "Priya Desai",
    role: "Angel Investor",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback:
      "The curated proposals and secure communication tools set Fundify apart. I found promising startups and made investments with confidence. Highly recommended for serious investors!"
  },
  {
    name: "Rahul Verma",
    role: "Business Advisor",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    feedback:
      "As an advisor, I appreciate the seamless way Fundify connects me to entrepreneurs seeking guidance. The platform’s professionalism and support are top-notch."
  },
  {
    name: "Sneha Patel",
    role: "Startup Enthusiast",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    feedback:
      "I love the intuitive interface and the quality of opportunities here. Fundify is the best place for new entrepreneurs!"
  },
  {
    name: "Vikram Singh",
    role: "Investor",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    feedback:
      "I’ve discovered some of the most promising startups on Fundify. The platform’s transparency and support are unmatched."
  },
  {
    name: "Anjali Mehra",
    role: "Entrepreneur",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    feedback:
      "With Fundify, I found not just funding but also mentorship. It’s a game-changer for Indian startups."
  },
  {
    name: "Rohit Jain",
    role: "Venture Capitalist",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    feedback:
      "The due diligence tools and curated proposals make investment decisions easy and reliable."
  },
  {
    name: "Meera Gupta",
    role: "Business Consultant",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    feedback:
      "I’ve helped many clients succeed thanks to the resources and connections I found on Fundify."
  },
  {
    name: "Suresh Kumar",
    role: "Startup Mentor",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    feedback:
      "The community at Fundify is vibrant and supportive. I enjoy mentoring here!"
  },
  {
    name: "Kavita Nair",
    role: "Investor",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
    feedback:
      "I appreciate the security and privacy features. Fundify is my go-to platform for discovering new ventures."
  }
];

const carouselTestimonials = [...testimonials, ...testimonials];

const TestimonialsCarousel = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    let animationFrame;
    let lastTimestamp = performance.now();
    const baseSpeed = 0.04;
    const slowSpeed = 0.018;

    const animate = (timestamp) => {
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const scrollSpeed = isHovered ? slowSpeed : baseSpeed;

      if (container) {
        container.scrollLeft += scrollSpeed * elapsed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-10">
          What Our Users Say
        </h2>
        <div
          ref={containerRef}
          className="flex overflow-x-hidden"
          style={{ cursor: "grab" }}
        >
          {carouselTestimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 mx-4 bg-gray-50 rounded-2xl shadow-lg p-6 border border-gray-200 relative align-top"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                minWidth: "320px",
                maxWidth: "320px",
                marginBottom: "1rem",
                transition: "transform 0.3s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "auto"
              }}
            >
              <FaQuoteLeft className="text-indigo-400 text-2xl absolute left-6 top-6" />
              <p
                className="text-gray-700 italic mb-6 mt-8 text-sm md:text-base leading-relaxed break-words whitespace-normal"
                style={{
                  wordBreak: "break-word",
                  overflow: "visible",
                  display: "block"
                }}
              >
                "{testimonial.feedback}"
              </p>
              <div className="flex flex-col items-center mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full border-4 border-indigo-400 mb-3 object-cover shadow"
                />
                <span className="block text-gray-900 font-semibold text-base md:text-lg text-center">
                  {testimonial.name}
                </span>
                <span className="block text-indigo-500 text-sm md:text-base text-center">
                  {testimonial.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
