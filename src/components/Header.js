import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Blog', href: '/blog', isPage: true },
    { name: 'Resume', href: '/resume', isPage: true },
  ];

  const handleNavigation = (e, link) => {
    e.preventDefault();
    if (link.isPage) {
      navigate(link.href);
      window.scrollTo(0, 0);
    } else {
      // If we're not on the home page, navigate to home first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
          const element = document.querySelector(link.href.replace('/', ''));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // If we're already on home page, just scroll
        const element = document.querySelector(link.href.replace('/', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsOpen(false);
  };

  const renderLink = (link) => {
    if (link.isPage) {
      return (
        <Link
          to={link.href}
          onClick={() => {
            setIsOpen(false);
            window.scrollTo(0, 0);
          }}
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 font-medium block w-full"
        >
          {link.name}
        </Link>
      );
    }
    return (
      <a
        href={link.href}
        onClick={(e) => handleNavigation(e, link)}
        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 font-medium block w-full"
      >
        {link.name}
      </a>
    );
  };

  return (
    <header className="fixed w-full z-50 p-4">
      <nav className="container mx-auto max-w-6xl">
        <div className="glass rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Dark mode toggle */}
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 rounded-xl glass"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </div>

            {/* Desktop Navigation - Right side */}
            <div className="hidden md:flex items-center space-x-2">
              {links.map((link) => (
                <div key={link.name} className="px-4 py-2 rounded-xl glass-hover nav-link">
                  {renderLink(link)}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none p-2 rounded-xl glass"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/20">
              <div className="space-y-2">
                {links.map((link) => (
                  <div key={link.name} className="block px-4 py-3 rounded-xl touch-target">
                    {renderLink(link)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
