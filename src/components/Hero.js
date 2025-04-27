import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import TypeWriter from './TypeWriter';
import profileImage from '../assets/loukik.jpeg';

const Hero = () => {
  const roles = [
    "Machine Learning Engineer",
    "Software Developer",
    "Large Language Models",
    "Computer Vision"
  ];

  return (
    <section id="home" className="pt-20 min-h-screen flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
              Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Loukik Naik</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 h-8">
              <TypeWriter 
                words={roles}
                typingSpeed={100}
                deletingSpeed={50}
                pauseTime={2000}
              />
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              I craft intelligent vision systems that help machines see, understand, and interact with the world around them. 
              Let's team up and turn bold ideas into reality with the power of machine learning!
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://github.com/loukiknaik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/loukiknaik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="mailto:loukiknaik@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <a href={profileImage} target="_blank" rel="noopener noreferrer">
              <img src={profileImage} alt="Profile" className="w-64 h-64 mx-auto rounded-full overflow-hidden" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 