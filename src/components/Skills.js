import React from 'react';
import { motion } from 'framer-motion';
import {
  FaJs,
  FaReact,
  FaNode,
  FaDatabase,
  FaGitAlt,
  FaDocker,
  FaPython,
  FaGoogle,
  FaCube,
} from 'react-icons/fa';
import {
  SiPytorch,
  SiFastapi,
  SiKubernetes,
  SiTensorflow,
  SiPandas,
  SiScikitlearn,
} from 'react-icons/si';

const SkillItem = ({ name, icon: Icon, color }) => (
  <motion.div
    className="flex flex-col items-center p-6 glass-strong rounded-2xl hover:scale-105 transition-all duration-300 group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className={`text-5xl mb-4 ${color}`}
      whileHover={{ rotate: 360, scale: 1.1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <Icon size={48} />
    </motion.div>
    <h3 className="text-lg font-bold text-on-glass text-center group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors duration-300">
      {name}
    </h3>
  </motion.div>
);

const Skills = () => {
  const skills = [
    {
      name: 'PyTorch',
      icon: SiPytorch,
      color: 'text-red-500',
    },
    {
      name: 'TensorFlow',
      icon: SiTensorflow,
      color: 'text-orange-500',
    },
    {
      name: 'Scikit-learn',
      icon: SiScikitlearn,
      color: 'text-blue-500',
    },
    {
      name: 'Pandas',
      icon: SiPandas,
      color: 'text-indigo-500',
    },
    {
      name: 'Python',
      icon: FaPython,
      color: 'text-blue-500',
    },
    {
      name: 'FastAPI',
      icon: SiFastapi,
      color: 'text-teal-500',
    },
    {
      name: 'Kubernetes',
      icon: SiKubernetes,
      color: 'text-blue-600',
    },
    {
      name: 'Kubeflow',
      icon: FaCube,
      color: 'text-blue-400',
    },
    {
      name: 'Google Cloud',
      icon: FaGoogle,
      color: 'text-blue-500',
    },
    {
      name: 'Docker',
      icon: FaDocker,
      color: 'text-blue-600',
    },
    {
      name: 'Git',
      icon: FaGitAlt,
      color: 'text-red-500',
    },
    {
      name: 'React',
      icon: FaReact,
      color: 'text-blue-400',
    },
    {
      name: 'Node.js',
      icon: FaNode,
      color: 'text-green-500',
    },
    {
      name: 'Databases',
      icon: FaDatabase,
      color: 'text-purple-500',
    },
    {
      name: 'JavaScript',
      icon: FaJs,
      color: 'text-yellow-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-on-glass mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <SkillItem key={index} name={skill.name} icon={skill.icon} color={skill.color} />
          ))}
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-slate-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-sky-400/10 rounded-full blur-xl animate-pulse delay-1500"></div>
    </section>
  );
};

export default Skills;
