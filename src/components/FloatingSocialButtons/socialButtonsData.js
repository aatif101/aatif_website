import { FaGithub, FaLinkedin, FaFileDownload, FaExternalLinkAlt } from 'react-icons/fa';

/**
 * Configuration data for floating social buttons
 * Contains button properties including URLs, icons, labels, and accessibility attributes
 */
const socialButtonsData = [
  {
    id: 'github',
    href: 'https://github.com/aatif101',
    icon: FaGithub,
    label: 'My Github',
    arrowIcon: FaExternalLinkAlt,
    delay: 0,
    isExternal: true,
    ariaLabel: 'Visit my GitHub profile (opens in new tab)',
    description: 'View my code repositories and contributions on GitHub'
  },
  {
    id: 'linkedin',
    href: 'https://linkedin.com/in/shaikhaatif', // Replace with your actual LinkedIn profile
    icon: FaLinkedin,
    label: 'My LinkedIn',
    arrowIcon: FaExternalLinkAlt,
    delay: 100,
    isExternal: true,
    ariaLabel: 'Visit my LinkedIn profile (opens in new tab)',
    description: 'Connect with me and view my professional background on LinkedIn'
  },
  {
    id: 'resume',
    href: '/resume.pdf',
    icon: FaFileDownload,
    label: 'My Resume',
    arrowIcon: FaExternalLinkAlt,
    delay: 200,
    isExternal: false, // Changed to false for download behavior
    ariaLabel: 'Download my resume PDF',
    description: 'Download my resume to review my qualifications and experience'
  }
];

/**
 * Validates if a URL is accessible and handles errors gracefully
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid and accessible
 */
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.warn(`Invalid URL detected: ${url}`, error);
    return false;
  }
};

/**
 * Handles link clicks with proper error handling and link behavior
 * @param {string} href - The URL or file path
 * @param {boolean} isExternal - Whether to open in new tab
 * @param {string} label - Button label for error messages
 */
export const handleLinkClick = (href, isExternal, label) => {
  // Validate URL for external links
  if (isExternal && !validateUrl(href)) {
    console.error(`Failed to open ${label}: Invalid URL`);
    return;
  }

  // Handle resume download
  if (!isExternal && href === '/resume.pdf') {
    // Check if resume file exists by attempting to fetch it
    fetch(href, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Resume file not found: ${response.status}`);
        }
        // File exists, proceed with download/open
        window.open(href, '_blank');
      })
      .catch(error => {
        console.error(`Failed to access resume file:`, error);
        alert('Resume file is currently unavailable. Please try again later.');
      });
    return;
  }

  // Handle external links
  if (isExternal) {
    try {
      window.open(href, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error(`Failed to open ${label}:`, error);
    }
  }
};

export default socialButtonsData;