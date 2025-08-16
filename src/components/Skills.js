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

const SkillItem = ({ name, icon: Icon, level, color }) => (
  <motion.div
    className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className={`text-4xl mb-2 ${color}`}
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      <Icon size={40} />
    </motion.div>
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{name}</h3>
    <span className="text-sm text-gray-600 dark:text-gray-300">{level}</span>
  </motion.div>
);

const Skills = () => {
  const skills = [
    {
      name: 'PyTorch',
      icon: SiPytorch,
      level: 'Advanced',
      color: 'text-red-500',
    },
    {
      name: 'TensorFlow',
      icon: SiTensorflow,
      level: 'Advanced',
      color: 'text-orange-500',
    },
    {
      name: 'Scikit-learn',
      icon: SiScikitlearn,
      level: 'Advanced',
      color: 'text-blue-500',
    },
    {
      name: 'Pandas',
      icon: SiPandas,
      level: 'Advanced',
      color: 'text-indigo-500',
    },
    {
      name: 'Python',
      icon: FaPython,
      level: 'Advanced',
      color: 'text-blue-500',
    },
    {
      name: 'FastAPI',
      icon: SiFastapi,
      level: 'Advanced',
      color: 'text-teal-500',
    },
    {
      name: 'Kubernetes',
      icon: SiKubernetes,
      level: 'Intermediate',
      color: 'text-blue-600',
    },
    {
      name: 'Kubeflow',
      icon: FaCube,
      level: 'Intermediate',
      color: 'text-blue-400',
    },
    {
      name: 'Google Cloud',
      icon: FaGoogle,
      level: 'Intermediate',
      color: 'text-blue-500',
    },
    {
      name: 'Docker',
      icon: FaDocker,
      level: 'Advanced',
      color: 'text-blue-600',
    },
    {
      name: 'Git',
      icon: FaGitAlt,
      level: 'Advanced',
      color: 'text-red-500',
    },
    {
      name: 'React',
      icon: FaReact,
      level: 'Intermediate',
      color: 'text-blue-400',
    },
    {
      name: 'Node.js',
      icon: FaNode,
      level: 'Intermediate',
      color: 'text-green-500',
    },
    {
      name: 'Databases',
      icon: FaDatabase,
      level: 'Intermediate',
      color: 'text-purple-500',
    },
    {
      name: 'JavaScript',
      icon: FaJs,
      level: 'Intermediate',
      color: 'text-yellow-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <SkillItem
              key={index}
              name={skill.name}
              icon={skill.icon}
              level={skill.level}
              color={skill.color}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 