import React from 'react';
import './index.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EducationExperienceSection from './components/EducationExperienceSection';
import ResumeSection from './components/ResumeSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import MatrixRain from './components/MatrixRain';


function App() {
  return (
    <div className="min-h-screen bg-cosmic-dark relative">
      <MatrixRain />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationExperienceSection />
        <ProjectsSection />
        <ResumeSection />
      </main>
      <Footer />
    </div>
  );
}

export default App; 