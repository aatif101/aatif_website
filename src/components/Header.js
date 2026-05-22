import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-[#fafaf8]">
      {/* Skip link — must be first focusable element */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-[#fafaf8] focus:text-[#111] focus:px-3 focus:py-1 focus:rounded focus:outline-none focus:ring-2 focus:ring-[#111] focus:z-50"
      >
        Skip to content
      </a>

      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-8">
        {/* Name — dominant element */}
        <h1 className="text-4xl sm:text-3xl font-semibold leading-tight text-[#111] tracking-normal">
          Mohammad Aatif Shaikh
        </h1>

        {/* Tagline — verbatim from cv.md summary first sentence */}
        <p className="mt-2 text-base font-normal leading-relaxed text-[#111]">
          AI-native builder with security instincts.
        </p>

        {/* Contact row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
          <a
            href="mailto:mohammadaatif@usf.edu"
            className="text-base text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded"
          >
            mohammadaatif@usf.edu
          </a>
          <span className="text-[#555]" aria-hidden="true">·</span>
          <a
            href="https://www.linkedin.com/in/shaikhaatif/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in new tab)"
            className="text-base text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded"
          >
            LinkedIn
          </a>
          <span className="text-[#555]" aria-hidden="true">·</span>
          <a
            href="https://github.com/aatif101"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in new tab)"
            className="text-base text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded"
          >
            GitHub
          </a>
          <span className="text-[#555]" aria-hidden="true">·</span>
          <span className="text-sm text-[#555]">Tampa, FL</span>
          <span className="text-[#555]" aria-hidden="true">·</span>
          <span className="text-sm text-[#555]">US (F1 OPT, May 2026) · UAE · India</span>
        </div>

        {/* Nav — hidden on mobile, visible md+ */}
        <nav
          aria-label="Page sections"
          className="hidden md:flex items-center gap-4 mt-4 pt-4 border-t border-[#111]/10"
        >
          <a href="#experience" className="text-sm font-normal text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded">Experience</a>
          <a href="#projects" className="text-sm font-normal text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded">Projects</a>
          <a href="#education" className="text-sm font-normal text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded">Education</a>
          <a href="#skills" className="text-sm font-normal text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded">Skills</a>
          <a href="#leadership" className="text-sm font-normal text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded">Leadership</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;