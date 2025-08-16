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
    <section id="home" className="pt-32 pb-20 min-h-screen flex items-center relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="glass-strong rounded-3xl p-8 lg:p-12">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-on-glass mb-6 leading-tight"
                variants={itemVariants}
              >
                Hi, I'm{' '}
                <span className="gradient-text bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                  Loukik Naik
                </span>
              </motion.h1>
              <motion.h2 
                className="text-xl md:text-2xl lg:text-3xl text-on-glass-muted mb-8 h-12 font-medium"
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
                className="text-on-glass-muted mb-10 max-w-2xl text-lg lg:text-xl leading-relaxed"
                variants={itemVariants}
              >
                I craft intelligent vision systems that help machines see, understand, and interact with the world around them. 
                Let's team up and turn bold ideas into reality with the power of machine learning!
              </motion.p>
              <motion.div 
                className="flex justify-center lg:justify-start space-x-6"
                variants={itemVariants}
              >
                <motion.a
                  href="https://github.com/loukiknaik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-2xl text-on-glass-muted hover:text-on-glass transition-all duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub size={28} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/loukiknaik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-2xl text-on-glass-muted hover:text-on-glass transition-all duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin size={28} />
                </motion.a>
                <motion.a
                  href="mailto:loukiknaik@gmail.com"
                  className="p-4 glass rounded-2xl text-on-glass-muted hover:text-on-glass transition-all duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope size={28} />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full blur-2xl opacity-30 scale-110"></div>
              <motion.div
                className="relative glass-strong rounded-full p-4 float-animation w-fit mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ aspectRatio: '1/1' }}
              >
                <motion.a 
                  href={profileImage} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-80 h-80 lg:w-80 lg:h-80 mx-auto rounded-full object-cover border-4 border-white/20" 
                    style={{ aspectRatio: '1/1' }}
                  />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-sky-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-slate-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
    </section>
  );
};

export default Hero; 