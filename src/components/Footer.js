import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative py-12 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="mb-6 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-on-glass-muted text-center md:text-left">
                Made with <FaHeart className="inline text-pink-500 dark:text-pink-400 mx-1" /> by{' '}
                <span className="text-sky-700 dark:text-sky-300 font-semibold">Loukik Naik</span>
              </p>
              <p className="text-on-glass-light text-sm mt-1 text-center md:text-left">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.a
                href="https://github.com/loukiknaik"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-2xl text-on-glass-muted hover:text-on-glass transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/loukiknaik"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-2xl text-on-glass-muted hover:text-on-glass transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a
                href="https://twitter.com/loukiknaik"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-2xl text-on-glass-muted hover:text-on-glass transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter size={24} />
              </motion.a>
            </motion.div>
          </div>
          
          {/* Decorative gradient line */}
          <motion.div 
            className="mt-8 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-slate-400 rounded-full opacity-60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </div>
      </div>
      
      {/* Final floating element */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
    </footer>
  );
};

export default Footer; 