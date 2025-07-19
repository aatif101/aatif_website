# aatif's Cosmic Portfolio

A dark, cosmic terminal-themed personal portfolio website built with React and Tailwind CSS.

## Features

- 🌌 Dark cosmic theme with terminal aesthetics
- 🪐 Animated orbiting tech logos around central name
- 📱 Fully responsive design
- ⚡ Smooth animations and transitions
- 🎨 Mathematical symbols matrix rain background
- 🚀 Modern tech stack

## Tech Stack

- **React** - Frontend framework
- **Tailwind CSS** - Styling and animations
- **Framer Motion** - Enhanced animations (included but not yet implemented)
- **Canvas API** - Matrix rain background effect

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   ├── HeroSection.js     # Landing section with name and orbiting logos
│   ├── OrbitingLogos.js   # Animated tech logos component
│   ├── AboutSection.js    # About me section
│   ├── ResumeSection.js   # Resume download section
│   ├── ProjectsSection.js # Featured projects showcase
│   ├── Footer.js          # Footer with social links
│   └── MatrixRain.js      # Background matrix effect
├── App.js                 # Main app component
├── index.css             # Global styles and Tailwind imports
└── index.js              # App entry point
```

## Customization

### Colors
The cosmic color palette is defined in `tailwind.config.js`:
- `cosmic.dark` - Primary dark background
- `cosmic.purple` - Purple accent
- `cosmic.blue` - Blue accent
- `terminal.green` - Matrix green

### Animations
- Orbiting logos: Configurable in `OrbitingLogos.js`
- Glow effects: Defined in Tailwind config
- Matrix rain: Customizable in `MatrixRain.js`

### Content
Replace placeholder content in:
- `AboutSection.js` - Personal information
- `ProjectsSection.js` - Project details
- `ResumeSection.js` - Resume link
- `Footer.js` - Social media links

## Design Philosophy

This portfolio embodies a "mathy personality" through:
- Mathematical symbols in matrix rain
- Geometric orbital animations
- Terminal-inspired command line aesthetics
- Precise typography and spacing
- Cosmic theme representing infinite possibilities

## Next Steps

1. Add real content to replace placeholders
2. Implement actual resume download functionality
3. Add project links and descriptions
4. Include social media links
5. Add more interactive animations
6. Implement contact form
7. Add blog section (optional)

## License

MIT License - feel free to use this as a template for your own portfolio! 