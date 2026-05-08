import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { trackPageView } from './utils/analytics';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Recommendations from './components/Recommendations';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Resume from './components/Resume';
import Analytics from './components/Analytics';
import { ThemeProvider } from './context/ThemeContext';

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
}

function MainContent() {
  return (
    <>
      <Hero />
      <About />
      <Recommendations />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen relative">
          {/* Animated background particles */}
          <div className="bg-particles"></div>

          <Header />
          <RouteTracker />
          <main>
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
