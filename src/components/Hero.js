import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="pt-20 min-h-screen flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
              Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Your Name</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
              Full Stack Developer | Web Designer | Tech Enthusiast
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              I create beautiful, responsive websites and applications using modern technologies.
              Let's work together to bring your ideas to life!
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="w-64 h-64 mx-auto bg-indigo-600 dark:bg-indigo-500 rounded-full overflow-hidden">
              {/* Add your profile image here */}
              <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-blue-400 dark:from-indigo-500 dark:to-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 