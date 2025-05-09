import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ dateRange, title, subtitle, description, isEducation }) => (
  <motion.div 
    className="relative flex flex-col md:flex-row gap-10 pb-24 md:pb-16 last:pb-0"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {/* Year marker - centered above on mobile, hidden on desktop */}
    <motion.div 
      className="md:hidden absolute left-1/2 -translate-x-1/2 -top-2 bg-indigo-600 dark:bg-indigo-500 text-white px-3 py-1 rounded text-sm z-10"
      whileHover={{ scale: 1.05 }}
    >
      {dateRange}
    </motion.div>

    {/* Content wrapper */}
    <div className="flex w-full mt-8 md:mt-0">
      {/* Left side (Education) */}
      <div className={`w-1/2 pr-8 ${isEducation ? '' : 'invisible'}`}>
        {isEducation && (
          <motion.div 
            className="text-right"
            whileHover={{ x: -5 }}
          >
            {/* Desktop year display */}
            <div className="hidden md:block text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
              {dateRange}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {title}
            </h3>
            <h4 className="text-md text-indigo-600 dark:text-indigo-400 mb-2">
              {subtitle}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Center line with dot */}
      <div className="absolute left-1/2 -translate-x-1/2 top-8 md:top-0 h-[calc(100%-2rem)] md:h-full">
        {/* Vertical line */}
        <div className="absolute w-0.5 h-full bg-gray-200 dark:bg-gray-700 left-1/2 -translate-x-1/2">
          <motion.div 
            className="absolute w-0.5 h-1/2 bg-indigo-500 dark:bg-indigo-400"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          ></motion.div>
        </div>
        {/* Dot */}
        <div className="absolute w-5 h-5 left-1/2 -translate-x-1/2 top-12 md:top-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-500 dark:border-indigo-400 bg-white dark:bg-gray-900 z-10 flex items-center justify-center">
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-indigo-500 dark:bg-indigo-400"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>
      </div>

      {/* Right side (Experience) */}
      <div className={`w-1/2 pl-8 ${isEducation ? 'invisible' : ''}`}>
        {!isEducation && (
          <motion.div
            whileHover={{ x: 5 }}
          >
            {/* Desktop year display */}
            <div className="hidden md:block text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
              {dateRange}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {title}
            </h3>
            <h4 className="text-md text-indigo-600 dark:text-indigo-400 mb-2">
              {subtitle}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  </motion.div>
);

const About = () => {
  const timelineData = [
    {
      dateRange: 'Jan 2025 - Present',
      endDate: new Date(),
      title: 'Machine Learning Engineer',
      subtitle: 'Plainsight Technologies Inc.',
      description: 'Contributing to the development of production-ready computer vision solutions. Built scalable FastAPI endpoints for real-time image segmentation using Meta SAM and MobileSAM models. Architecting ML model training and deployment pipelines.',
      isEducation: false
    },
    {
      dateRange: 'June 2024 - Dec 2024',
      endDate: new Date('2024-12-15'),
      title: 'Machine Learning Intern',
      subtitle: 'Plainsight Technologies Inc.',
      description: 'Engineered an automated video processing pipeline using Kubeflow. Implemented end-to-end automation for video ingestion and processing, significantly reducing manual intervention.',
      isEducation: false
    },
    {
      dateRange: 'Sep 2023 - Dec 2024',
      endDate: new Date('2024-12-14'),
      title: "MS in Computer Science",
      subtitle: 'University of California San Diego',
      description: 'Specialized in Machine Learning and Computer Vision. Completed advanced coursework in Deep Learning, Computer Vision, and Distributed Systems. GPA: 3.9/4.0',
      isEducation: true
    },
    {
      dateRange: 'Feb 2023 - May 2023',
      endDate: new Date('2023-02-31'),
      title: 'AI Developer Intern',
      subtitle: 'Lab Systems(I) Pvt Ltd.',
      description: 'Enhanced software performance through advanced object and text recognition techniques. Implemented solutions using PyTesseract, EasyOCR, YOLO, and MediaPipe for improved accuracy.',
      isEducation: false
    },
    {
      dateRange: 'Jul 2022 - Aug 2022',
      endDate: new Date('2022-07-28'),
      title: 'SWE Intern',
      subtitle: 'Hexaview Technologies Inc.',
      description: 'Developed and tested Android applications for client projects. Implemented automated testing strategies, achieving 20% improvement in code coverage.',
      isEducation: false
    },
    {
      dateRange: 'Aug 2019 - May 2023',
      endDate: new Date('2019-08-31'),
      title: "Bachelor's in Computer Engineering",
      subtitle: 'Mumbai University',
      description: 'Graduated with Department Rank 1 (CGPA: 9.71/10.0). Led the Competitive Programming Club and served on the National Service Scheme core team. Focus on algorithms and software engineering.',
      isEducation: true
    },
  ].sort((a, b) => b.endDate - a.endDate);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              Machine Learning Engineer specializing in Computer Vision and Deep Learning. I build scalable AI solutions 
              that bridge the gap between research and production. My expertise lies in developing efficient computer vision 
              systems that solve real-world challenges.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              With a Master's from UC San Diego and experience at Plainsight Technologies, I combine strong theoretical 
              foundations with practical engineering skills. I'm passionate about creating AI systems that are not just 
              powerful, but also reliable and production-ready.
            </p>
          </motion.div>

          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Professional Timeline
            </h3>
            <div className="flex justify-center gap-12 text-sm text-gray-600 dark:text-gray-300">
              <span>← Education</span>
              <span>Experience →</span>
            </div>
          </motion.div>

          {/* Timeline container */}
          <motion.div 
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                dateRange={item.dateRange}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                isEducation={item.isEducation}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 