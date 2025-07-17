import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { FaRocket, FaLock, FaFlag } from 'react-icons/fa'

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const handleInvestClick = () => {
    if (!user) {
      navigate('/investor/register');
      return;
    }
    const isInvestor = user.roles?.includes('Investor');
    const kycDone = user.kycStatus === true || user.isVerified;
    if (!isInvestor) navigate('/investor/register');
    else if (!kycDone) navigate('/kyc');
    else navigate('/invest');
  };

  const handleShareIdeaClick = () => {
    if (!user) {
      navigate('/entrepreneur/register');
      return;
    }
    const isEntrepreneur = user.roles?.includes('Entrepreneur');
    const kycDone = user.kycStatus === true || user.isVerified;
    if (!isEntrepreneur) navigate('/entrepreneur/register');
    else if (!kycDone) navigate('/kyc');
    else navigate('/postIdea');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#212130] via-[#2e2a44] to-[#39304A] min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
      

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
        Empowering Ideas.<br className="hidden md:block" />
        Connecting Investors & Entrepreneurs.
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 drop-shadow-md">
        Fundify bridges the gap between visionary business minds and forward-thinking investors.
        Discover, connect, and grow together on India’s most trusted investment matchmaking platform.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10 w-full max-w-md mx-auto">
        <button
          onClick={handleInvestClick}
          className="bg-purple-100 hover:bg-purple-700 hover:text-white text-purple-950 px-8 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-105"
        >
          Start Investing
        </button>
        <button
          onClick={handleShareIdeaClick}
          className="bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-700 hover:text-white px-8 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-105"
        >
          Share Your Idea
        </button>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto text-gray-300 font-semibold text-sm">
        <span className="inline-flex items-center gap-2 bg-purple-800 bg-opacity-40 px-5 py-3 rounded-2xl shadow-md">
          <FaRocket className="text-purple-100 text-xl" /> 100+ Startups Funded
        </span>
        <span className="inline-flex items-center gap-2 bg-purple-800 bg-opacity-40 px-5 py-3 rounded-2xl shadow-md">
          <FaLock className="text-purple-100 text-xl" /> Secure & Private Connections
        </span>
        <span className="inline-flex items-center gap-2 bg-purple-800 bg-opacity-40 px-5 py-3 rounded-2xl shadow-md">
          <FaFlag className="text-purple-100 text-xl" /> Built for India's Growth
        </span>
      </div>
    </section>
  )
}

export default Hero
