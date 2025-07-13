import React from "react";
import "../shared-styles.css";
import "./Debugging.css";

const Debugging = () => {
    const debuggingTools = [
        {
            name: "Xcode Debugger",
            description: "Comprehensive debugging environment with breakpoints, variable inspection, and memory debugging.",
            icon: "🔧",
            features: ["LLDB Integration", "Visual Debugging", "Memory Graph", "Instruments"]
        },
        {
            name: "Console Logging",
            description: "Strategic logging techniques for tracking application flow and identifying issues.",
            icon: "📝",
            features: ["NSLog/print", "OSLog Framework", "Log Levels", "Conditional Logging"]
        },
        {
            name: "Static Analysis",
            description: "Automated code analysis to catch potential issues before runtime.",
            icon: "🔍",
            features: ["Compiler Warnings", "Static Analyzer", "SwiftLint", "Code Review"]
        },
        {
            name: "Runtime Debugging",
            description: "Dynamic debugging techniques for analyzing live application behavior.",
            icon: "⚡",
            features: ["Method Swizzling", "Exception Handling", "Crash Reports", "Performance Profiling"]
        }
    ];

    const debuggingScenarios = [
        {
            title: "Memory Leaks & Retain Cycles",
            type: "critical",
            description: "Identifying and resolving memory management issues",
            code: `// PROBLEM: Retain cycle between parent and child
class Parent {
    var children: [Child] = []
    
    func addChild(_ child: Child) {
        child.parent = self  // Strong reference
        children.append(child)
    }
}

class Child {
    var parent: Parent?  // Should be weak!
}

// SOLUTION: Use weak references
class Child {
    weak var parent: Parent?  // Weak reference breaks cycle
}

// Debug with Instruments:
// 1. Product → Profile → Leaks
// 2. Look for red leak indicators
// 3. Examine reference graphs
// 4. Fix strong reference cycles

// Debug with Memory Graph:
// 1. Debug → Debug Workflow → View Memory Graph Hierarchy
// 2. Look for purple warnings
// 3. Inspect object relationships`
        },
        {
            title: "Crash Debugging",
            type: "critical", 
            description: "Analyzing and fixing application crashes",
            code: `// COMMON CRASH: Force unwrapping nil optional
var user: User? = nil
print(user!.name)  // CRASH: Fatal error: Unexpectedly found nil

// SOLUTION: Safe unwrapping
if let user = user {
    print(user.name)
} else {
    print("No user available")
}

// Debug crashes with lldb:
(lldb) bt                    // Print backtrace
(lldb) frame variable        // Show local variables
(lldb) po object            // Print object description
(lldb) expr variable = value // Modify variables at runtime

// Symbolic breakpoint for exceptions:
// Breakpoint Navigator → + → Exception Breakpoint
// Catches all exceptions and shows exact location

// Reading crash logs:
// 1. Look at Exception Type and Exception Codes
// 2. Find Thread 0 (main thread) in backtrace
// 3. Identify your app's functions in stack trace
// 4. Check for memory access violations`
        },
        {
            title: "Network Debugging",
            type: "normal",
            description: "Debugging API calls and network issues",
            code: `// Network debugging with detailed logging
class NetworkDebugger {
    static func logRequest(_ request: URLRequest) {
        print("🌐 REQUEST: \\(request.httpMethod ?? "") \\(request.url?.absoluteString ?? "")")
        
        if let headers = request.allHTTPHeaderFields {
            print("📋 Headers: \\(headers)")
        }
        
        if let body = request.httpBody,
           let bodyString = String(data: body, encoding: .utf8) {
            print("📦 Body: \\(bodyString)")
        }
    }
    
    static func logResponse(_ response: URLResponse?, data: Data?, error: Error?) {
        if let error = error {
            print("❌ ERROR: \\(error.localizedDescription)")
            return
        }
        
        if let httpResponse = response as? HTTPURLResponse {
            print("✅ RESPONSE: \\(httpResponse.statusCode)")
            print("📋 Headers: \\(httpResponse.allHeaderFields)")
        }
        
        if let data = data,
           let responseString = String(data: data, encoding: .utf8) {
            print("📦 Response Data: \\(responseString)")
        }
    }
}

// Usage in URLSession
let task = URLSession.shared.dataTask(with: request) { data, response, error in
    NetworkDebugger.logResponse(response, data: data, error: error)
}

// Charles Proxy for network inspection:
// 1. Install Charles Proxy
// 2. Configure device proxy settings
// 3. Install SSL certificate for HTTPS
// 4. Monitor all network traffic`
        },
        {
            title: "UI Debugging",
            type: "normal",
            description: "Debugging user interface layout and rendering issues",
            code: `// View debugging techniques
extension UIView {
    func debugBorders() {
        #if DEBUG
        layer.borderWidth = 1.0
        layer.borderColor = UIColor.red.cgColor
        
        // Recursively add borders to subviews
        subviews.forEach { $0.debugBorders() }
        #endif
    }
    
    func printViewHierarchy(_ level: Int = 0) {
        let indent = String(repeating: "  ", count: level)
        print("\\(indent)\\(type(of: self)): frame=\\(frame)")
        
        subviews.forEach { 
            $0.printViewHierarchy(level + 1) 
        }
    }
}

// Auto Layout debugging
func debugConstraints(for view: UIView) {
    print("📐 Constraints for \\(type(of: view)):")
    view.constraints.forEach { constraint in
        print("   \\(constraint)")
    }
    
    // Check for constraint conflicts
    view.hasAmbiguousLayout ? print("⚠️ Ambiguous layout!") : print("✅ Layout OK")
}

// Visual debugging in Xcode:
// 1. Debug → View Debugging → Capture View Hierarchy
// 2. Rotate 3D view to inspect layers
// 3. Check Auto Layout constraints
// 4. Inspect view properties in inspector

// SwiftUI debugging
struct ContentView: View {
    var body: some View {
        VStack {
            Text("Hello")
                .background(Color.red)  // Visual debugging
                .border(Color.blue)     // Border for layout
        }
        .onAppear {
            print("ContentView appeared")  // Lifecycle debugging
        }
    }
}`
        }
    ];

    const platformTools = [
        {
            platform: "iOS/macOS",
            icon: "📱",
            tools: [
                "Xcode Debugger & LLDB",
                "Instruments (Time Profiler, Allocations)",
                "Console.app for device logs",
                "Simulator debug options",
                "Device Condition Simulator"
            ]
        },
        {
            platform: "Web/JavaScript", 
            icon: "🌐",
            tools: [
                "Chrome DevTools",
                "Safari Web Inspector",
                "Console logging & breakpoints",
                "Network tab monitoring",
                "Performance profiling"
            ]
        },
        {
            platform: "Backend/Server",
            icon: "🖥️", 
            tools: [
                "Server logs analysis",
                "Database query debugging",
                "API endpoint testing",
                "Load testing tools",
                "Error tracking (Sentry, Rollbar)"
            ]
        }
    ];

    const debuggingProcess = [
        {
            step: "Reproduce the Issue",
            description: "Create consistent steps to reproduce the problem",
            completed: true
        },
        {
            step: "Gather Information",
            description: "Collect logs, crash reports, and user feedback",
            completed: true
        },
        {
            step: "Form Hypothesis",
            description: "Develop theories about potential causes",
            completed: true
        },
        {
            step: "Test & Isolate",
            description: "Use debugging tools to test hypotheses",
            completed: false
        },
        {
            step: "Fix & Verify",
            description: "Implement solution and verify it resolves the issue",
            completed: false
        },
        {
            step: "Prevent Recurrence",
            description: "Add tests, logging, or safeguards to prevent similar issues",
            completed: false
        }
    ];

    const commonErrors = [
        "Memory Leaks",
        "Force Unwrapping",
        "Race Conditions", 
        "Deadlocks",
        "Network Timeouts",
        "UI Threading",
        "Retain Cycles",
        "Index Out of Bounds"
    ];

    const debugTools = [
        { name: "Breakpoints", icon: "🔴", description: "Pause execution at specific lines" },
        { name: "Watch Variables", icon: "👁️", description: "Monitor variable values" },
        { name: "Call Stack", icon: "📚", description: "View function call hierarchy" },
        { name: "Memory Graph", icon: "🧠", description: "Visualize object relationships" },
        { name: "Instruments", icon: "📊", description: "Performance and memory profiling" },
        { name: "Console Logs", icon: "📝", description: "Runtime logging and output" },
        { name: "Static Analyzer", icon: "🔍", description: "Compile-time issue detection" },
        { name: "Exception Breakpoints", icon: "⚠️", description: "Catch runtime exceptions" }
    ];

    const skills = [
        { name: "LLDB Debugging", level: 90 },
        { name: "Memory Debugging", level: 85 },
        { name: "Performance Profiling", level: 88 },
        { name: "Crash Analysis", level: 92 },
        { name: "Network Debugging", level: 80 },
        { name: "UI Debugging", level: 85 },
        { name: "Static Analysis", level: 82 },
        { name: "Test-Driven Debugging", level: 87 }
    ];

    const bestPractices = [
        "Add comprehensive logging throughout your application",
        "Use meaningful variable names and comments for clarity",
        "Write unit tests to catch issues early in development",
        "Enable all compiler warnings and treat them as errors",
        "Use static analysis tools to identify potential issues",
        "Implement proper error handling and user feedback",
        "Keep debugging tools and techniques in your daily workflow",
        "Document complex debugging sessions for future reference"
    ];

    return (
        <div className="leftbrain-container debugging-section">
            {/* Header Section */}
            <div className="simple-header">
                <h1>Debugging Mastery</h1>
                <p>Essential debugging techniques, tools, and methodologies for efficient problem-solving in software development</p>
            </div>

            {/* Common Error Types */}
            <div className="section">
                <h2>Common Error Types</h2>
                <div className="tech-stack">
                    {commonErrors.map((error, index) => (
                        <span key={index} className="error-type">{error}</span>
                    ))}
                </div>
            </div>

            {/* Debugging Tools */}
            <div className="cards-container">
                {debuggingTools.map((tool, index) => (
                    <div key={index} className="leftbrain-card debugging-tool-card">
                        <div className="tech-icon">{tool.icon}</div>
                        <h3>{tool.name}</h3>
                        <p>{tool.description}</p>
                        <div className="tech-stack">
                            {tool.features.map((feature, idx) => (
                                <span key={idx} className="tech-tag">{feature}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Debug Tools Grid */}
            <div className="section">
                <h2>Essential Debug Tools</h2>
                <div className="debug-tools-grid">
                    {debugTools.map((tool, index) => (
                        <div key={index} className="debug-tool-item">
                            <span className="debug-tool-icon">{tool.icon}</span>
                            <h4>{tool.name}</h4>
                            <p>{tool.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Debugging Process */}
            <div className="section">
                <h2>Systematic Debugging Process</h2>
                <div className="debug-timeline">
                    {debuggingProcess.map((step, index) => (
                        <div key={index} className={`debug-step ${step.completed ? 'completed' : ''}`}>
                            <h4>Step {index + 1}: {step.step}</h4>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Debugging Scenarios */}
            <div className="section">
                <h2>Real-world Debugging Scenarios</h2>
                {debuggingScenarios.map((scenario, index) => (
                    <div key={index} className={`debugging-scenario ${scenario.type}`}>
                        <h4>{scenario.title}</h4>
                        <p>{scenario.description}</p>
                        <div className="debug-code-block">
                            <pre><code>{scenario.code}</code></pre>
                        </div>
                    </div>
                ))}
            </div>

            {/* Platform-Specific Tools */}
            <div className="section">
                <h2>Platform-Specific Debugging Tools</h2>
                <div className="platform-debugging">
                    {platformTools.map((platform, index) => (
                        <div key={index} className="platform-card">
                            <h4>{platform.icon} {platform.platform}</h4>
                            <ul>
                                {platform.tools.map((tool, idx) => (
                                    <li key={idx}>{tool}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>Debugging Skills Proficiency</h2>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: 'linear-gradient(90deg, #DC2626, #EF4444)',
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

            {/* Best Practices */}
            <div className="section">
                <h2>Debugging Best Practices</h2>
                <ul className="feature-list">
                    {bestPractices.map((practice, index) => (
                        <li key={index}>{practice}</li>
                    ))}
                </ul>
            </div>

            {/* Log Levels Example */}
            <div className="section">
                <h2>Logging Levels</h2>
                <div className="debug-code-block">
                    <h4>Strategic Logging Implementation</h4>
                    <pre><code>{`// Swift OSLog implementation
import os.log

extension OSLog {
    private static var subsystem = Bundle.main.bundleIdentifier!
    
    static let network = OSLog(subsystem: subsystem, category: "networking")
    static let ui = OSLog(subsystem: subsystem, category: "ui")
    static let data = OSLog(subsystem: subsystem, category: "data")
}

// Usage with different log levels
os_log(.error, log: .network, "Failed to fetch user data: %@", error.localizedDescription)
os_log(.info, log: .ui, "User tapped login button")
os_log(.debug, log: .data, "Processing %d items", items.count)

// Conditional logging for performance
#if DEBUG
os_log(.debug, log: .data, "Debug info: %@", debugInfo)
#endif`}</code></pre>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <span className="log-level error">ERROR</span>
                    <span className="log-level warning">WARNING</span>
                    <span className="log-level info">INFO</span>
                    <span className="log-level debug">DEBUG</span>
                </div>
            </div>
        </div>
    );
};

export default Debugging;