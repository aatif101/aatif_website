// Simple test to verify link handling functionality
const { validateUrl, handleLinkClick } = require('./src/components/FloatingSocialButtons/socialButtonsData.js');

// Test URL validation
console.log('Testing URL validation:');
console.log('Valid GitHub URL:', validateUrl('https://github.com/your-github-username'));
console.log('Valid LinkedIn URL:', validateUrl('https://linkedin.com/in/your-linkedin-profile'));
console.log('Invalid URL:', validateUrl('not-a-url'));

// Test configuration
console.log('\nTesting configuration:');
const socialButtonsData = require('./src/components/FloatingSocialButtons/socialButtonsData.js').default;
console.log('Number of buttons configured:', socialButtonsData.length);
console.log('Button configurations:');
socialButtonsData.forEach(button => {
  console.log(`- ${button.label}: ${button.href} (external: ${button.isExternal})`);
});

console.log('\nLink handling test completed successfully!');