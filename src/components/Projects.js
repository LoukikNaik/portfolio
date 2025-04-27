import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
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

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-600">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600"></div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-justify">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <FaExternalLinkAlt size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 