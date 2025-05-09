import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import TypeWriter from './TypeWriter';
import profileImage from '../assets/loukik.jpeg';

const Hero = () => {
  const roles = [
    "Machine Learning Engineer",
    "Software Developer",
    "Large Language Models",
    "Computer Vision"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="pt-20 min-h-screen flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4"
              variants={itemVariants}
            >
              Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Loukik Naik</span>
            </motion.h1>
            <motion.h2 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 h-8"
              variants={itemVariants}
            >
              <TypeWriter 
                words={roles}
                typingSpeed={100}
                deletingSpeed={50}
                pauseTime={2000}
              />
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg"
              variants={itemVariants}
            >
              I craft intelligent vision systems that help machines see, understand, and interact with the world around them. 
              Let's team up and turn bold ideas into reality with the power of machine learning!
            </motion.p>
            <motion.div 
              className="flex justify-center md:justify-start space-x-4"
              variants={itemVariants}
            >
              <motion.a
                href="https://github.com/loukiknaik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/loukiknaik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:loukiknaik@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope size={24} />
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 mt-12 md:mt-0"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.a 
              href={profileImage} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={profileImage} alt="Profile" className="w-64 h-64 mx-auto rounded-full overflow-hidden" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 