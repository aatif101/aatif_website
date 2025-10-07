# Design Document

## Overview

The floating social buttons feature will add three elegant, animated buttons positioned strategically on the portfolio landing page. These buttons will provide quick access to GitHub, LinkedIn, and resume while maintaining the existing cosmic/matrix theme with smooth animations and accessibility features.

## Architecture

### Component Structure
```
FloatingSocialButtons/
├── FloatingSocialButtons.jsx (Main container component)
├── SocialButton.jsx (Individual button component)
└── socialButtonsData.js (Configuration data)
```

### Integration Points
- **Parent Component**: App.js - The floating buttons will be added as a direct child
- **Positioning**: Fixed positioning to float over all content
- **Z-index**: Positioned above content but below any modals (z-index: 40)

## Components and Interfaces

### FloatingSocialButtons Component
**Purpose**: Container component that manages the layout and positioning of all social buttons

**Props**: None (uses internal configuration)

**State**: 
- `isVisible` (boolean) - Controls entrance animation timing

**Positioning Strategy**:
- Fixed position on the right side of the screen
- Responsive positioning that adapts to mobile devices
- Desktop: `right-8 top-1/2 transform -translate-y-1/2`
- Mobile: `bottom-8 right-4` (horizontal layout)

### SocialButton Component
**Purpose**: Reusable button component for individual social links

**Props Interface**:
```javascript
{
  href: string,           // URL or file path
  icon: ReactComponent,   // Icon component (GitHub, LinkedIn, Document)
  label: string,          // "My Github", "My LinkedIn", "My Resume"
  delay: number,          // Animation delay in milliseconds
  isExternal: boolean,    // Whether to open in new tab
  ariaLabel: string       // Accessibility label
}
```

**States**:
- Default: Semi-transparent with subtle glow
- Hover: Increased opacity, scale, and glow effect
- Focus: Keyboard focus ring with cosmic colors
- Active: Brief scale-down effect

## Data Models

### Social Button Configuration
```javascript
const socialButtonsData = [
  {
    id: 'github',
    href: 'https://github.com/yourusername', // To be configured
    icon: GitHubIcon,
    label: 'My Github',
    delay: 0,
    isExternal: true,
    ariaLabel: 'Visit my GitHub profile'
  },
  {
    id: 'linkedin',
    href: 'https://linkedin.com/in/yourprofile', // To be configured
    icon: LinkedInIcon,
    label: 'My LinkedIn',
    delay: 100,
    isExternal: true,
    ariaLabel: 'Visit my LinkedIn profile'
  },
  {
    id: 'resume',
    href: '/resume.pdf', // To be placed in public folder
    icon: DocumentIcon,
    label: 'My Resume',
    delay: 200,
    isExternal: true,
    ariaLabel: 'Download my resume PDF'
  }
]
```

## Visual Design Specifications

### Button Styling
- **Base Style**: 
  - Background: `rgba(10, 10, 15, 0.9)` with backdrop blur
  - Border: `1px solid rgba(99, 102, 241, 0.3)`
  - Padding: `12px 16px`
  - Border radius: `12px`
  - Font: JetBrains Mono (consistent with site)

- **Layout**: 
  - Flexbox with icon, text, and arrow
  - Icon: 20px × 20px
  - Gap: 8px between elements
  - Min-width: 160px for consistency

- **Colors**:
  - Text: `#e5e7eb` (gray-200)
  - Icons: Cosmic gradient colors (purple → blue → green)
  - Hover: Increased opacity and cosmic glow

### Animation Specifications

**Entrance Animation** (Framer Motion):
```javascript
// Container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5
    }
  }
}

// Individual button animation
const buttonVariants = {
  hidden: { 
    opacity: 0, 
    x: 100, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}
```

**Hover Animation**:
- Scale: 1.05
- Glow: Enhanced box-shadow with cosmic colors
- Duration: 200ms ease-out

**Focus Animation**:
- Focus ring: 2px cosmic-purple with offset
- Maintains hover effects when focused

## Responsive Design

### Desktop (≥768px)
- **Position**: Fixed right side, vertically centered
- **Layout**: Vertical stack
- **Spacing**: 12px gap between buttons
- **Size**: Full button with icon, text, and arrow

### Mobile (<768px)
- **Position**: Fixed bottom-right corner
- **Layout**: Horizontal row or compact vertical
- **Spacing**: 8px gap between buttons
- **Size**: Slightly smaller padding, same functionality

### Accessibility Considerations
- **Keyboard Navigation**: Full tab order support
- **Screen Readers**: Proper ARIA labels and descriptions
- **Color Contrast**: Meets WCAG AA standards
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respects `prefers-reduced-motion`

## Icon Implementation

### Icon Sources
Using React Icons library (react-icons) for consistency:
- **GitHub**: `FaGithub` from react-icons/fa
- **LinkedIn**: `FaLinkedin` from react-icons/fa  
- **Resume**: `FaFileDownload` from react-icons/fa
- **Arrow**: `FaExternalLinkAlt` from react-icons/fa

### Icon Styling
- Size: 20px × 20px
- Color: Inherits from parent with cosmic gradient on hover
- Smooth transitions matching button animations

## Error Handling

### Link Validation
- Graceful handling of missing URLs (fallback to placeholder)
- Console warnings for development when URLs are not configured
- Proper error boundaries to prevent component crashes

### File Access
- Resume PDF: Proper handling if file doesn't exist
- Fallback behavior: Show button but log warning
- User feedback: Subtle indication if resource unavailable

## Testing Strategy

### Unit Tests (Optional)
- Component rendering with different props
- Animation trigger verification
- Accessibility attribute presence
- Click handler functionality

### Integration Tests (Optional)
- Proper positioning across screen sizes
- Animation sequence completion
- Keyboard navigation flow
- External link opening behavior

### Manual Testing Checklist
- Visual appearance matches design specifications
- Hover and focus states work correctly
- Links open in new tabs (external) or download (resume)
- Responsive behavior on different screen sizes
- Keyboard accessibility (tab navigation, enter activation)
- Screen reader compatibility