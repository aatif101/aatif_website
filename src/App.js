import React from 'react';
import './index.css';
import Header from './components/Header';
import SummarySection from './components/SummarySection';
import EducationExperienceSection from './components/EducationExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#fafaf8] text-[#111] font-sans antialiased min-h-screen">
      <Header />
      <SummarySection />
      <main id="main">
        {/* Placeholder sections — content built in Phase 2 */}
        <section id="experience" className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold text-[#111] mb-4">Experience</h2>
          {/* EducationExperienceSection renders here in Phase 2 */}
          <EducationExperienceSection />
        </section>
        <section id="projects" className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold text-[#111] mb-4">Projects</h2>
          <ProjectsSection />
        </section>
        <section id="education" className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold text-[#111] mb-4">Education</h2>
          {/* Content added in Phase 2 */}
        </section>
        <section id="skills" className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold text-[#111] mb-4">Skills</h2>
          {/* Content added in Phase 2 */}
        </section>
        <section id="leadership" className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold text-[#111] mb-4">Leadership</h2>
          {/* Content added in Phase 2 */}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;