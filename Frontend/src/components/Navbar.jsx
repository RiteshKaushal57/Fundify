import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const { isLogin, logoutUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
    toast.success('Logged out successfully');
    setIsMenuOpen(false); // Close menu after logout
  };

  // Close menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleMenuLinkClick = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gradient-to-br from-[#212130] via-[#212130] to-[#2e2a44] px-4 py-3 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-white">Fundify</span>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          ref={buttonRef}
          onClick={() => setIsMenuOpen(prev => !prev)}
          className="md:hidden p-2 rounded text-gray-200 hover:bg-[#2e2a44] focus:outline-none relative"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/business-idea" className="text-gray-200 hover:text-indigo-400 font-medium">Invest</Link>
          <Link to="/postIdea" className="text-gray-200 hover:text-indigo-400 font-medium">Share your idea</Link>
          <Link to="/about" className="text-gray-200 hover:text-indigo-400 font-medium">About us</Link>
          <Link to="/how-it-works" className="text-gray-200 hover:text-indigo-400 font-medium">How It Works</Link>
          <Link to="/dashboard" className="text-gray-200 hover:text-indigo-400 font-medium">Dashboard</Link>
          {isLogin ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-indigo-400 border-t border-gray-700 hover:bg-[#232136] font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="px-4 py-2 text-indigo-400 border-t border-gray-700 hover:bg-[#232136] font-semibold"
            >
              Signup
            </Link>
          )}
        </div>
      </div>

      {/* Small Dropdown Menu (Mobile) */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-4 top-16 w-fit px-8 gap-2 bg-gradient-to-br from-[#212130] via-[#2e2a44] to-[#39304A] border border-gray-700 rounded-lg shadow-lg z-50 md:hidden flex flex-col py-2"
        >
          <Link to="/business-idea" onClick={handleMenuLinkClick} className="text-gray-200 hover:text-indigo-400 font-medium">Invest</Link>
          <Link to="/postIdea" onClick={handleMenuLinkClick} className="text-gray-200 hover:text-indigo-400 font-medium">Share your idea</Link>
          <Link to="/about" onClick={handleMenuLinkClick} className="text-gray-200 hover:text-indigo-400 font-medium">About us</Link>
          <Link to="/how-it-works" onClick={handleMenuLinkClick} className="text-gray-200 hover:text-indigo-400 font-medium">How It Works</Link>
          {isLogin && (
            <Link to="/dashboard" onClick={handleMenuLinkClick} className="text-gray-200 hover:text-indigo-400 font-medium">Dashboard</Link>
          )}
          {isLogin ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-indigo-400 hover:bg-[#232136] font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              onClick={handleMenuLinkClick}
              className="px-4 py-2 text-indigo-400 hover:bg-[#232136] font-semibold"
            >
              Signup
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
