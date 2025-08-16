import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { AiOutlineDownload } from 'react-icons/ai';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion } from 'framer-motion';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import resumePDF from '../assets/Loukik_resume.pdf';
import './Resume.css';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const options = {
  cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
  cMapPacked: true,
};

const Resume = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const driveLink = "https://drive.google.com/file/d/1fd6LJSOxpy6GF0_18yXg85gVDsipP8Hd/view?usp=sharing";

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate scale based on screen width with larger values
  const getScale = () => {
    if (width > 1400) return 2.5;     // Extra large screens
    if (width > 1200) return 2.2;     // Large desktop
    if (width > 992) return 1.8;      // Desktop
    if (width > 768) return 1.5;      // Tablet
    if (width > 576) return 1.2;      // Large mobile
    return 1.0;                       // Mobile
  };

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

  return (
    <motion.div 
      className="min-h-screen pt-32 pb-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background particles */}
      <div className="bg-particles"></div>
      <div className="container mx-auto px-6 relative z-10">
        {/* <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center text-on-glass mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Resume
        </motion.h2> */}
        
        <motion.div 
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="w-full flex justify-center mb-8"
            variants={itemVariants}
          >
            <div className="glass-strong rounded-3xl p-6 max-w-4xl w-full">
              <Document
                file={resumePDF}
                className="flex justify-center"
                loading={
                  <motion.div 
                    className="text-center py-8 text-on-glass-muted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Loading PDF...
                  </motion.div>
                }
                error={
                  <motion.div 
                    className="text-center py-8 text-red-600 dark:text-red-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Error loading PDF. Please try downloading instead.
                  </motion.div>
                }
                options={options}
              >
                <Page 
                  pageNumber={1} 
                  scale={getScale()}
                  className="pdf-page"
                  renderAnnotationLayer={true}
                  renderTextLayer={true}
                  quality={100}
                />
              </Document>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.a
              href={resumePDF}
              target="_blank"
              download="Loukik_Naik_Resume.pdf"
              className="glass rounded-2xl px-8 py-4 text-on-glass-muted hover:text-on-glass transition-all duration-300 flex items-center justify-center font-semibold hover:scale-105"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <AiOutlineDownload className="mr-3" size={20} />
              Download Resume
            </motion.a>
            <motion.a
              href={driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl px-8 py-4 text-on-glass-muted hover:text-on-glass transition-all duration-300 flex items-center justify-center font-semibold hover:scale-105"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt className="mr-3" size={18} />
              View on Drive
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-sky-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-slate-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
    </motion.div>
  );
};

export default Resume; 