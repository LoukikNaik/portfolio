import React from 'react';
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

const Skills = () => {
  const skills = [
    {
      name: 'PyTorch',
      icon: <SiPytorch size={40} className="text-red-500" />,
      level: 'Advanced',
    },
    {
      name: 'TensorFlow',
      icon: <SiTensorflow size={40} className="text-orange-500" />,
      level: 'Advanced',
    },
    {
      name: 'Scikit-learn',
      icon: <SiScikitlearn size={40} className="text-blue-500" />,
      level: 'Advanced',
    },
    {
      name: 'Pandas',
      icon: <SiPandas size={40} className="text-indigo-500" />,
      level: 'Advanced',
    },
    {
      name: 'Python',
      icon: <FaPython size={40} className="text-blue-500" />,
      level: 'Advanced',
    },
    {
      name: 'FastAPI',
      icon: <SiFastapi size={40} className="text-teal-500" />,
      level: 'Advanced',
    },
    {
      name: 'Kubernetes',
      icon: <SiKubernetes size={40} className="text-blue-600" />,
      level: 'Intermediate',
    },
    {
      name: 'Kubeflow',
      icon: <FaCube size={40} className="text-blue-400" />,
      level: 'Intermediate',
    },
    {
      name: 'Google Cloud',
      icon: <FaGoogle size={40} className="text-blue-500" />,
      level: 'Intermediate',
    },
    {
      name: 'Docker',
      icon: <FaDocker size={40} className="text-blue-600" />,
      level: 'Advanced',
    },
    {
      name: 'Git',
      icon: <FaGitAlt size={40} className="text-red-500" />,
      level: 'Advanced',
    },
    {
      name: 'React',
      icon: <FaReact size={40} className="text-blue-400" />,
      level: 'Intermediate',
    },
    {
      name: 'Node.js',
      icon: <FaNode size={40} className="text-green-500" />,
      level: 'Intermediate',
    },
    {
      name: 'Databases',
      icon: <FaDatabase size={40} className="text-purple-500" />,
      level: 'Intermediate',
    },
    {
      name: 'JavaScript',
      icon: <FaJs size={40} className="text-yellow-500" />,
      level: 'Intermediate',
    },
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              {skill.icon}
              <h3 className="mt-4 font-semibold text-gray-800 dark:text-white text-center">
                {skill.name}
              </h3>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {/* {skill.level} */}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 