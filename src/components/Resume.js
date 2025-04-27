import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { AiOutlineDownload } from 'react-icons/ai';
import { Document, Page, pdfjs } from 'react-pdf';
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 pt-20 pb-16">
      <Container fluid className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
            Resume
          </h1> */}
          
          {/* <div className="mb-8">
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
          </div> */}

          <div className="w-full flex justify-center pdf-container">
            <Document
              file={resumePDF}
              className="d-flex justify-content-center"
              loading={
                <div className="text-center py-8 text-gray-600 dark:text-gray-300">
                  Loading PDF...
                </div>
              }
              error={
                <div className="text-center py-8 text-red-600 dark:text-red-400">
                  Error loading PDF. Please try downloading instead.
                </div>
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

          <div className="mt-8">
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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Resume; 