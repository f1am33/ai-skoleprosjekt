# AGENTS.md - Stone Howl Band Website

This file contains guidelines and commands for agentic coding agents working on the Stone Howl band website project.

## Project Overview

This is a static HTML/CSS/JavaScript website for a rock band with a dark, edgy design theme. The site features:
- Single-page application with smooth section transitions
- Responsive design for mobile/tablet/desktop
- Interactive navigation with keyboard and touch support
- Audio playlist functionality for MP3 files
- Modern CSS with Grid, Flexbox, and animations

## Build Commands

Since this is a static website with no build system:

```bash
# Serve locally (any static server)
python -m http.server 8000
# or
npx serve .
# or
live-server

# Open in browser
open http://localhost:8000
```

## Testing Commands

No automated testing framework is configured. Manual testing approach:

```bash
# Test responsive design
# - Chrome DevTools device emulation
# - Actual mobile devices
# - Tablet testing

# Test audio functionality
# - Verify MP3 files load in songs/ directory
# - Test play/pause controls
# - Check metadata loading

# Test navigation
# - Click all nav links
# - Test keyboard arrows (←→)
# - Test mobile hamburger menu
# - Test touch gestures (swipe)
```

## Code Style Guidelines

### HTML Structure
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Maintain proper heading hierarchy (`h1` → `h2` → `h3`)
- Include `lang="no"` for Norwegian content
- Use descriptive class names in English (BEM-style preferred)
- Keep HTML clean and readable with proper indentation

### CSS Architecture
- Use CSS custom properties (variables) for colors and spacing
- Follow mobile-first responsive design
- Use CSS Grid for layouts, Flexbox for components
- Organize styles logically: base → layout → components → responsive
- Maintain consistent naming conventions (kebab-case for classes)
- Use `:root` for global variables, component-specific for overrides

### JavaScript Patterns
- Use modern ES6+ features (arrow functions, const/let, template literals)
- Implement proper event delegation where appropriate
- Use semantic function names in English
- Handle errors gracefully with try-catch blocks
- Debounce scroll and resize events for performance
- Use `DOMContentLoaded` for DOM-ready operations

### File Organization
```
/
├── index.html          # Main landing page
├── styles.css          # All global styles
├── script.js           # Main interactivity
├── songs/              # Audio playlist pages
│   ├── heavy-rock.html
│   └── relax-rock.html
├── images/             # Band photos and assets
└── README.md           # Project documentation
```

### Naming Conventions
- **Files**: kebab-case (e.g., `stone-howl-band.jpg`)
- **CSS Classes**: kebab-case, BEM-style (e.g., `.nav-menu`, `.concert-card__title`)
- **JavaScript Functions**: camelCase (e.g., `handleNavigation`, `loadPlaylist`)
- **Variables**: camelCase for JS, kebab-case for CSS custom properties

### Color Scheme
The site supports both dark and light themes with CSS variables:

**Dark Theme (Default):**
- `--primary-black: #000000`
- `--dark-gray: #1a1a1a`
- `--medium-gray: #333333`
- `--light-gray: #666666`
- `--white: #ffffff`
- `--accent-red: #cc0000`
- `--accent-red-hover: #ff0000`
- `--gold: #ffd700`

**Light Theme:**
- `--primary-black: #ffffff`
- `--dark-gray: #f5f5f5`
- `--medium-gray: #e0e0e0`
- `--light-gray: #999999`
- `--white: #000000`
- `--accent-red: #cc0000`
- `--accent-red-hover: #ff0000`
- `--gold: #d4af37`

### Typography
- **Headings**: 'Bebas Neue' font family
- **Body**: 'Roboto' font family
- Maintain consistent font sizes and weights
- Use `text-transform: uppercase` for navigation and headings

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 480px (mobile)
- Test all interactive elements on touch devices
- Ensure readable font sizes on all screens

### Performance Guidelines
- Optimize images for web (WebP format preferred)
- Minimize external dependencies
- Use efficient CSS selectors
- Implement lazy loading for images when appropriate
- Debounce scroll/resize events

### Accessibility
- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Maintain proper color contrast ratios
- Use ARIA labels where needed

### Error Handling
- Implement graceful fallbacks for missing assets
- Show user-friendly error messages
- Log errors to console for debugging
- Handle audio loading failures appropriately

## Development Workflow

1. **Local Development**: Use static server to test changes
2. **Cross-browser Testing**: Test in Chrome, Firefox, Safari, Edge
3. **Mobile Testing**: Test on actual devices, not just emulation
4. **Audio Testing**: Verify MP3 files play correctly in all browsers
5. **Performance**: Check load times and optimize as needed

## Common Tasks

### Adding New Concerts
Update the concert cards in `index.html` following the existing pattern:
```html
<div class="concert-card">
    <div class="concert-date">
        <span class="day">DD</span>
        <span class="month">MON</span>
    </div>
    <div class="concert-info">
        <h3>Venue Name</h3>
        <p class="concert-location">City, Country</p>
        <p class="concert-time">HH:MM</p>
        <a href="#" class="concert-link" target="_blank">Kjøp billetter</a>
    </div>
</div>
```

### Adding New Songs
Place MP3 files in the `songs/` directory and update the hardcoded arrays in playlist HTML files.

### Updating Band Info
Edit member cards in the "about" section of `index.html` with new photos and information.

### Styling Changes
Modify CSS variables in `:root` for color changes, or add new utility classes following the existing patterns.

### Theme Toggle
The site includes a light/dark theme toggle:
- Toggle button is in the navigation bar (sun/moon icons)
- Theme preference is saved to localStorage
- CSS uses `[data-theme="light"]` selector for light theme overrides
- JavaScript handles theme switching and persistence

## Important Notes

- This is a Norwegian language website - maintain Norwegian text content
- All external links should have `target="_blank"`
- Audio files should be in MP3 format for maximum compatibility
- Images should be optimized for web and maintain the dark/edgy aesthetic
- Test thoroughly on mobile devices as much of the audience will be mobile users