import { useDarkMode } from "../context/Darkmode";
import React, { useState } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs"; // Importing sun and moon icons

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  const { isDark, toggleDarkMode } = useDarkMode(); // Using custom hook for dark mode context

  // Using custom CSS variables for Tailwind classes
  const navBg = "bg-[var(--color-bg)]";
  const textColor = "text-[var(--color-text)]";
  const subtleColor = "text-[var(--color-subtle)]";
  const emphasisColor = "border-[var(--color-emphasis)]";
  const ringEmphasisColor = "focus:ring-[var(--color-emphasis)]";
  const hoverBgSubtle = "hover:bg-[var(--color-subtle)]/10"; // 10% opacity for hover background

  return (
    <nav className={`${navBg} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className={`text-2xl font-bold ${textColor}`}>
                <img className="h-36" src="/Logo.png" alt="Logo" />
              </a>
            </div>
            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="/" className={`border-b-2 border-transparent ${subtleColor} hover:${emphasisColor} hover:${textColor} inline-flex items-center px-1 pt-1 text-sm font-medium`}>
                Home
              </a>

              <a href="/cart" className={`border-b-2 border-transparent ${subtleColor} hover:${emphasisColor} hover:${textColor} inline-flex items-center px-1 pt-1 text-sm font-medium`}>
                Cart
              </a>
            </div>
          </div>

          {/* Right section: Dark Mode Toggle + Mobile Menu Button */}
          <div className="flex items-center">
            {/* Dark Mode Toggle */}
            <button onClick={toggleDarkMode} className={`p-2 rounded-md ${subtleColor} hover:${textColor} ${hoverBgSubtle} focus:outline-none focus:ring-2 focus:ring-inset ${ringEmphasisColor}`} aria-label="Toggle dark mode">
              {isDark ? <BsSunFill size={20} /> : <BsMoonFill size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <div className="-mr-2 ml-4 flex items-center sm:hidden">
              {" "}
              {/* Added ml-4 for spacing */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={`inline-flex items-center justify-center p-2 rounded-md ${subtleColor} hover:${textColor} ${hoverBgSubtle} focus:outline-none focus:ring-2 focus:ring-inset ${ringEmphasisColor}`}
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <a href="#" className={`block px-3 py-2 rounded-md text-base font-medium ${subtleColor} ${hoverBgSubtle} hover:${textColor}`}>
            Home
          </a>
          <a href="#" className={`block px-3 py-2 rounded-md text-base font-medium ${subtleColor} ${hoverBgSubtle} hover:${textColor}`}>
            Cart
          </a>
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
