import React from 'react';
import { FaMedium, FaYoutube, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import mediumOpenfilter from '../assets/medium-openfilter.png';
import ytOpenfilter from '../assets/yt-openfilter.jpg';

const Blog = () => {
  const posts = [
    {
      title: 'How to Build a Computer Vision Pipeline in 10 Minutes Using OpenFilter',
      description:
        'A step-by-step guide to building and deploying a computer vision pipeline quickly using OpenFilter, covering model selection, data ingestion, and deployment.',
      url: 'https://medium.com/@loukiknaik/how-to-build-a-computer-vision-pipeline-in-10-minutes-using-openfilter-666544fb2b7a',
      icon: FaMedium,
      source: 'Medium',
      image: mediumOpenfilter,
    },
    {
      title: 'How to Build a Computer Vision Pipeline in 10 Minutes Using OpenFilter',
      description:
        'Video walkthrough demonstrating how to build a complete computer vision pipeline using OpenFilter in under 10 minutes.',
      url: 'https://www.youtube.com/watch?v=a3D-915mY8U',
      icon: FaYoutube,
      source: 'YouTube',
      image: ytOpenfilter,
      imageClass: 'object-cover object-center',
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

  return (
    <motion.div
      className="min-h-screen pt-32 pb-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-particles"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-on-glass mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Blog & Media
        </motion.h2>
        <motion.div
          className="flex flex-col gap-8 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post, index) => (
            <motion.a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-strong rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group block"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Preview image */}
              <div className="h-64 md:h-72 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className={`w-full h-full ${post.imageClass || 'object-cover object-top'} group-hover:scale-105 transition-transform duration-500`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                  <post.icon size={14} />
                  {post.source}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-on-glass mb-3 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-on-glass-muted text-sm leading-relaxed">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sky-600 dark:text-sky-400 text-sm font-medium">
                  <span>Read more</span>
                  <FaExternalLinkAlt size={12} />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-sky-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-slate-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
    </motion.div>
  );
};

export default Blog;
