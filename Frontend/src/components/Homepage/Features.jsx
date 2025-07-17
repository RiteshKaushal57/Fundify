import { FaShieldAlt, FaHandshake, FaChartLine, FaUserTie } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt className="text-purple-400 text-3xl" />,
    title: "Secure & Private",
    description: "Your data and conversations are encrypted and protected, ensuring complete privacy and security for all users."
  },
  {
    icon: <FaHandshake className="text-purple-400 text-3xl" />,
    title: "Curated Connections",
    description: "We match investors and entrepreneurs based on interests and goals, making every connection meaningful and productive."
  },
  {
    icon: <FaChartLine className="text-purple-400 text-3xl" />,
    title: "Growth Opportunities",
    description: "Access a diverse range of vetted business proposals and investment opportunities for maximum ROI."
  },
  {
    icon: <FaUserTie className="text-purple-400 text-3xl" />,
    title: "Expert Guidance",
    description: "Get advice from seasoned business advisors to make informed decisions and accelerate your success."
  }
];

const FeaturesSection = () => (
  <section className="bg-white py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-black text-center mb-8">
        Why Choose Fundify?
      </h2>
      <p className="text-gray-800 text-xl text-center mb-12 max-w-3xl mx-auto">
        Discover the advantages that set us apart and empower your investment journey.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-[#28243c] bg-opacity-80 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
