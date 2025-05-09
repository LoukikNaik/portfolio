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
      className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 pt-20 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container fluid className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="w-full flex justify-center pdf-container"
            variants={itemVariants}
          >
            <Document
              file={resumePDF}
              className="d-flex justify-content-center"
              loading={
                <motion.div 
                  className="text-center py-8 text-gray-600 dark:text-gray-300"
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
          </motion.div>

          <motion.div 
            className="mt-8 flex gap-4"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="primary"
                href={resumePDF}
                target="_blank"
                download="Loukik_Naik_Resume.pdf"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
              >
                <AiOutlineDownload className="mr-2" />
                Download CV
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="primary"
                href={driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
              >
                <FaExternalLinkAlt className="mr-2" />
                View on Drive
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default Resume; 