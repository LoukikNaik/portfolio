import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ppgImage from '../assets/ppg.png';
import teslaImage from '../assets/tesla.png';
import mnistImage from '../assets/mnist.png';
import surfstoreImage from '../assets/surfstore.jpg';
import tritonHttpImage from '../assets/tritonhttp.jpg';
import emailClassifierImage from '../assets/email.jpg';

const Projects = () => {
  const projects = [
    {
      title: 'Tool-Call Tactics',
      description:
        'An interactive game that lets you experience how an AI agent reasons through tool calls. Watch and play as the agent decides which tools to use and why.',
      iframePreview: 'https://toolcalltactics.loukik.dev',
      technologies: ['AI Agents', 'Tool Use', 'Interactive', 'Game'],
      github: 'https://github.com/LoukikNaik/tool-call-tactics',
      live: 'https://toolcalltactics.loukik.dev',
    },

    {
      title: 'Surfstore: Distributed File Storage System',
      description:
        'Implemented a horizontally scalable file storage system using Go and gRPC. Features multiple block/metadata servers and Raft consensus for reliable data synchronization across servers.',
      image: surfstoreImage,
      technologies: ['Go', 'gRPC', 'Distributed Systems', 'Raft', 'Protocol Buffers'],
      github: 'https://github.com/LoukikNaik/Surfstore-Distributed-File-Storage-System.git',
    },

    {
      title: 'Hypertension Prediction using PPG Signals',
      description:
        'Created ETL pipeline for MIMIC-III dataset analysis, achieving 74% accuracy and 91% sensitivity in hypertension prediction from PPG signals.',
      image: ppgImage,
      technologies: ['Scikit-learn', 'Pandas', 'ETL', 'Machine Learning', 'Healthcare Analytics'],
      live: 'https://drive.google.com/file/d/1c3mTvv48zX0mRZf2zoSyrgkbfemB52xO/view',
    },

    {
      title: 'Prompt Based Email Classifier',
      description:
        'Developed an LLM-powered email classification system using custom prompts for categorization and importance detection. Integrated Ollama & Gemini API via LangChain with multithreaded optimization and Gmail API integration for privacy-focused email processing.',
      image: emailClassifierImage,
      technologies: ['LLMs', 'Prompt Engineering', 'LangChain', 'Gmail API', 'Multithreading'],
      github: 'https://github.com/LoukikNaik/email-classification-wrapper.git',
    },

    {
      title: 'TritonHTTP Server',
      description:
        'Built a concurrent HTTP server in Go supporting multiple virtual hosts with distinct document roots. Handles parallel client connections using goroutines and implements custom HTTP response handling.',
      image: tritonHttpImage,
      technologies: ['Go', 'HTTP', 'Concurrency', 'Goroutines', 'Server'],
      github: 'https://github.com/LoukikNaik/TritonHttp',
    },

    {
      title: 'Prototype Selection for 1-NN Classification',
      description:
        'Developed optimized prototype selection methods for large datasets, achieving 96.7% accuracy on MNIST using only 11% of the original data.',
      image: mnistImage,
      technologies: [
        'PyTorch',
        'NumPy',
        'Neural Networks',
        'Machine Learning',
        'Data Optimization',
      ],
      live: 'https://drive.google.com/file/d/1nodxS1qTK765bXoC-5JXkWDJ_8dBG9Td/view',
    },

    {
      title: 'Tesla Website Clone',
      description:
        'Built a responsive React-based clone of the Tesla website with Redux state management, deployed on GitHub Pages.',
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
      },
    },
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-on-glass mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="glass-strong rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)]"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <motion.div className="h-48 overflow-hidden relative" variants={imageVariants}>
                {project.iframePreview ? (
                  <iframe
                    src={project.iframePreview}
                    title={`${project.title} Preview`}
                    className="w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none"
                    loading="lazy"
                    tabIndex={-1}
                  />
                ) : project.image ? (
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <motion.div className="w-full h-full bg-gradient-to-br from-sky-400 via-cyan-400 to-slate-400 group-hover:scale-110 transition-transform duration-500"></motion.div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </motion.div>
              <div className="p-6">
                <motion.h3
                  className="text-xl font-bold text-on-glass mb-3 text-center group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors duration-300"
                  variants={titleVariants}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-on-glass-muted mb-6 text-sm leading-relaxed"
                  variants={descriptionVariants}
                >
                  {project.description}
                </motion.p>
                <motion.div
                  className="flex flex-wrap justify-center gap-2 mb-6"
                  variants={descriptionVariants}
                >
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="tech-bubble"
                      variants={techVariants}
                      whileHover={{ scale: 1.08, y: -3 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div
                  className="flex justify-center space-x-6"
                  variants={descriptionVariants}
                >
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass rounded-2xl text-on-glass-muted hover:text-on-glass transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub size={24} />
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass rounded-2xl text-on-glass-muted hover:text-on-glass transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaExternalLinkAlt size={24} />
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-sky-400/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-slate-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default Projects;
