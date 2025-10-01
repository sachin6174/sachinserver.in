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
import ComponentFactory from '../factories/ComponentFactory';
import { makeAlertFallback } from '../ui/fallbacks';

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
    description: 'Personal information and skills overview',
    errorFallback: makeAlertFallback({ title: 'Failed to render About Me' })
  });

  registerLazyComponent('dsa', 
    () => import('../LeftBrain/DSA/DSA'), {
    label: 'DSA',
    icon: '🧮',
    category: 'leftbrain',
    description: 'Data Structures and Algorithms',
    loadingSkeleton: 'dsa',
    errorFallback: makeAlertFallback({ title: 'Failed to load DSA' })
  });

  registerLazyComponent('apple-development-podcasts', 
    () => import('../LeftBrain/AppleDevelopmentPodcasts/AppleDevelopmentPodcasts'), {
    label: 'Apple Dev Podcasts',
    icon: '🎧',
    category: 'leftbrain',
    description: 'Curated podcasts for Apple developers',
    errorFallback: makeAlertFallback({ title: 'Failed to load Apple Dev Podcasts' })
  });

  registerLazyComponent('xcode-shortcuts', 
    () => import('../LeftBrain/XcodeShortcuts/XcodeShortcuts'), {
    label: 'Xcode Shortcuts',
    icon: '⌨️',
    category: 'leftbrain',
    description: 'Useful Xcode keyboard shortcuts',
    errorFallback: makeAlertFallback({ title: 'Failed to load Xcode Shortcuts' })
  });

  registerLazyComponent('apple-dev-youtube', 
    () => import('../LeftBrain/AppleDevYouTubeChannels/AppleDevYouTubeChannels'), {
    label: 'Apple Dev YouTube',
    icon: '📺',
    category: 'leftbrain',
    description: 'Apple Development YouTube channels',
    errorFallback: makeAlertFallback({ title: 'Failed to load Apple Dev YouTube' })
  });

  registerLazyComponent('apple-development', 
    () => import('../LeftBrain/AppleDevelopment/AppleDevelopment'), {
    label: 'Apple Development',
    icon: '🍎',
    category: 'leftbrain',
    description: 'Apple platform development resources',
    errorFallback: makeAlertFallback({ title: 'Failed to load Apple Development' })
  });

  registerLazyComponent('apple-languages', 
    () => import('../LeftBrain/AppleLanguages/AppleLanguages'), {
    label: 'Apple Languages',
    icon: '🍎',
    category: 'leftbrain',
    description: 'Programming languages for Apple platforms',
    errorFallback: makeAlertFallback({ title: 'Failed to load Apple Languages' })
  });

  registerLazyComponent('swift-gui', 
    () => import('../LeftBrain/SwiftGUI/SwiftGUI'), {
    label: 'Swift GUI',
    icon: '🖥️',
    category: 'leftbrain',
    description: 'SwiftUI and UIKit development',
    errorFallback: makeAlertFallback({ title: 'Failed to load Swift GUI' })
  });

  registerLazyComponent('swift-storage', 
    () => import('../LeftBrain/SwiftStorage/SwiftStorage'), {
    label: 'Swift Storage',
    icon: '💾',
    category: 'leftbrain',
    description: 'Data persistence in Swift',
    errorFallback: makeAlertFallback({ title: 'Failed to load Swift Storage' })
  });

  registerLazyComponent('swift-networking', 
    () => import('../LeftBrain/SwiftNetworking/SwiftNetworking'), {
    label: 'Swift Networking',
    icon: '🌐',
    category: 'leftbrain',
    description: 'Network programming in Swift',
    errorFallback: makeAlertFallback({ title: 'Failed to load Swift Networking' })
  });

  registerLazyComponent('debugging', 
    () => import('../LeftBrain/Debugging/Debugging'), {
    label: 'Swift Debugging',
    icon: '🐛',
    category: 'leftbrain',
    description: 'Debugging techniques and tools',
    errorFallback: makeAlertFallback({ title: 'Failed to load Debugging' })
  });

  registerLazyComponent('swift-testing', 
    () => import('../LeftBrain/SwiftTesting/SwiftTesting'), {
    label: 'Swift Testing',
    icon: '🧪',
    category: 'leftbrain',
    description: 'Testing frameworks and practices',
    errorFallback: makeAlertFallback({ title: 'Failed to load Swift Testing' })
  });

  registerLazyComponent('package-deployment', 
    () => import('../LeftBrain/PackageDeployment/PackageDeployment'), {
    label: 'Package & Deployment',
    icon: '📦',
    category: 'leftbrain',
    description: 'Package management and deployment',
    errorFallback: makeAlertFallback({ title: 'Failed to load Package & Deployment' })
  });

  registerLazyComponent('mac-terminal-scripts', 
    () => import('../LeftBrain/MacTerminalScripts/MacTerminalScripts'), {
    label: 'Mac Terminal Scripts',
    icon: '💻',
    category: 'leftbrain',
    description: 'Useful terminal scripts for Mac',
    errorFallback: makeAlertFallback({ title: 'Failed to load Mac Terminal Scripts' })
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
    description: 'Node.js development',
    errorFallback: makeAlertFallback({ title: 'Failed to load NodeJS' })
  });

  registerLazyComponent('reactjs', 
    () => import('../LeftBrain/ReactJS/ReactJS'), {
    label: 'ReactJS',
    icon: '⚛️',
    category: 'leftbrain',
    description: 'React.js development',
    errorFallback: makeAlertFallback({ title: 'Failed to load ReactJS' })
  });

  registerLazyComponent('chrome-extensions', 
    () => import('../LeftBrain/ChromeExtensions/ChromeExtensions'), {
    label: 'Chrome Extensions',
    icon: '🧩',
    category: 'leftbrain',
    description: 'Chrome extension development',
    errorFallback: makeAlertFallback({ title: 'Failed to load Chrome Extensions' })
  });

  registerLazyComponent('blogs', 
    () => import('../LeftBrain/Blogs/Blog'), {
    label: 'Blogs',
    icon: '📝',
    category: 'leftbrain',
    description: 'Technical blog posts',
    errorFallback: makeAlertFallback({ title: 'Failed to load Blogs' })
  });

  // RightBrain Components - Creative Content
  registerLazyComponent('drawing', 
    () => import('../RightBrain/Drawing/Drawing'), {
    label: 'Drawing',
    icon: '✏️',
    category: 'rightbrain',
    description: 'Digital and traditional artwork',
    errorFallback: makeAlertFallback({ title: 'Failed to load Drawing' })
  });

  registerLazyComponent('literature', 
    () => import('../RightBrain/Litlerature/Literature'), {
    label: 'Literature',
    icon: '📖',
    category: 'rightbrain',
    description: 'Books and literary works',
    errorFallback: makeAlertFallback({ title: 'Failed to load Literature' })
  });

  registerLazyComponent('philosophy', 
    () => import('../RightBrain/Philosophy/Philosophy'), {
    label: 'Philosophy',
    icon: '🤔',
    category: 'rightbrain',
    description: 'Philosophical thoughts and concepts',
    errorFallback: makeAlertFallback({ title: 'Failed to load Philosophy' })
  });

  registerLazyComponent('psychology', 
    () => import('../RightBrain/Psychology/Psychology'), {
    label: 'Psychology',
    icon: '🧠',
    category: 'rightbrain',
    description: 'Psychology concepts and studies',
    errorFallback: makeAlertFallback({ title: 'Failed to load Psychology' })
  });

  registerLazyComponent('music', 
    () => import('../RightBrain/Music/Music'), {
    label: 'Music',
    icon: '🎵',
    category: 'rightbrain',
    description: 'Music and audio content',
    errorFallback: makeAlertFallback({ title: 'Failed to load Music' })
  });

  // Developer Tools
  registerLazyComponent('ai-tools-channels', 
    () => import('../Tools/AIToolsChannels/AIToolsChannels'), {
    label: 'AI Tools Channels',
    icon: '🤖',
    category: 'developer-tools',
    description: 'AI development tools and channels',
    errorFallback: makeAlertFallback({ title: 'Failed to load AI Tools Channels' })
  });

  registerLazyComponent('api-tool', 
    () => import('../Tools/APITool/APITool'), {
    label: 'API Tool',
    icon: '🌐',
    category: 'developer-tools',
    description: 'API testing and development',
    errorFallback: makeAlertFallback({ title: 'Failed to load API Tool' })
  });

  registerLazyComponent('storage-tool', 
    () => import('../Tools/StorageTool/StorageTool'), {
    label: 'Storage Tool',
    icon: '💾',
    category: 'developer-tools',
    description: 'Browser storage management',
    errorFallback: makeAlertFallback({ title: 'Failed to load Storage Tool' })
  });

  registerLazyComponent('qr-code-tool', 
    () => import('../Tools/QRCodeTool/QRCodeTool'), {
    label: 'QR Code Tool',
    icon: '🔲',
    category: 'developer-tools',
    description: 'QR code generation and scanning',
    errorFallback: makeAlertFallback({ title: 'Failed to load QR Code Tool' })
  });

  registerLazyComponent('pdf-tool', 
    () => import('../Tools/PDFTool/PDFTool'), {
    label: 'PDF Tool',
    icon: '📄',
    category: 'developer-tools',
    description: 'PDF manipulation tools',
    errorFallback: makeAlertFallback({ title: 'Failed to load PDF Tool' })
  });

  registerLazyComponent('JSON-Tool', 
    () => import('../Tools/JSONTool/JsonTool'), {
    label: 'JSON Tool',
    icon: '📝',
    category: 'developer-tools',
    description: 'JSON formatting and validation',
    errorFallback: makeAlertFallback({ title: 'Failed to load JSON Tool' })
  });

  registerLazyComponent('XML-Tool', 
    () => import('../Tools/XMLTool/XmlTool'), {
    label: 'XML Tool',
    icon: '🔧',
    category: 'developer-tools',
    description: 'XML formatting and validation',
    errorFallback: makeAlertFallback({ title: 'Failed to load XML Tool' })
  });

  registerLazyComponent('yaml-tool', 
    () => import('../Tools/YAMLTool/YAMLTool'), {
    label: 'YAML Tool',
    icon: '📄',
    category: 'developer-tools',
    description: 'YAML formatting and validation',
    errorFallback: makeAlertFallback({ title: 'Failed to load YAML Tool' })
  });

  registerLazyComponent('csv-tool', 
    () => import('../Tools/CSVTool/CSVTool'), {
    label: 'CSV Tool',
    icon: '📊',
    category: 'developer-tools',
    description: 'CSV data processing',
    errorFallback: makeAlertFallback({ title: 'Failed to load CSV Tool' })
  });

  registerLazyComponent('Encryption-Decryption-Tool', 
    () => import('../Tools/CryptoTool/CryptoTool'), {
    label: 'Crypto Tool',
    icon: '🔒',
    category: 'developer-tools',
    description: 'Encryption and decryption utilities',
    errorFallback: makeAlertFallback({ title: 'Failed to load Crypto Tool' })
  });

  registerLazyComponent('hash-tool', 
    () => import('../Tools/HashTool/HashTool'), {
    label: 'Hash Tool',
    icon: '🔑',
    category: 'developer-tools',
    description: 'Hash generation and verification',
    errorFallback: makeAlertFallback({ title: 'Failed to load Hash Tool' })
  });

  registerLazyComponent('encoder-tool', 
    () => import('../Tools/EncoderTool/EncoderTool'), {
    label: 'Encoder Tool',
    icon: '🔤',
    category: 'developer-tools',
    description: 'Text encoding and decoding',
    errorFallback: makeAlertFallback({ title: 'Failed to load Encoder Tool' })
  });

  // QA Tools

  registerLazyComponent('macos-app-catalog', 
    () => import('../Tools/MacOSAppCatalog/MacOSAppCatalog'), {
    label: 'macOS App Catalog',
    icon: '📱',
    category: 'qa-tools',
    description: 'macOS application catalog',
    errorFallback: makeAlertFallback({ title: 'Failed to load macOS App Catalog' })
  });

  registerLazyComponent('regex-tool', 
    () => import('../Tools/RegexTool/RegexTool'), {
    label: 'Regex Tool',
    icon: '🔍',
    category: 'qa-tools',
    description: 'Regular expression testing',
    errorFallback: makeAlertFallback({ title: 'Failed to load Regex Tool' })
  });

  registerLazyComponent('diff-checker', 
    () => import('../Tools/DiffChecker/DiffChecker'), {
    label: 'Diff Checker',
    icon: '🔄',
    category: 'qa-tools',
    description: 'Text and file difference checker',
    errorFallback: makeAlertFallback({ title: 'Failed to load Diff Checker' })
  });

  registerLazyComponent('password-tool', 
    () => import('../Tools/PasswordTool/PasswordTool'), {
    label: 'Password Tool',
    icon: '🛡️',
    category: 'qa-tools',
    description: 'Password generation and testing',
    errorFallback: makeAlertFallback({ title: 'Failed to load Password Tool' })
  });

  registerLazyComponent('uuid-tool', 
    () => import('../Tools/UUIDTool/UUIDTool'), {
    label: 'UUID Tool',
    icon: '🆔',
    category: 'qa-tools',
    description: 'UUID generation and validation',
    errorFallback: makeAlertFallback({ title: 'Failed to load UUID Tool' })
  });

  registerLazyComponent('markdown-renderer', 
    () => import('../Tools/MarkdownRenderer/MarkdownRenderer'), {
    label: 'Markdown Renderer',
    icon: '📄',
    category: 'qa-tools',
    description: 'Markdown preview and conversion',
    errorFallback: makeAlertFallback({ title: 'Failed to load Markdown Renderer' })
  });

  registerLazyComponent('latex-renderer', 
    () => import('../Tools/LaTeXRenderer/LaTeXRenderer'), {
    label: 'LaTeX Renderer',
    icon: '📝',
    category: 'qa-tools',
    description: 'LaTeX formula rendering',
    errorFallback: makeAlertFallback({ title: 'Failed to load LaTeX Renderer' })
  });

  registerLazyComponent('writing-board', 
    () => import('../Tools/WritingBoard/WritingBoardTool'), {
    label: 'Writing Board',
    icon: '✏️',
    category: 'qa-tools',
    description: 'Digital writing and note-taking',
    errorFallback: makeAlertFallback({ title: 'Failed to load Writing Board' })
  });

  registerLazyComponent('text-generator', 
    () => import('../Tools/TextUtilities/TextGenerator'), {
    label: 'Text Util',
    icon: '🎲',
    category: 'qa-tools',
    description: 'Text generation and utilities',
    errorFallback: makeAlertFallback({ title: 'Failed to load Text Utilities' })
  });

  // General Tools
  registerLazyComponent('info-tool', 
    () => import('../Tools/InfoTool/InfoTool'), {
    label: 'Info Tool',
    icon: '📊',
    category: 'general-tools',
    description: 'System and browser information',
    errorFallback: makeAlertFallback({ title: 'Failed to load Info Tool' })
  });

  registerLazyComponent('passport-photo-maker', 
    () => import('../Tools/PassportPhotoMaker/PassportPhotoMaker'), {
    label: 'Passport Photo Maker',
    icon: '📷',
    category: 'general-tools',
    description: 'Passport photo creation tool',
    errorFallback: makeAlertFallback({ title: 'Failed to load Passport Photo Maker' })
  });

  registerLazyComponent('color-picker', 
    () => import('../Tools/ColorPicker/ColorPickerTool'), {
    label: 'Color Picker',
    icon: '🎨',
    category: 'general-tools',
    description: 'Color selection and conversion',
    errorFallback: makeAlertFallback({ title: 'Failed to load Color Picker' })
  });

  registerLazyComponent('screen-recorder', 
    () => import('../Tools/ScreenRecorder/ScreenRecorderTool'), {
    label: 'Screen Recorder',
    icon: '🎥',
    category: 'general-tools',
    description: 'Screen recording functionality',
    errorFallback: makeAlertFallback({ title: 'Failed to load Screen Recorder' })
  });

  registerLazyComponent('important-websites', 
    () => import('../Tools/ImportantWebsites/ImportantWebsites'), {
    label: 'Important Websites',
    icon: '🌐',
    category: 'general-tools',
    description: 'Curated list of useful websites',
    errorFallback: makeAlertFallback({ title: 'Failed to load Important Websites' })
  });

  registerLazyComponent('emoji-picker', 
    () => import('../Tools/EmojiPicker/EmojiPicker'), {
    label: 'Emoji Picker',
    icon: '😀',
    category: 'general-tools',
    description: 'Emoji selection and copying',
    errorFallback: makeAlertFallback({ title: 'Failed to load Emoji Picker' })
  });

  registerLazyComponent('number-to-unicode', 
    () => import('../Tools/NumberToUnicode/NumberToUnicode'), {
    label: 'Number Base Converter',
    icon: '🔢',
    category: 'general-tools',
    description: 'Number base conversion utility',
    errorFallback: makeAlertFallback({ title: 'Failed to load Number Converter' })
  });

  registerLazyComponent('app-icon-generator', 
    () => import('../Tools/AppIconGenerator/AppIconGenerator'), {
    label: 'App Icon Generator',
    icon: '🍎',
    category: 'general-tools',
    description: 'Generate app icons for iOS, Android, and macOS',
    errorFallback: makeAlertFallback({ title: 'Failed to load App Icon Generator' })
  });

  registerLazyComponent('video-trimmer', 
    () => import('../Tools/VideoTrimmer/VideoTrimmer'), {
    label: 'Video Trimmer',
    icon: '✂️',
    category: 'general-tools',
    description: 'Trim video files by selecting start and end times',
    errorFallback: makeAlertFallback({ title: 'Failed to load Video Trimmer' })
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

  // Opportunistic preloading for faster first interactions
  const preload = () => {
    try {
      // Preload key categories during idle time
      const preloadCats = ['leftbrain', 'rightbrain', 'developer-tools', 'qa-tools', 'general-tools'];
      preloadCats.forEach((cat) => ComponentFactory.preloadByCategory(cat));
    } catch (e) {
      // noop
    }
  };
  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preload, { timeout: 2500 });
    } else {
      setTimeout(preload, 1500);
    }
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
