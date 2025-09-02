/**
 * Component Registry Configuration
 * Centralized component registration using Factory pattern
 * Implements lazy loading for better performance
 */

import { 
  registerComponent, 
  registerLazyComponent,
  getAllComponents,
  getCategories,
  getComponentsByCategory
} from '../factories/ComponentFactory';

// Import eager-loaded components (critical components)
import AboutMe from '../LeftBrain/AboutMe/AboutMe';

/**
 * Register all components with the factory
 * Components are organized by category and loading strategy
 */
export const initializeComponentRegistry = () => {
  
  // LeftBrain Components - Technical Content
  registerComponent('about-me', AboutMe, {
    label: 'About Me',
    icon: '👤',
    category: 'leftbrain',
    description: 'Personal information and skills overview'
  });

  registerLazyComponent('dsa', 
    () => import('../LeftBrain/DSA/DSA'), {
    label: 'DSA',
    icon: '🧮',
    category: 'leftbrain',
    description: 'Data Structures and Algorithms'
  });

  registerLazyComponent('xcode-shortcuts', 
    () => import('../LeftBrain/XcodeShortcuts/XcodeShortcuts'), {
    label: 'Xcode Shortcuts',
    icon: '⌨️',
    category: 'leftbrain',
    description: 'Useful Xcode keyboard shortcuts'
  });

  registerLazyComponent('apple-dev-youtube', 
    () => import('../LeftBrain/AppleDevYouTubeChannels/AppleDevYouTubeChannels'), {
    label: 'Apple Dev YouTube',
    icon: '📺',
    category: 'leftbrain',
    description: 'Apple Development YouTube channels'
  });

  registerLazyComponent('apple-development', 
    () => import('../LeftBrain/AppleDevelopment/AppleDevelopment'), {
    label: 'Apple Development',
    icon: '🍎',
    category: 'leftbrain',
    description: 'Apple platform development resources'
  });

  registerLazyComponent('apple-languages', 
    () => import('../LeftBrain/AppleLanguages/AppleLanguages'), {
    label: 'Apple Languages',
    icon: '🍎',
    category: 'leftbrain',
    description: 'Programming languages for Apple platforms'
  });

  registerLazyComponent('swift-gui', 
    () => import('../LeftBrain/SwiftGUI/SwiftGUI'), {
    label: 'Swift GUI',
    icon: '🖥️',
    category: 'leftbrain',
    description: 'SwiftUI and UIKit development'
  });

  registerLazyComponent('swift-storage', 
    () => import('../LeftBrain/SwiftStorage/SwiftStorage'), {
    label: 'Swift Storage',
    icon: '💾',
    category: 'leftbrain',
    description: 'Data persistence in Swift'
  });

  registerLazyComponent('swift-networking', 
    () => import('../LeftBrain/SwiftNetworking/SwiftNetworking'), {
    label: 'Swift Networking',
    icon: '🌐',
    category: 'leftbrain',
    description: 'Network programming in Swift'
  });

  registerLazyComponent('debugging', 
    () => import('../LeftBrain/Debugging/Debugging'), {
    label: 'Swift Debugging',
    icon: '🐛',
    category: 'leftbrain',
    description: 'Debugging techniques and tools'
  });

  registerLazyComponent('swift-testing', 
    () => import('../LeftBrain/SwiftTesting/SwiftTesting'), {
    label: 'Swift Testing',
    icon: '🧪',
    category: 'leftbrain',
    description: 'Testing frameworks and practices'
  });

  registerLazyComponent('package-deployment', 
    () => import('../LeftBrain/PackageDeployment/PackageDeployment'), {
    label: 'Package & Deployment',
    icon: '📦',
    category: 'leftbrain',
    description: 'Package management and deployment'
  });

  registerLazyComponent('mac-terminal-scripts', 
    () => import('../LeftBrain/MacTerminalScripts/MacTerminalScripts'), {
    label: 'Mac Terminal Scripts',
    icon: '💻',
    category: 'leftbrain',
    description: 'Useful terminal scripts for Mac'
  });

  registerLazyComponent('ai-and-tools', 
    () => import('../LeftBrain/AIAndTools/AIAndTools'), {
    label: 'AI and Tools',
    icon: '🤖',
    category: 'leftbrain',
    description: 'AI tools and resources'
  });

  registerLazyComponent('design-patterns', 
    () => import('../LeftBrain/DesignPatterns/DesignPatterns'), {
    label: 'Design Patterns',
    icon: '🏗️',
    category: 'leftbrain',
    description: 'Software design patterns'
  });

  registerLazyComponent('software-architecture', 
    () => import('../LeftBrain/SoftwareArchitecture/SoftwareArchitecture'), {
    label: 'Software Architecture',
    icon: '🏛️',
    category: 'leftbrain',
    description: 'Software architecture principles'
  });

  registerLazyComponent('system-design', 
    () => import('../LeftBrain/SystemDesign/SystemDesign'), {
    label: 'System Design',
    icon: '🏢',
    category: 'leftbrain',
    description: 'System design concepts'
  });

  registerLazyComponent('nodejs', 
    () => import('../LeftBrain/NodeJS/NodeJS'), {
    label: 'NodeJS',
    icon: '🌐',
    category: 'leftbrain',
    description: 'Node.js development'
  });

  registerLazyComponent('reactjs', 
    () => import('../LeftBrain/ReactJS/ReactJS'), {
    label: 'ReactJS',
    icon: '⚛️',
    category: 'leftbrain',
    description: 'React.js development'
  });

  registerLazyComponent('chrome-extensions', 
    () => import('../LeftBrain/ChromeExtensions/ChromeExtensions'), {
    label: 'Chrome Extensions',
    icon: '🧩',
    category: 'leftbrain',
    description: 'Chrome extension development'
  });

  registerLazyComponent('blogs', 
    () => import('../LeftBrain/Blogs/Blog'), {
    label: 'Blogs',
    icon: '📝',
    category: 'leftbrain',
    description: 'Technical blog posts'
  });

  // RightBrain Components - Creative Content
  registerLazyComponent('drawing', 
    () => import('../RightBrain/Drawing/Drawing'), {
    label: 'Drawing',
    icon: '✏️',
    category: 'rightbrain',
    description: 'Digital and traditional artwork'
  });

  registerLazyComponent('literature', 
    () => import('../RightBrain/Litlerature/Literature'), {
    label: 'Literature',
    icon: '📖',
    category: 'rightbrain',
    description: 'Books and literary works'
  });

  registerLazyComponent('philosophy', 
    () => import('../RightBrain/Philosophy/Philosophy'), {
    label: 'Philosophy',
    icon: '🤔',
    category: 'rightbrain',
    description: 'Philosophical thoughts and concepts'
  });

  registerLazyComponent('psychology', 
    () => import('../RightBrain/Psychology/Psychology'), {
    label: 'Psychology',
    icon: '🧠',
    category: 'rightbrain',
    description: 'Psychology concepts and studies'
  });

  registerLazyComponent('music', 
    () => import('../RightBrain/Music/Music'), {
    label: 'Music',
    icon: '🎵',
    category: 'rightbrain',
    description: 'Music and audio content'
  });

  // Developer Tools
  registerLazyComponent('ai-tools-channels', 
    () => import('../Tools/AIToolsChannels/AIToolsChannels'), {
    label: 'AI Tools Channels',
    icon: '🤖',
    category: 'developer-tools',
    description: 'AI development tools and channels'
  });

  registerLazyComponent('api-tool', 
    () => import('../Tools/APITool/APITool'), {
    label: 'API Tool',
    icon: '🌐',
    category: 'developer-tools',
    description: 'API testing and development'
  });

  registerLazyComponent('storage-tool', 
    () => import('../Tools/StorageTool/StorageTool'), {
    label: 'Storage Tool',
    icon: '💾',
    category: 'developer-tools',
    description: 'Browser storage management'
  });

  registerLazyComponent('qr-code-tool', 
    () => import('../Tools/QRCodeTool/QRCodeTool'), {
    label: 'QR Code Tool',
    icon: '🔲',
    category: 'developer-tools',
    description: 'QR code generation and scanning'
  });

  registerLazyComponent('pdf-tool', 
    () => import('../Tools/PDFTool/PDFTool'), {
    label: 'PDF Tool',
    icon: '📄',
    category: 'developer-tools',
    description: 'PDF manipulation tools'
  });

  registerLazyComponent('JSON-Tool', 
    () => import('../Tools/JSONTool/JsonTool'), {
    label: 'JSON Tool',
    icon: '📝',
    category: 'developer-tools',
    description: 'JSON formatting and validation'
  });

  registerLazyComponent('XML-Tool', 
    () => import('../Tools/XMLTool/XmlTool'), {
    label: 'XML Tool',
    icon: '🔧',
    category: 'developer-tools',
    description: 'XML formatting and validation'
  });

  registerLazyComponent('yaml-tool', 
    () => import('../Tools/YAMLTool/YAMLTool'), {
    label: 'YAML Tool',
    icon: '📄',
    category: 'developer-tools',
    description: 'YAML formatting and validation'
  });

  registerLazyComponent('csv-tool', 
    () => import('../Tools/CSVTool/CSVTool'), {
    label: 'CSV Tool',
    icon: '📊',
    category: 'developer-tools',
    description: 'CSV data processing'
  });

  registerLazyComponent('Encryption-Decryption-Tool', 
    () => import('../Tools/CryptoTool/CryptoTool'), {
    label: 'Crypto Tool',
    icon: '🔒',
    category: 'developer-tools',
    description: 'Encryption and decryption utilities'
  });

  registerLazyComponent('hash-tool', 
    () => import('../Tools/HashTool/HashTool'), {
    label: 'Hash Tool',
    icon: '🔑',
    category: 'developer-tools',
    description: 'Hash generation and verification'
  });

  registerLazyComponent('encoder-tool', 
    () => import('../Tools/EncoderTool/EncoderTool'), {
    label: 'Encoder Tool',
    icon: '🔤',
    category: 'developer-tools',
    description: 'Text encoding and decoding'
  });

  // QA Tools
  registerLazyComponent('qa-testing-apps', 
    () => import('../Tools/QATools/QATools'), {
    label: 'QA Testing Apps',
    icon: '🧪',
    category: 'qa-tools',
    description: 'Quality assurance testing tools'
  });

  registerLazyComponent('macos-app-catalog', 
    () => import('../Tools/MacOSAppCatalog/MacOSAppCatalog'), {
    label: 'macOS App Catalog',
    icon: '📱',
    category: 'qa-tools',
    description: 'macOS application catalog'
  });

  registerLazyComponent('regex-tool', 
    () => import('../Tools/RegexTool/RegexTool'), {
    label: 'Regex Tool',
    icon: '🔍',
    category: 'qa-tools',
    description: 'Regular expression testing'
  });

  registerLazyComponent('diff-checker', 
    () => import('../Tools/DiffChecker/DiffChecker'), {
    label: 'Diff Checker',
    icon: '🔄',
    category: 'qa-tools',
    description: 'Text and file difference checker'
  });

  registerLazyComponent('password-tool', 
    () => import('../Tools/PasswordTool/PasswordTool'), {
    label: 'Password Tool',
    icon: '🛡️',
    category: 'qa-tools',
    description: 'Password generation and testing'
  });

  registerLazyComponent('uuid-tool', 
    () => import('../Tools/UUIDTool/UUIDTool'), {
    label: 'UUID Tool',
    icon: '🆔',
    category: 'qa-tools',
    description: 'UUID generation and validation'
  });

  registerLazyComponent('markdown-renderer', 
    () => import('../Tools/MarkdownRenderer/MarkdownRenderer'), {
    label: 'Markdown Renderer',
    icon: '📄',
    category: 'qa-tools',
    description: 'Markdown preview and conversion'
  });

  registerLazyComponent('latex-renderer', 
    () => import('../Tools/LaTeXRenderer/LaTeXRenderer'), {
    label: 'LaTeX Renderer',
    icon: '📝',
    category: 'qa-tools',
    description: 'LaTeX formula rendering'
  });

  registerLazyComponent('writing-board', 
    () => import('../Tools/WritingBoard/WritingBoardTool'), {
    label: 'Writing Board',
    icon: '✏️',
    category: 'qa-tools',
    description: 'Digital writing and note-taking'
  });

  registerLazyComponent('text-generator', 
    () => import('../Tools/TextUtilities/TextGenerator'), {
    label: 'Text Util',
    icon: '🎲',
    category: 'qa-tools',
    description: 'Text generation and utilities'
  });

  // General Tools
  registerLazyComponent('info-tool', 
    () => import('../Tools/InfoTool/InfoTool'), {
    label: 'Info Tool',
    icon: '📊',
    category: 'general-tools',
    description: 'System and browser information'
  });

  registerLazyComponent('passport-photo-maker', 
    () => import('../Tools/PassportPhotoMaker/PassportPhotoMaker'), {
    label: 'Passport Photo Maker',
    icon: '📷',
    category: 'general-tools',
    description: 'Passport photo creation tool'
  });

  registerLazyComponent('color-picker', 
    () => import('../Tools/ColorPicker/ColorPickerTool'), {
    label: 'Color Picker',
    icon: '🎨',
    category: 'general-tools',
    description: 'Color selection and conversion'
  });

  registerLazyComponent('screen-recorder', 
    () => import('../Tools/ScreenRecorder/ScreenRecorderTool'), {
    label: 'Screen Recorder',
    icon: '🎥',
    category: 'general-tools',
    description: 'Screen recording functionality'
  });

  registerLazyComponent('important-websites', 
    () => import('../Tools/ImportantWebsites/ImportantWebsites'), {
    label: 'Important Websites',
    icon: '🌐',
    category: 'general-tools',
    description: 'Curated list of useful websites'
  });

  registerLazyComponent('emoji-picker', 
    () => import('../Tools/EmojiPicker/EmojiPicker'), {
    label: 'Emoji Picker',
    icon: '😀',
    category: 'general-tools',
    description: 'Emoji selection and copying'
  });

  registerLazyComponent('number-to-unicode', 
    () => import('../Tools/NumberToUnicode/NumberToUnicode'), {
    label: 'Number Base Converter',
    icon: '🔢',
    category: 'general-tools',
    description: 'Number base conversion utility'
  });

  registerLazyComponent('app-icon-generator', 
    () => import('../Tools/AppIconGenerator/AppIconGenerator'), {
    label: 'App Icon Generator',
    icon: '🍎',
    category: 'general-tools',
    description: 'Generate app icons for iOS, Android, and macOS'
  });

  registerLazyComponent('video-trimmer', 
    () => import('../Tools/VideoTrimmer/VideoTrimmer'), {
    label: 'Video Trimmer',
    icon: '✂️',
    category: 'general-tools',
    description: 'Trim video files by selecting start and end times'
  });

  console.log('Component registry initialized with lazy loading');
  
  // Development auto-reload enhancement
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Development mode: Component registry auto-reload enabled');
    
    // Add registry info to window for debugging
    window.componentRegistry = {
      getAllComponents: getAllComponents,
      getCategories: getCategories,
      getComponentsByCategory: getComponentsByCategory,
      refreshRegistry: () => {
        console.log('🔄 Refreshing component registry...');
        window.location.reload();
      }
    };
    
    console.log('💡 Available debug commands:');
    console.log('  - window.componentRegistry.getAllComponents()');
    console.log('  - window.componentRegistry.getCategories()');
    console.log('  - window.componentRegistry.refreshRegistry()');
  }
};

/**
 * Navigation configuration based on registered components
 * This replaces the hardcoded navigation items in TabSystem
 */
export const createNavigationConfig = () => {
  const { getComponentsByCategory, getComponentMetadata } = require('../factories/ComponentFactory');
  
  const createNavItems = (category) => {
    const components = getComponentsByCategory(category);
    return components.map(({ metadata }) => ({
      id: metadata.id,
      label: metadata.label,
      icon: metadata.icon,
      description: metadata.description || `${metadata.label} component`
    }));
  };

  return {
    leftbrain: createNavItems('leftbrain'),
    rightbrain: createNavItems('rightbrain'),
    'developer-tools': createNavItems('developer-tools'),
    'qa-tools': createNavItems('qa-tools'),
    'general-tools': createNavItems('general-tools')
  };
};
