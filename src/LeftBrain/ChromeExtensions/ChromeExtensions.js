import React, { useState } from "react";
import "../shared-styles.css";
import "./ChromeExtensions.css";

const ChromeExtensions = () => {
    const [activeTab, setActiveTab] = useState("basics");

    const sections = {
        basics: {
            title: "Extension Basics",
            icon: "🧩",
            color: "#4285F4"
        },
        apis: {
            title: "Chrome APIs",
            icon: "🔌",
            color: "#34A853"
        },
        ui: {
            title: "UI Components",
            icon: "🎨",
            color: "#FBBC04"
        },
        advanced: {
            title: "Advanced Features",
            icon: "⚡",
            color: "#EA4335"
        }
    };

    const extensionTypes = [
        {
            name: "Browser Action",
            description: "Extensions that add a button to Chrome's toolbar with popup functionality.",
            icon: "🔘",
            useCases: ["Password managers", "Note-taking tools", "Quick actions", "Settings panels"],
            example: `{
  "name": "My Browser Action",
  "version": "1.0",
  "manifest_version": 3,
  "description": "A simple browser action extension",
  "action": {
    "default_popup": "popup.html",
    "default_title": "Click me!",
    "default_icon": {
      "16": "images/icon16.png",
      "32": "images/icon32.png",
      "48": "images/icon48.png",
      "128": "images/icon128.png"
    }
  },
  "permissions": ["activeTab"]
}`
        },
        {
            name: "Content Scripts",
            description: "Scripts that run in the context of web pages to modify content or behavior.",
            icon: "📄",
            useCases: ["Ad blockers", "Text highlighters", "Form fillers", "Page analyzers"],
            example: `{
  "name": "Content Script Extension",
  "version": "1.0",
  "manifest_version": 3,
  "description": "Modifies web page content",
  "content_scripts": [{
    "matches": ["https://*.example.com/*"],
    "js": ["content.js"],
    "css": ["styles.css"],
    "run_at": "document_end"
  }],
  "permissions": ["activeTab"]
}`
        },
        {
            name: "Background Scripts",
            description: "Service workers that handle events and maintain state across browser sessions.",
            icon: "🔄",
            useCases: ["Event listeners", "Data synchronization", "Periodic tasks", "Cross-tab communication"],
            example: `{
  "name": "Background Extension",
  "version": "1.0",
  "manifest_version": 3,
  "description": "Background processing extension",
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["background", "storage"]
}`
        },
        {
            name: "Developer Tools",
            description: "Extensions that add panels and functionality to Chrome Developer Tools.",
            icon: "🛠️",
            useCases: ["Debugging tools", "Performance analyzers", "Framework-specific tools", "API inspectors"],
            example: `{
  "name": "DevTools Extension",
  "version": "1.0",
  "manifest_version": 3,
  "description": "Adds custom DevTools panel",
  "devtools_page": "devtools.html",
  "permissions": ["debugger"]
}`
        }
    ];

    const chromeApis = [
        {
            category: "Storage & Data",
            apis: [
                {
                    name: "chrome.storage",
                    description: "Store and retrieve data with sync across devices",
                    example: `// Save data
chrome.storage.sync.set({
  userPreferences: {
    theme: 'dark',
    autoSave: true,
    language: 'en'
  }
}, () => {
  console.log('Settings saved');
});

// Retrieve data
chrome.storage.sync.get(['userPreferences'], (result) => {
  console.log('Settings:', result.userPreferences);
});

// Listen for changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(\`\${key} changed from \${oldValue} to \${newValue}\`);
  }
});`
                },
                {
                    name: "chrome.cookies",
                    description: "Read and modify cookies for any domain",
                    example: `// Get all cookies for a domain
chrome.cookies.getAll({domain: "example.com"}, (cookies) => {
  cookies.forEach(cookie => {
    console.log(\`\${cookie.name}: \${cookie.value}\`);
  });
});

// Set a cookie
chrome.cookies.set({
  url: "https://example.com",
  name: "session_id",
  value: "abc123",
  expirationDate: (new Date().getTime() / 1000) + 3600
});`
                }
            ]
        },
        {
            category: "Tabs & Windows",
            apis: [
                {
                    name: "chrome.tabs",
                    description: "Interact with browser tabs - create, update, query, and listen to tab events",
                    example: `// Get current active tab
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  const activeTab = tabs[0];
  console.log('Current URL:', activeTab.url);
});

// Create new tab
chrome.tabs.create({
  url: 'https://example.com',
  active: true
});

// Update tab URL
chrome.tabs.update(tabId, {url: 'https://newurl.com'});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log(\`Tab \${tabId} finished loading: \${tab.url}\`);
  }
});`
                },
                {
                    name: "chrome.windows",
                    description: "Manage browser windows and their properties",
                    example: `// Get all windows
chrome.windows.getAll({populate: true}, (windows) => {
  windows.forEach(window => {
    console.log(\`Window \${window.id} has \${window.tabs.length} tabs\`);
  });
});

// Create new window
chrome.windows.create({
  url: ['https://example1.com', 'https://example2.com'],
  type: 'popup',
  width: 800,
  height: 600
});`
                }
            ]
        },
        {
            category: "Web Requests",
            apis: [
                {
                    name: "chrome.webRequest",
                    description: "Monitor and modify network requests",
                    example: `// Block requests to specific domains
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    return {cancel: true};
  },
  {urls: ["*://*.ads.com/*"]},
  ["blocking"]
);

// Modify request headers
chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    details.requestHeaders.push({
      name: 'Custom-Header',
      value: 'Extension-Modified'
    });
    return {requestHeaders: details.requestHeaders};
  },
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);`
                },
                {
                    name: "chrome.declarativeNetRequest",
                    description: "Modern API for blocking and modifying network requests",
                    example: `// manifest.json
{
  "declarative_net_request": {
    "rule_resources": [{
      "id": "ruleset_1",
      "enabled": true,
      "path": "rules.json"
    }]
  },
  "permissions": ["declarativeNetRequest"]
}

// rules.json
[
  {
    "id": 1,
    "priority": 1,
    "action": {"type": "block"},
    "condition": {
      "urlFilter": "*://ads.example.com/*",
      "resourceTypes": ["script", "image"]
    }
  }
]`
                }
            ]
        }
    ];

    const uiComponents = [
        {
            name: "Popup Interface",
            description: "Main interface that appears when users click the extension icon",
            icon: "📋",
            code: `<!-- popup.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      width: 350px;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
    }
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    .toggle-switch {
      position: relative;
      width: 50px;
      height: 24px;
      background: #ccc;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.3s;
    }
    .toggle-switch.active {
      background: #4285f4;
    }
    .slider {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      transition: transform 0.3s;
    }
    .toggle-switch.active .slider {
      transform: translateX(26px);
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>My Extension</h2>
  </div>
  
  <div class="setting">
    <label>Enable Feature</label>
    <div class="toggle-switch" id="featureToggle">
      <div class="slider"></div>
    </div>
  </div>
  
  <button id="actionBtn">Perform Action</button>
  
  <script src="popup.js"></script>
</body>
</html>`,
            js: `// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('featureToggle');
  const actionBtn = document.getElementById('actionBtn');
  
  // Load saved state
  chrome.storage.sync.get(['featureEnabled'], (result) => {
    if (result.featureEnabled) {
      toggle.classList.add('active');
    }
  });
  
  // Toggle handler
  toggle.addEventListener('click', () => {
    const isActive = toggle.classList.toggle('active');
    chrome.storage.sync.set({featureEnabled: isActive});
    
    // Send message to content script
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleFeature',
        enabled: isActive
      });
    });
  });
  
  // Action button handler
  actionBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'performAction'});
    });
  });
});`
        },
        {
            name: "Content Script UI",
            description: "Injected interface elements that appear on web pages",
            icon: "🖼️",
            code: `// content.js - Inject custom UI into web pages
class ExtensionUI {
  constructor() {
    this.createFloatingPanel();
    this.setupMessageListener();
  }
  
  createFloatingPanel() {
    // Create floating panel
    this.panel = document.createElement('div');
    this.panel.id = 'extension-panel';
    this.panel.style.cssText = \`
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1500;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
      display: none;
    \`;
    
    this.panel.innerHTML = \`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h3 style="margin: 0; font-size: 16px;">Extension Panel</h3>
        <button id="close-panel" style="background: none; border: none; font-size: 18px; cursor: pointer;">×</button>
      </div>
      <div id="panel-content">
        <p>Content will be loaded here...</p>
      </div>
      <button id="action-button" style="
        background: #4285f4;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
      ">Take Action</button>
    \`;
    
    document.body.appendChild(this.panel);
    this.setupPanelEvents();
  }
  
  setupPanelEvents() {
    document.getElementById('close-panel').addEventListener('click', () => {
      this.panel.style.display = 'none';
    });
    
    document.getElementById('action-button').addEventListener('click', () => {
      this.performPageAction();
    });
  }
  
  showPanel() {
    this.panel.style.display = 'block';
  }
  
  performPageAction() {
    // Example: Highlight all links on the page
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.style.background = 'yellow';
      link.style.padding = '2px';
    });
    
    document.getElementById('panel-content').innerHTML = 
      \`<p>Highlighted \${links.length} links on this page!</p>\`;
  }
  
  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'showPanel') {
        this.showPanel();
      } else if (request.action === 'performAction') {
        this.performPageAction();
      }
    });
  }
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ExtensionUI());
} else {
  new ExtensionUI();
}`
        },
        {
            name: "Options Page",
            description: "Dedicated settings page for complex configuration",
            icon: "⚙️",
            code: `<!-- options.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
    }
    .section {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    input, select, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .checkbox-group input {
      width: auto;
    }
    .save-btn {
      background: #4285f4;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    .status {
      margin-top: 10px;
      padding: 10px;
      border-radius: 4px;
      display: none;
    }
    .status.success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
  </style>
</head>
<body>
  <h1>Extension Settings</h1>
  
  <div class="section">
    <h2>General Settings</h2>
    <div class="form-group">
      <label for="theme">Theme</label>
      <select id="theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="auto">Auto</option>
      </select>
    </div>
    
    <div class="form-group checkbox-group">
      <input type="checkbox" id="notifications">
      <label for="notifications">Enable notifications</label>
    </div>
    
    <div class="form-group checkbox-group">
      <input type="checkbox" id="autoUpdate">
      <label for="autoUpdate">Auto-update data</label>
    </div>
  </div>
  
  <div class="section">
    <h2>Advanced Settings</h2>
    <div class="form-group">
      <label for="apiKey">API Key</label>
      <input type="password" id="apiKey" placeholder="Enter your API key">
    </div>
    
    <div class="form-group">
      <label for="customRules">Custom Rules (JSON)</label>
      <textarea id="customRules" rows="5" placeholder='{"rule1": "value1"}'></textarea>
    </div>
  </div>
  
  <button class="save-btn" id="saveBtn">Save Settings</button>
  <div class="status" id="status"></div>
  
  <script src="options.js"></script>
</body>
</html>`
        }
    ];

    const advancedFeatures = [
        {
            name: "Message Passing",
            description: "Communication between different parts of your extension",
            icon: "💬",
            example: `// Background script (service worker)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getData') {
    // Perform background task
    fetchDataFromAPI().then(data => {
      sendResponse({success: true, data: data});
    });
    return true; // Required for async response
  }
});

// Content script
chrome.runtime.sendMessage({
  action: 'getData',
  params: {userId: 123}
}, (response) => {
  if (response.success) {
    console.log('Data received:', response.data);
  }
});

// Popup to content script communication
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, {
    action: 'highlightText',
    text: 'search term'
  }, (response) => {
    console.log('Highlighting complete:', response);
  });
});`
        },
        {
            name: "Context Menus",
            description: "Add custom options to right-click context menus",
            icon: "📄",
            example: `// Background script - Create context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'saveImage',
    title: 'Save image to collection',
    contexts: ['image']
  });
  
  chrome.contextMenus.create({
    id: 'translateText',
    title: 'Translate "%s"',
    contexts: ['selection']
  });
  
  chrome.contextMenus.create({
    id: 'pageInfo',
    title: 'Get page info',
    contexts: ['page']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch(info.menuItemId) {
    case 'saveImage':
      saveImageToCollection(info.srcUrl);
      break;
    case 'translateText':
      translateSelectedText(info.selectionText, tab.id);
      break;
    case 'pageInfo':
      getPageInformation(tab);
      break;
  }
});

function translateSelectedText(text, tabId) {
  chrome.tabs.sendMessage(tabId, {
    action: 'showTranslation',
    originalText: text,
    translation: 'Translated: ' + text
  });
}`
        },
        {
            name: "Notifications",
            description: "Display system notifications to users",
            icon: "🔔",
            example: `// Background script - Create notifications
function showNotification(title, message, type = 'basic') {
  chrome.notifications.create({
    type: type,
    iconUrl: 'images/icon48.png',
    title: title,
    message: message,
    buttons: [
      {title: 'View Details'},
      {title: 'Dismiss'}
    ]
  }, (notificationId) => {
    console.log('Notification created:', notificationId);
  });
}

// Handle notification interactions
chrome.notifications.onClicked.addListener((notificationId) => {
  console.log('Notification clicked:', notificationId);
  chrome.tabs.create({url: 'https://example.com/details'});
});

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (buttonIndex === 0) {
    // View Details button
    chrome.tabs.create({url: 'https://example.com/details'});
  } else if (buttonIndex === 1) {
    // Dismiss button
    chrome.notifications.clear(notificationId);
  }
});

// Example usage
showNotification(
  'Task Complete',
  'Your data has been successfully processed!',
  'basic'
);`
        },
        {
            name: "Web Accessible Resources",
            description: "Make extension files accessible to web pages",
            icon: "🌐",
            example: `// manifest.json
{
  "web_accessible_resources": [{
    "resources": [
      "images/*",
      "inject.js",
      "styles.css"
    ],
    "matches": ["https://*.example.com/*"]
  }],
  "content_scripts": [{
    "matches": ["https://*.example.com/*"],
    "js": ["content.js"]
  }]
}

// content.js - Inject script into page context
function injectScript() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.js');
  script.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}

// inject.js - Runs in page context, can access page variables
(function() {
  // This script runs in the page context
  // It can access page variables and functions
  
  window.extensionAPI = {
    getData: function() {
      return window.pageData || {};
    },
    
    sendToExtension: function(data) {
      // Use custom events to communicate back to content script
      window.dispatchEvent(new CustomEvent('extensionMessage', {
        detail: data
      }));
    }
  };
  
  console.log('Extension API injected');
})();

// Back in content.js - Listen for messages from injected script
window.addEventListener('extensionMessage', (event) => {
  chrome.runtime.sendMessage({
    action: 'pageData',
    data: event.detail
  });
});`
        }
    ];

    const deploymentSteps = [
        {
            step: "Prepare for Store",
            tasks: [
                "Create high-quality icons (16x16, 32x32, 48x48, 128x128)",
                "Write compelling description and screenshots",
                "Set up privacy policy if handling user data",
                "Test thoroughly across different Chrome versions",
                "Optimize manifest.json and remove unnecessary permissions"
            ]
        },
        {
            step: "Chrome Web Store",
            tasks: [
                "Create developer account ($5 registration fee)",
                "Upload extension package (.zip file)",
                "Fill out store listing details",
                "Submit for review (typically 1-3 days)",
                "Respond to any review feedback"
            ]
        },
        {
            step: "Updates & Maintenance",
            tasks: [
                "Monitor user reviews and feedback",
                "Track usage analytics",
                "Update for new Chrome features/APIs",
                "Fix bugs and security issues promptly",
                "Communicate changes in update notes"
            ]
        }
    ];

    const bestPractices = {
        basics: [
            "Use manifest v3 for new extensions",
            "Request minimal permissions needed",
            "Provide clear value proposition",
            "Follow Material Design guidelines",
            "Test on different screen sizes"
        ],
        apis: [
            "Use declarativeNetRequest over webRequest when possible",
            "Implement proper error handling",
            "Cache API responses when appropriate",
            "Use async/await for cleaner code",
            "Respect rate limits and quotas"
        ],
        ui: [
            "Keep popup interfaces simple and focused",
            "Provide visual feedback for all actions",
            "Use consistent styling and branding",
            "Make interfaces accessible (ARIA labels)",
            "Handle dark mode preferences"
        ],
        advanced: [
            "Minimize content script injection impact",
            "Use service workers efficiently",
            "Implement proper CSP policies",
            "Handle edge cases gracefully",
            "Plan for cross-browser compatibility"
        ]
    };

    const skills = [
        { name: "Manifest Configuration", level: 92 },
        { name: "Chrome APIs", level: 88 },
        { name: "Content Scripts", level: 90 },
        { name: "Background Scripts", level: 85 },
        { name: "UI/UX Design", level: 87 },
        { name: "Message Passing", level: 83 },
        { name: "Store Publishing", level: 80 },
        { name: "Extension Security", level: 85 }
    ];

    const renderBasics = () => (
        <div className="tab-content">
            <div className="cards-container">
                {extensionTypes.map((type, index) => (
                    <div key={index} className="theme-card">
                        <div className="tech-icon">{type.icon}</div>
                        <h3>{type.name}</h3>
                        <p>{type.description}</p>
                        <div className="section-content">
                            <h5>Common Use Cases:</h5>
                            <ul className="use-case-list">
                                {type.useCases.map((useCase, idx) => (
                                    <li key={idx}>{useCase}</li>
                                ))}
                            </ul>
                            <div className="code-block">
                                <h5>manifest.json Example:</h5>
                                <pre><code>{type.example}</code></pre>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderApis = () => (
        <div className="tab-content">
            {chromeApis.map((category, index) => (
                <div key={index} className="api-category">
                    <h3>{category.category}</h3>
                    <div className="api-list">
                        {category.apis.map((api, idx) => (
                            <div key={idx} className="api-card">
                                <h4>{api.name}</h4>
                                <p>{api.description}</p>
                                <div className="code-block">
                                    <h5>Example Usage:</h5>
                                    <pre><code>{api.example}</code></pre>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderUI = () => (
        <div className="tab-content">
            <div className="cards-container">
                {uiComponents.map((component, index) => (
                    <div key={index} className="theme-card">
                        <div className="tech-icon">{component.icon}</div>
                        <h3>{component.name}</h3>
                        <p>{component.description}</p>
                        <div className="code-block">
                            <h5>HTML Structure:</h5>
                            <pre><code>{component.code}</code></pre>
                        </div>
                        {component.js && (
                            <div className="code-block">
                                <h5>JavaScript:</h5>
                                <pre><code>{component.js}</code></pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAdvanced = () => (
        <div className="tab-content">
            <div className="cards-container">
                {advancedFeatures.map((feature, index) => (
                    <div key={index} className="theme-card">
                        <div className="tech-icon">{feature.icon}</div>
                        <h3>{feature.name}</h3>
                        <p>{feature.description}</p>
                        <div className="code-block">
                            <h5>Implementation:</h5>
                            <pre><code>{feature.example}</code></pre>
                        </div>
                    </div>
                ))}
            </div>

            <div className="section">
                <h2>Publishing & Deployment</h2>
                <div className="deployment-timeline">
                    {deploymentSteps.map((phase, index) => (
                        <div key={index} className="deployment-phase">
                            <h4>{phase.step}</h4>
                            <ul className="task-list">
                                {phase.tasks.map((task, idx) => (
                                    <li key={idx}>{task}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch(activeTab) {
            case "basics": return renderBasics();
            case "apis": return renderApis();
            case "ui": return renderUI();
            case "advanced": return renderAdvanced();
            default: return renderBasics();
        }
    };

    return (
        <div className="leftbrain-container chrome-extensions-theme">
            {/* Header Section */}
            <div className="simple-header">
                <h1>Chrome Extension Development</h1>
                <p>Build powerful browser extensions with modern APIs and best practices</p>
            </div>

            {/* Section Tabs */}
            <div className="section-tabs">
                {Object.entries(sections).map(([key, section]) => (
                    <button 
                        key={key}
                        className={`section-tab ${activeTab === key ? "active" : ""}`}
                        onClick={() => setActiveTab(key)}
                    >
                        <span className="tab-icon">{section.icon}</span>
                        {section.title}
                    </button>
                ))}
            </div>

            {/* Content */}
            {renderContent()}

            {/* Best Practices */}
            <div className="section">
                <h2>Best Practices - {sections[activeTab].title}</h2>
                <ul className="feature-list">
                    {bestPractices[activeTab].map((practice, index) => (
                        <li key={index}>{practice}</li>
                    ))}
                </ul>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>Chrome Extension Development Skills</h2>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: 'linear-gradient(90deg, var(--current-theme), var(--current-theme-dark))',
                                        height: '100%',
                                        borderRadius: 'inherit'
                                    }}
                                ></div>
                            </div>
                            <span>{skill.level}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChromeExtensions;
