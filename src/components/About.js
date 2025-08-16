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
      className="md:hidden absolute left-1/2 -translate-x-1/2 -top-2 glass rounded-full px-4 py-2 text-on-glass text-sm z-10 font-medium"
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
            className="text-right glass rounded-2xl p-6"
            whileHover={{ x: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Desktop year display */}
            <div className="hidden md:block text-sky-700 dark:text-sky-300 font-semibold mb-2 text-sm">
              {dateRange}
            </div>
            <h3 className="text-lg font-semibold text-on-glass mb-1">
              {title}
            </h3>
            <h4 className="text-md text-sky-700 dark:text-sky-300 mb-3 font-medium">
              {subtitle}
            </h4>
            <p className="text-sm text-on-glass-muted leading-relaxed text-justify">
              {description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Center line with dot */}
      <div className="absolute left-1/2 -translate-x-1/2 top-8 md:top-0 h-[calc(100%-2rem)] md:h-full">
        {/* Vertical line */}
        <div className="absolute w-1 h-full bg-gradient-to-b from-sky-400 via-cyan-400 to-slate-400 left-1/2 -translate-x-1/2 rounded-full opacity-60">
          <motion.div 
            className="absolute w-1 h-1/2 bg-gradient-to-b from-sky-400 to-cyan-400 rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          ></motion.div>
        </div>
        {/* Dot */}
        <div className="absolute w-6 h-6 left-1/2 -translate-x-1/2 top-12 md:top-1/2 -translate-y-1/2 rounded-full glass z-10 flex items-center justify-center border-2 border-white/20">
          <motion.div 
            className={`w-3 h-3 rounded-full ${isEducation ? 'bg-gradient-to-r from-sky-400 to-cyan-400' : 'bg-gradient-to-r from-slate-400 to-slate-500'}`}
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
            className="glass rounded-2xl p-6"
            whileHover={{ x: 5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Desktop year display */}
            <div className="hidden md:block text-slate-700 dark:text-slate-300 font-semibold mb-2 text-sm">
              {dateRange}
            </div>
            <h3 className="text-lg font-semibold text-on-glass mb-1">
              {title}
            </h3>
            <h4 className="text-md text-slate-700 dark:text-slate-300 mb-3 font-medium">
              {subtitle}
            </h4>
            <p className="text-sm text-on-glass-muted leading-relaxed text-justify">
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
      dateRange: 'Jan 2025 - Aug 2025',
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
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center text-on-glass mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="glass-strong rounded-3xl p-8 md:p-12 mb-16 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full blur-2xl opacity-30"></div>
            <p className="text-on-glass-muted mb-8 text-lg md:text-xl leading-relaxed text-justify">
              Machine Learning Engineer specializing in Computer Vision and Deep Learning. I build scalable AI solutions 
              that bridge the gap between research and production. My expertise lies in developing efficient computer vision 
              systems that solve real-world challenges.
            </p>
            <p className="text-on-glass-muted text-lg md:text-xl leading-relaxed text-justify">
              With a Master's from UC San Diego and experience at Plainsight Technologies, I combine strong theoretical 
              foundations with practical engineering skills. I'm passionate about creating AI systems that are not just 
              powerful, but also reliable and production-ready.
            </p>
          </motion.div>

          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-on-glass mb-8">
              Professional Timeline
            </h3>
            <div className="flex justify-center gap-16 text-lg text-on-glass-muted">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full"></div>
                Education
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full"></div>
                Experience
              </span>
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