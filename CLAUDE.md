# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based personal portfolio website called "sachinserver.in" showcasing technical skills, creative work, and developer tools. The application features a three-tab system representing different aspects of skills and interests:

- **LeftBrain**: Technical/logical content (DSA, Apple Development, Swift, Objective-C, Swift GUI, Swift Storage, Swift Networking, Swift Debugging, Mac Terminal Scripts, AI and Tools, Design Patterns, Software Architecture, System Design, NodeJS, ReactJS, About Me)
- **RightBrain**: Creative content (Drawing, Literature, Philosophy, Psychology, Music)  
- **Tools**: Utility applications organized by category (Data Processing, Security & Crypto, Text Utilities, Media & Design, Development)

## Architecture

The application uses a component-based architecture with the following key components:

- `TabSystem.js`: Main orchestrator component managing state, navigation, and layout
- `MainContent.js`: Displays content based on current selections and handles breadcrumb navigation
- `LeftNavigation.js`: Handles sidebar navigation for each tab section
- Component directories organized by brain hemisphere (`LeftBrain/`, `RightBrain/`) and `Tools/`
- Shared styling conventions across components with CSS modules

Key architectural patterns:
- State persistence using localStorage for user preferences (theme, navigation state, selected items)
- Dynamic component rendering based on navigation selections
- Responsive design with collapsible navigation
- Theme switching (light/dark mode) with system preference detection

## Development Commands

```bash
# Start development server
npm start

# Build for production  
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
```

The development server runs on http://localhost:3000 with hot reloading enabled.

## Component Structure

Tools are organized into categories with sub-navigation:
- Each tool category contains multiple tool components
- Tools use a consistent interface pattern with shared styling
- Tool selection managed through `selectedTool` state in TabSystem

Navigation items follow this structure:
```javascript
{ id: "unique-id", label: "Display Name", icon: "emoji", description: <Component /> }
```

## State Management

The application uses React hooks for state management with localStorage persistence:
- `activeTab`: Current main tab (leftbrain/rightbrain/tools)
- `selectedNavItem`: Selected item within current tab
- `selectedTool`: Selected tool within tools categories  
- `isDarkMode`: Theme preference
- `isLeftNavVisible`: Navigation panel visibility

## Styling Approach

- CSS modules for component-specific styles
- Shared styles in `shared-styles.css` files
- Responsive design with mobile-first approach
- Dark/light theme support with CSS custom properties
- Consistent icon usage with emoji and SVG assets