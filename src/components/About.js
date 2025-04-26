import React from 'react';

const TimelineItem = ({ dateRange, title, subtitle, description, isEducation }) => (
  <div className="relative flex flex-col md:flex-row gap-10 pb-16 last:pb-0">
    {/* Year marker - centered above on mobile, hidden on desktop */}
    <div className="md:hidden absolute left-1/2 -translate-x-1/2 bg-indigo-600 dark:bg-indigo-500 text-white px-2 py-1 rounded text-sm">
      {dateRange}
    </div>

    {/* Content wrapper */}
    <div className="flex w-full">
      {/* Left side (Education) */}
      <div className={`w-1/2 pr-8 ${isEducation ? '' : 'invisible'}`}>
        {isEducation && (
          <div className="text-right">
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
          </div>
        )}
      </div>

      {/* Center line with dot */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full">
        {/* Vertical line */}
        <div className="absolute w-0.5 h-full bg-gray-200 dark:bg-gray-700 left-1/2 -translate-x-1/2">
          <div className="absolute w-0.5 h-1/2 bg-indigo-500 dark:bg-indigo-400"></div>
        </div>
        {/* Dot */}
        <div className="absolute w-4 h-4 left-1/2 -translate-x-1/2 top-4 rounded-full border-2 border-indigo-500 dark:border-indigo-400 bg-white dark:bg-gray-900">
          <div className="absolute w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Right side (Experience) */}
      <div className={`w-1/2 pl-8 ${isEducation ? 'invisible' : ''}`}>
        {!isEducation && (
          <div>
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
          </div>
        )}
      </div>
    </div>
  </div>
);

const About = () => {
  const timelineData = [
    {
      dateRange: 'Jan 2022 - Present',
      endDate: new Date('2024-03-19'), // Current date for 'Present'
      title: 'Senior Developer',
      subtitle: 'Tech Company Inc.',
      description: 'Leading development team in creating innovative solutions and mentoring junior developers. Implemented key features that increased user engagement by 40%.',
      isEducation: false
    },
    {
      dateRange: 'Mar 2020 - Dec 2021',
      endDate: new Date('2021-12-31'),
      title: 'Full Stack Developer',
      subtitle: 'Web Solutions Ltd.',
      description: 'Developed and maintained multiple client projects using React, Node.js, and AWS. Reduced loading times by 60% through optimization.',
      isEducation: false
    },
    {
      dateRange: 'Sep 2016 - May 2020',
      endDate: new Date('2020-05-31'),
      title: "Bachelor's in Computer Science",
      subtitle: 'University Name',
      description: 'Graduated with honors, focused on web technologies and artificial intelligence. Led the university web development club.',
      isEducation: true
    },
    {
      dateRange: 'Jun 2019 - Feb 2020',
      endDate: new Date('2020-02-28'),
      title: 'Junior Developer',
      subtitle: 'Startup Name',
      description: 'Started career as a frontend developer, working with React and TypeScript. Built responsive web applications for various clients.',
      isEducation: false
    }
  ].sort((a, b) => b.endDate - a.endDate); // Sort by end date, most recent first

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          About Me
        </h2>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I'm a passionate developer with a strong foundation in web development
              and a keen eye for design. With experience in both frontend and
              backend technologies, I love creating seamless user experiences that
              solve real-world problems.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              My journey in tech started with [Your Background] and since then,
              I've worked on various projects that have helped me develop a
              well-rounded skill set. I'm particularly interested in [Your
              Interests/Specializations].
            </p>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              My Journey
            </h3>
            <div className="flex justify-center gap-12 text-sm text-gray-600 dark:text-gray-300">
              <span>← Education</span>
              <span>Experience →</span>
            </div>
          </div>

          {/* Timeline container */}
          <div className="relative">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 