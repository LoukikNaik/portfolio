import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ppgImage from '../assets/ppg.png';
import teslaImage from '../assets/tesla.png';
import mnistImage from '../assets/mnist.png';

const Projects = () => {
  const projects = [
    {
      title: 'Surfstore: Distributed File Storage System',
      description: 'Implemented a horizontally scalable file storage system using Go and gRPC. Features multiple block/metadata servers and Raft consensus for reliable data synchronization across servers.',
      image: null,
      technologies: ['Go', 'gRPC', 'Distributed Systems', 'Raft', 'Protocol Buffers'],
      github: 'https://github.com/LoukikNaik/Surfstore-Distributed-File-Storage-System.git',
    },

    {
      title: 'Hypertension Prediction using PPG Signals',
      description: 'Created ETL pipeline for MIMIC-III dataset analysis, achieving 74% accuracy and 91% sensitivity in hypertension prediction from PPG signals.',
      image: ppgImage,
      technologies: ['Scikit-learn', 'Pandas', 'ETL', 'Machine Learning', 'Healthcare Analytics'],
      live: 'https://drive.google.com/file/d/1c3mTvv48zX0mRZf2zoSyrgkbfemB52xO/view',
    },

    {
      title: 'TritonHTTP Server',
      description: 'Built a concurrent HTTP server in Go supporting multiple virtual hosts with distinct document roots. Handles parallel client connections using goroutines and implements custom HTTP response handling.',
      image: null,
      technologies: ['Go', 'HTTP', 'Concurrency', 'Goroutines', 'Server'],
      github: 'https://github.com/LoukikNaik/TritonHttp',
    },

    {
      title: 'Prototype Selection for 1-NN Classification',
      description: 'Developed optimized prototype selection methods for large datasets, achieving 96.7% accuracy on MNIST using only 11% of the original data.',
      image: mnistImage,
      technologies: ['PyTorch', 'NumPy', 'Neural Networks', 'Machine Learning', 'Data Optimization'],
      live: 'https://drive.google.com/file/d/1nodxS1qTK765bXoC-5JXkWDJ_8dBG9Td/view',
    },

    {
      title: 'Tesla Website Clone',
      description: 'Built a responsive React-based clone of the Tesla website with Redux state management, deployed on GitHub Pages.',
      image: teslaImage,
      technologies: ['React', 'Redux', 'GitHub Pages', 'Responsive Design', 'Frontend Development'],
      github: 'https://github.com/LoukikNaik/tesla-clone',
      live: 'https://loukiknaik.github.io/tesla-clone/',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.4
      }
    }
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="h-48 bg-gray-200 dark:bg-gray-600 overflow-hidden"
                variants={imageVariants}
              >
                {project.image ? (
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.div 
                    className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                )}
              </motion.div>
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center"
                  variants={titleVariants}
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-4 text-justify"
                  variants={descriptionVariants}
                >
                  {project.description}
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-2 mb-4"
                  variants={descriptionVariants}
                >
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                      variants={techVariants}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div 
                  className="flex space-x-4"
                  variants={descriptionVariants}
                >
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub size={20} />
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaExternalLinkAlt size={20} />
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 