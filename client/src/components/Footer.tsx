import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Make sure to install react-icons: npm install react-icons

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Using custom CSS variables
  const footerBg = "bg-[var(--color-bg)]";
  const textColor = "text-[var(--color-text)]";
  const subtleColor = "text-[var(--color-subtle)]";
  const emphasisBg = "bg-[var(--color-emphasis)]";

  // For hover backgrounds, we'll use a semi-transparent emphasis color for buttons
  const hoverEmphasisBg = "hover:brightness-90"; // A simple way to darken/lighten the emphasis color on hover

  return (
    <footer className={`${footerBg} ${subtleColor} py-10 border-t border-[var(--color-subtle)]/20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info / Logo */}
        <div>
          <h3 className={`text-xl font-bold ${textColor} mb-4`}>Stockly</h3>
          <p className="text-sm">Your go-to destination for high-quality products and an exceptional shopping experience.</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className={`text-[var(--color-subtle)] hover:${textColor} transition-colors duration-300`}>
              <FaFacebookF size={20} />
            </a>
            <a href="#" className={`text-[var(--color-subtle)] hover:${textColor} transition-colors duration-300`}>
              <FaTwitter size={20} />
            </a>
            <a href="#" className={`text-[var(--color-subtle)] hover:${textColor} transition-colors duration-300`}>
              <FaInstagram size={20} />
            </a>
            <a href="#" className={`text-[var(--color-subtle)] hover:${textColor} transition-colors duration-300`}>
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={`${textColor} font-semibold mb-4`}>Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className={`hover:${textColor} transition-colors duration-300`}>
                Home
              </a>
            </li>
            <li>
              <a href="#" className={`hover:${textColor} transition-colors duration-300`}>
                Shop
              </a>
            </li>
            <li>
              <a href="#" className={`hover:${textColor} transition-colors duration-300`}>
                About Us
              </a>
            </li>
            <li>
              <a href="#" className={`hover:${textColor} transition-colors duration-300`}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className={`${textColor} font-semibold mb-4`}>Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className={`hover:${textColor} transition-colors duration-300`}>
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className={`hover:${textColor} transition-colors duration-300`}>
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className={`hover:${textColor} transition-colors duration-300`}>
                Order Tracking
              </a>
            </li>
            <li>
              <a href="#" className={`hover:${textColor} transition-colors duration-300`}>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info / Newsletter (Optional) */}
        <div>
          <h4 className={`${textColor} font-semibold mb-4`}>Contact Us</h4>
          <p className="text-sm mb-2">123 E-commerce Street, City, Country</p>
          <p className="text-sm mb-2">
            Email:{" "}
            <a href="mailto:info@eshop.com" className={`hover:${textColor}`}>
              info@eshop.com
            </a>
          </p>
          <p className="text-sm">
            Phone:{" "}
            <a href="tel:+1234567890" className={`hover:${textColor}`}>
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className={`border-t border-[var(--color-subtle)]/20 mt-10 pt-6 text-center text-sm ${subtleColor}`}>&copy; {currentYear} Stockly. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
