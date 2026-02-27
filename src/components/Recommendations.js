import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaQuoteLeft } from 'react-icons/fa';

const RecommendationCard = ({ recommendation, onClick }) => (
  <motion.div
    className="min-w-[280px] md:min-w-[500px] mx-2 md:mx-4 cursor-pointer"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ scale: 1.03, y: -8 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    onClick={onClick}
  >
    <div className="glass-strong rounded-2xl md:rounded-3xl p-5 md:p-8 h-full relative overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* Gradient accent border */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-sky-400/20 via-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Inner content container */}
      <div className="relative z-10">
        {/* LinkedIn icon badge */}
        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-blue-500 rounded-full p-2 md:p-3 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
          <FaLinkedin size={16} className="text-white md:w-5 md:h-5" />
        </div>

        {/* Quote icon with gradient */}
        <div className="mb-3 md:mb-6 inline-block">
          <div className="text-sky-500/40 dark:text-sky-400/40 group-hover:text-sky-500/60 dark:group-hover:text-sky-400/60 transition-colors duration-300">
            <FaQuoteLeft size={24} className="md:w-9 md:h-9" />
          </div>
        </div>

        {/* Recommendation text */}
        <p className="text-on-glass text-xs md:text-base mb-5 md:mb-8 leading-relaxed font-normal italic">
          "{recommendation.text}"
        </p>

        {/* Author info with enhanced styling */}
        <div className="flex items-start pt-4 md:pt-6 border-t-2 border-sky-400/30 dark:border-sky-500/30">
          <div className="flex-1">
            <h4 className="font-bold text-sm md:text-lg text-on-glass group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300 mb-0.5 md:mb-1">
              {recommendation.author}
            </h4>
            <p className="text-xs md:text-sm text-on-glass/80 font-medium mb-1 md:mb-2 leading-snug">
              {recommendation.position}
            </p>
            {recommendation.relationship && (
              <div className="flex items-center gap-2 mt-1 md:mt-2">
                <div className="h-1 w-1 rounded-full bg-sky-500/50"></div>
                <p className="text-[10px] md:text-xs text-on-glass/60 italic">
                  {recommendation.relationship}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400/0 via-blue-500/0 to-indigo-500/0 group-hover:from-sky-400/10 group-hover:via-blue-500/5 group-hover:to-indigo-500/10 transition-all duration-500 rounded-2xl md:rounded-3xl pointer-events-none"></div>

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
      </div>
    </div>
  </motion.div>
);

const Recommendations = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // LinkedIn recommendations URL
  const linkedInRecommendationsUrl =
    'https://www.linkedin.com/in/loukiknaik/details/recommendations/?detailScreenTabIndex=0';

  // Your LinkedIn recommendations (reordered with Andrew and Kit first)
  const recommendations = [
    {
      id: 1,
      text: 'Loukik is an outstanding Machine Learning Engineer with a rare talent for thinking big while staying grounded in practical solutions. In the fast-moving world of AI, he has a keen ability to evaluate emerging technologies and match them to the problem at hand — ensuring we use the right tools, not just the newest ones. His strategic perspective and technical insight consistently helped our team stay ahead of the curve.',
      author: 'Andrew Smith',
      position: 'Reliable, scalable, and efficient data and learning systems',
      relationship: 'Andrew managed Loukik directly',
      authorImage: null,
    },
    {
      id: 2,
      text: 'Loukik is a super sharp machine learning engineer who brings a lot of technical skill and teamwork to the table. He quickly ramped up and helped us build impressive technology and features for our product. He has a great attitude, works hard, and is always willing to pitch in when colleagues need help. His focus and dedication are exemplary.',
      author: 'Kit Merker',
      position: 'Software Executive and Investor',
      relationship: 'Kit managed Loukik directly',
      authorImage: null,
    },
    {
      id: 3,
      text: 'I worked with Loukik at Plainsight, and I would describe him as a key pillar of the company. He is an extremely valuable presence, not only for his deep expertise in his primary domain of machine learning, but also for his strong knowledge in development, cloud, and deployment topics. He consistently contributed to debugging sessions, often solving issues outside his immediate area of expertise. Loukik is sharp, quick to understand complex problems, and always brings innovative ideas that add significant value to the organization.',
      author: 'Eashan Roy',
      position: 'Backend & AI Platform Engineer at Plainsight | MS CSE at Northeastern University',
      relationship: 'Worked together on the same team',
      authorImage: null,
    },
    {
      id: 4,
      text: "I'd strongly recommend Loukik. He brings a rare mix of ownership, sound judgment, and calm execution. He's dependable under pressure, communicates clearly, and consistently follows through on what he commits to. He's someone you can trust with ambiguous problems and expect strong outcomes without needing close oversight.",
      author: 'Ruth Peter',
      position: 'Founding Software Engineer @Eudia | Carnegie Mellon University',
      relationship: 'Worked together on the same team',
      authorImage: null,
    },
    {
      id: 5,
      text: "I had the pleasure of working with Loukik during our B.Tech, especially as part of the DSA coding committee. He is an excellent problem solver with strong technical skills and a natural ability to work well in a team. His dedication and positive attitude made every project and event we collaborated on a great experience. I'm confident he will excel in any challenge he takes on.",
      author: 'Abhinav Rajhans',
      position: 'SDE at Qode | Ex-Media.net',
      relationship: 'Studied together',
      authorImage: null,
    },
  ];

  // Triple recommendations for smoother infinite scroll
  const duplicatedRecommendations = [...recommendations, ...recommendations, ...recommendations];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.8; // Pixels per frame

    const animate = () => {
      if (!scrollContainer) return;

      // Increment scroll position
      scrollPositionRef.current += scrollSpeed;

      // Calculate the width of one set of recommendations
      const oneSetWidth = scrollContainer.scrollWidth / 3;

      // Reset scroll position when we've scrolled through one set
      // This creates a seamless infinite loop
      if (scrollPositionRef.current >= oneSetWidth) {
        scrollPositionRef.current = 0;
        scrollContainer.scrollLeft = 0;
      }

      // Apply smooth scroll
      scrollContainer.scrollLeft = scrollPositionRef.current;

      animationRef.current = requestAnimationFrame(animate);
    };

    // Wait for DOM to be ready
    const timeoutId = setTimeout(() => {
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        // Start from beginning
        scrollContainer.scrollLeft = 0;
        scrollPositionRef.current = 0;
        animationRef.current = requestAnimationFrame(animate);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleCardClick = () => {
    window.open(linkedInRecommendationsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-10 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block mb-3 md:mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 glass rounded-full">
              <FaLinkedin className="text-blue-500" size={20} />
              <span className="text-xs md:text-sm font-semibold text-on-glass/70">
                LinkedIn Testimonials
              </span>
            </div>
          </motion.div>
          <p className="text-on-glass/70 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed mt-4 md:mt-6 px-4">
            Trusted feedback from colleagues and leaders I've worked with
          </p>
        </motion.div>

        {/* Auto-scrolling carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'auto',
            }}
          >
            {duplicatedRecommendations.map((rec, index) => (
              <RecommendationCard
                key={`${rec.id}-${index}`}
                recommendation={rec}
                onClick={handleCardClick}
              />
            ))}
          </div>

          {/* Enhanced gradient overlays for smooth fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-40 bg-gradient-to-r from-slate-50 via-slate-50/80 dark:from-slate-900 dark:via-slate-900/80 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-40 bg-gradient-to-l from-slate-50 via-slate-50/80 dark:from-slate-900 dark:via-slate-900/80 to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Click hint */}
        <motion.div
          className="text-center mt-8 md:mt-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 glass-strong rounded-full">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <p className="text-on-glass/70 text-xs md:text-sm font-medium">
              Click any card to view on LinkedIn
            </p>
          </div>
        </motion.div>
      </div>

      {/* Enhanced floating decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-sky-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-1/2 right-10 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute bottom-10 left-1/4 w-28 h-28 bg-gradient-to-br from-sky-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>
    </section>
  );
};

export default Recommendations;
