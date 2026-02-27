import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';
import logoEudia from '../assets/logo-eudia.png';
import logoPlainsight from '../assets/logo-plainsight.png';
import logoLabsystems from '../assets/logo-labsystems.png';
import logoHexaview from '../assets/logo-hexaview.png';
import logoUcsd from '../assets/logo-ucsd.png';
import logoMumbaiUni from '../assets/logo-mumbai-uni.png';

const ExperienceCard = ({ item, index, accentColor }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  const accents = {
    slate: {
      dot: 'bg-slate-400',
      text: 'text-slate-600 dark:text-slate-300',
      badge: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
      line: 'bg-slate-300 dark:bg-slate-600',
    },
    sky: {
      dot: 'bg-sky-400',
      text: 'text-sky-600 dark:text-sky-300',
      badge: 'bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-300',
      line: 'bg-sky-300 dark:bg-sky-700',
    },
  };
  const colors = accents[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative bg-white/80 dark:bg-white/[0.06] backdrop-blur-sm rounded-2xl border border-gray-200/60 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.15] transition-all duration-300 cursor-pointer hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20"
      >
        {/* Header */}
        <div className="p-4 md:p-5 flex items-center gap-3 md:gap-4">
          {/* Logo */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0"
          >
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white dark:bg-white/90 p-1.5 shadow-sm border border-gray-100 dark:border-transparent hover:shadow-md transition-shadow duration-200">
              <img
                src={item.logo}
                alt={item.subtitle}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </a>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-tight truncate">
              {item.title}
            </h4>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`text-xs md:text-sm font-medium ${colors.text} hover:underline inline-flex items-center gap-1 truncate max-w-full`}
            >
              {item.subtitle}
              <FaExternalLinkAlt size={8} className="opacity-50 flex-shrink-0" />
            </a>
            <p className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {item.dateRange}
            </p>
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-gray-400 dark:text-gray-500 flex-shrink-0 ml-1"
          >
            <FaChevronDown size={12} />
          </motion.div>
        </div>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0">
                <div className={`h-px ${colors.line} mb-4 opacity-50`}></div>
                {item.roles ? (
                  <div className="space-y-4 ml-1">
                    {item.roles.map((role, roleIndex) => (
                      <div key={roleIndex} className="relative pl-4 md:pl-5">
                        <div
                          className={`absolute left-0 top-[7px] w-2 h-2 rounded-full ${colors.dot}`}
                        ></div>
                        {roleIndex < item.roles.length - 1 && (
                          <div
                            className={`absolute left-[3px] top-4 bottom-0 w-0.5 ${colors.line} opacity-40`}
                          ></div>
                        )}
                        <div className="flex flex-wrap items-baseline gap-1.5 md:gap-2 mb-1.5">
                          <span className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-100">
                            {role.title}
                          </span>
                          <span
                            className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}
                          >
                            {role.dateRange}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {role.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const About = () => {
  const [activeSection, setActiveSection] = useState('experience');

  const timelineData = [
    {
      dateRange: 'Sep 2025 - Present',
      endDate: new Date(),
      title: 'Software Engineer',
      subtitle: 'Eudia (Legal AI Startup, Series A)',
      url: 'https://www.eudia.com',
      logo: logoEudia,
      description:
        'Owned the Mergers and Acquisitions backend service end-to-end, building core infrastructure for an agent-based AI system for large-scale legal document analysis. Re-architected agent orchestration from Airflow to Temporal, designed backend APIs for AI agent execution, and converted service to multi-tenant architecture. Managing deployments with Kubernetes, Helm, and ArgoCD.',
      isEducation: false,
    },
    {
      dateRange: 'June 2024 - Aug 2025',
      endDate: new Date('2025-08-31'),
      title: 'Plainsight Technologies Inc.',
      subtitle: 'Computer Vision Infra Startup',
      url: 'https://www.plainsight.ai',
      logo: logoPlainsight,
      isEducation: false,
      roles: [
        {
          dateRange: 'Jan 2025 - Aug 2025',
          title: 'Machine Learning Engineer',
          description:
            'Built and deployed real-time image segmentation APIs for SAM and MobileSAM using FastAPI. Created cron-triggered retraining pipeline with Vertex AI. Designed OCR model evaluation framework and robust integration testing framework for model generation pipelines.',
        },
        {
          dateRange: 'June 2024 - Dec 2024',
          title: 'Machine Learning Intern',
          description:
            'Engineered an automated video processing pipeline using Kubeflow. Implemented end-to-end automation for video ingestion and processing, significantly reducing manual intervention.',
        },
      ],
    },
    {
      dateRange: 'Sep 2023 - Dec 2024',
      endDate: new Date('2024-12-14'),
      title: 'MS in Computer Science',
      subtitle: 'University of California San Diego',
      url: 'https://ucsd.edu',
      logo: logoUcsd,
      description:
        'Specialized in Machine Learning and Computer Vision. Completed advanced coursework in Deep Learning, Computer Vision, and Distributed Systems. GPA: 3.9/4.0',
      isEducation: true,
    },
    {
      dateRange: 'Feb 2023 - May 2023',
      endDate: new Date('2023-02-31'),
      title: 'AI Developer Intern',
      subtitle: 'Lab Systems(I) Pvt Ltd.',
      url: 'https://www.labsystems.co.in',
      logo: logoLabsystems,
      description:
        'Enhanced software performance through advanced object and text recognition techniques. Implemented solutions using PyTesseract, EasyOCR, YOLO, and MediaPipe for improved accuracy.',
      isEducation: false,
    },
    {
      dateRange: 'Jul 2022 - Aug 2022',
      endDate: new Date('2022-07-28'),
      title: 'SWE Intern',
      subtitle: 'Hexaview Technologies Inc.',
      url: 'https://www.hexaviewtech.com',
      logo: logoHexaview,
      description:
        'Developed and tested Android applications for client projects. Implemented automated testing strategies, achieving 20% improvement in code coverage.',
      isEducation: false,
    },
    {
      dateRange: 'Aug 2019 - May 2023',
      endDate: new Date('2019-08-31'),
      title: "Bachelor's in Computer Engineering",
      subtitle: 'Mumbai University',
      url: 'https://mum.digitaluniversity.ac',
      logo: logoMumbaiUni,
      description:
        'Graduated with Department Rank 1 (CGPA: 9.71/10.0). Led the Competitive Programming Club and served on the National Service Scheme core team. Focus on algorithms and software engineering.',
      isEducation: true,
    },
  ];

  const experienceData = timelineData
    .filter((item) => !item.isEducation)
    .sort((a, b) => b.endDate - a.endDate);

  const educationData = timelineData
    .filter((item) => item.isEducation)
    .sort((a, b) => b.endDate - a.endDate);

  const handleToggle = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const sections = [
    { key: 'experience', title: 'Experience', icon: FaBriefcase, items: experienceData, accent: 'slate' },
    { key: 'education', title: 'Education', icon: FaGraduationCap, items: educationData, accent: 'sky' },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center text-on-glass mb-10 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-strong rounded-2xl md:rounded-3xl p-5 md:p-10 mb-10 md:mb-16 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full blur-2xl opacity-30"></div>
            <p className="text-on-glass-muted mb-5 md:mb-6 text-sm md:text-base leading-relaxed">
              Software Engineer specializing in backend infrastructure for AI-powered applications.
              I build scalable systems that bridge machine learning research and production
              engineering, with expertise in agent orchestration, distributed systems, and deploying
              reliable AI solutions for enterprise use. My work spans real-time model deployment,
              automated retraining pipelines, and building robust APIs for computer vision and ML
              systems.
            </p>
            <p className="text-on-glass-muted text-sm md:text-base leading-relaxed">
              With a Master's degree in Computer Science and hands-on experience across ML
              infrastructure, computer vision, and cloud platforms, I combine deep technical
              knowledge with practical engineering skills. I'm passionate about building
              production-ready AI systems that solve complex real-world problems at scale, from
              legal document analysis to image processing pipelines.
            </p>
          </motion.div>

          {/* Section Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Tab Headers */}
            <div className="flex justify-center gap-2 md:gap-3 mb-5 md:mb-8">
              {sections.map((section) => {
                const isActive = activeSection === section.key;
                return (
                  <motion.button
                    key={section.key}
                    onClick={() => handleToggle(section.key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 md:flex-none relative flex items-center justify-center md:justify-start gap-2 md:gap-3 px-4 md:px-7 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/25'
                        : 'glass text-on-glass-muted hover:text-on-glass'
                    }`}
                  >
                    <section.icon size={16} className="md:w-[18px] md:h-[18px]" />
                    <span className="text-sm md:text-base">{section.title}</span>
                    <span
                      className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/25' : 'bg-white/10'
                      }`}
                    >
                      {section.items.length}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {sections.map(
                (section) =>
                  activeSection === section.key && (
                    <motion.div
                      key={section.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      {section.items.map((item, index) => (
                        <ExperienceCard
                          key={index}
                          item={item}
                          index={index}
                          accentColor={section.accent}
                        />
                      ))}
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
