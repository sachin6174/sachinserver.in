import React, { useState } from "react";
import "../shared-styles.css";
import "./AppleLanguages.css";

const AppleLanguages = () => {
    const [activeLanguage, setActiveLanguage] = useState("swift");

    const languageComparison = {
        swift: {
            name: "Swift",
            year: "2014",
            description: "Modern, safe, and expressive programming language for iOS, macOS, watchOS, and tvOS development",
            philosophy: "Protocol-oriented programming with safety and performance",
            icon: "🦉",
            color: "#FA7343"
        },
        objc: {
            name: "Objective-C", 
            year: "1984",
            description: "Dynamic, object-oriented language that powered iOS and macOS development for decades",
            philosophy: "Dynamic runtime with Smalltalk-style messaging",
            icon: "🔷",
            color: "#007AFF"
        }
    };

    const swiftFeatures = [
        {
            name: "Type Safety",
            description: "Swift is type-safe, meaning it helps you catch type mismatches early in development.",
            icon: "🛡️",
            features: ["Optional Types", "Type Inference", "Compile-time Checks", "Memory Safety"]
        },
        {
            name: "Modern Syntax",
            description: "Clean, expressive syntax that's easy to read and write, inspired by multiple languages.",
            icon: "✨",
            features: ["Closures", "Generics", "Protocol Extensions", "Pattern Matching"]
        },
        {
            name: "Performance",
            description: "High performance with LLVM compiler optimization and efficient memory management.",
            icon: "🚀",
            features: ["ARC Memory Management", "Value Types", "Copy-on-Write", "Compiler Optimizations"]
        },
        {
            name: "Concurrency",
            description: "Built-in async/await and actor model for safe concurrent programming.",
            icon: "⚡",
            features: ["async/await", "Actors", "Structured Concurrency", "Task Groups"]
        }
    ];

    const objcFeatures = [
        {
            name: "Dynamic Runtime",
            description: "Powerful runtime system that allows for method swizzling, dynamic class creation, and runtime introspection.",
            icon: "⚡",
            features: ["Method Swizzling", "Runtime Introspection", "Dynamic Dispatch", "Categories"]
        },
        {
            name: "Message Passing",
            description: "Unique messaging syntax that provides flexibility and enables dynamic behavior at runtime.",
            icon: "📨",
            features: ["Bracket Syntax", "Nil Messaging", "Selector Methods", "Target-Action Pattern"]
        },
        {
            name: "C Compatibility",
            description: "Full compatibility with C and C++ code, allowing integration with existing libraries and systems.",
            icon: "🔗",
            features: ["C Interoperability", "C++ Integration", "Pointer Arithmetic", "Low-level Access"]
        },
        {
            name: "Legacy Foundation",
            description: "Mature ecosystem with decades of frameworks and established patterns.",
            icon: "🏛️",
            features: ["Foundation Framework", "UIKit/AppKit", "Core Data", "Extensive Documentation"]
        }
    ];

    const syntaxComparison = [
        {
            concept: "Class Definition",
            swift: `class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    func displayInfo() {
        print("\\(name), age \\(age)")
    }
}`,
            objc: `// Person.h
@interface Person : NSObject
@property (nonatomic, strong) NSString *name;
@property (nonatomic, assign) NSInteger age;
- (instancetype)initWithName:(NSString *)name age:(NSInteger)age;
- (void)displayInfo;
@end

// Person.m
@implementation Person
- (instancetype)initWithName:(NSString *)name age:(NSInteger)age {
    self = [super init];
    if (self) {
        _name = name;
        _age = age;
    }
    return self;
}

- (void)displayInfo {
    NSLog(@"%@, age %ld", self.name, (long)self.age);
}
@end`
        },
        {
            concept: "Optionals/Nil Handling",
            swift: `var name: String? = "John"

// Safe unwrapping
if let unwrappedName = name {
    print("Hello, \\(unwrappedName)!")
}

// Nil coalescing
let displayName = name ?? "Anonymous"

// Optional chaining
let count = user?.profile?.name?.count`,
            objc: `NSString *name = @"John";  // Can be nil

// Check for nil
if (name != nil) {
    NSLog(@"Hello, %@!", name);
}

// Nil messaging (no crash)
[nil someMethod];  // Does nothing

// Manual nil checking
NSInteger count = user.profile.name ? user.profile.name.length : 0;`
        },
        {
            concept: "Memory Management",
            swift: `// Automatic with ARC
class ViewController: UIViewController {
    @IBOutlet weak var delegate: SomeDelegate?  // Weak reference
    var dataArray: [String] = []                // Strong reference
    
    // No manual memory management needed
}

// Value types (structs) - no reference counting
struct Point {
    var x: Double
    var y: Double
}`,
            objc: `// ARC handles retain/release automatically
@interface ViewController : UIViewController
@property (nonatomic, weak) id<SomeDelegate> delegate;    // Weak
@property (nonatomic, strong) NSMutableArray *dataArray; // Strong
@end

// Manual memory management (pre-ARC legacy)
NSString *str = [[NSString alloc] initWithString:@"Hello"];
[str retain];   // +1 reference count
[str release];  // -1 reference count`
        }
    ];

    const modernFeatures = [
        {
            title: "Swift Modern Features",
            features: [
                { name: "SwiftUI", description: "Declarative UI framework", year: "2019" },
                { name: "Async/Await", description: "Structured concurrency", year: "2021" },
                { name: "Actors", description: "Safe concurrent programming", year: "2021" },
                { name: "Macros", description: "Compile-time code generation", year: "2023" },
                { name: "Result Builders", description: "DSL creation", year: "2020" }
            ]
        },
        {
            title: "Objective-C Legacy Features",
            features: [
                { name: "Categories", description: "Extend existing classes", year: "1988" },
                { name: "Runtime API", description: "Dynamic introspection", year: "1988" },
                { name: "ARC", description: "Automatic memory management", year: "2011" },
                { name: "Blocks", description: "Closure-like functionality", year: "2010" },
                { name: "Modern Literals", description: "Simplified syntax", year: "2012" }
            ]
        }
    ];

    const migrationStrategies = [
        {
            title: "Incremental Migration",
            description: "Gradually migrate Objective-C code to Swift",
            steps: [
                "Start with new features in Swift",
                "Create Swift extensions for Objective-C classes",
                "Use bridging headers for interoperability",
                "Migrate utility functions first",
                "Convert models and data structures",
                "Update UI components last"
            ]
        },
        {
            title: "Interoperability Best Practices",
            description: "Working with both languages in the same project",
            steps: [
                "Use @objc attribute for Swift→Objective-C exposure",
                "Import Swift classes in Objective-C with ProductName-Swift.h",
                "Handle optionals properly across language boundaries",
                "Use NS_ASSUME_NONNULL_BEGIN/END in Objective-C",
                "Consider performance implications of bridging",
                "Maintain consistent naming conventions"
            ]
        }
    ];

    const skills = {
        swift: [
            { name: "Swift Syntax & Language Features", level: 95 },
            { name: "SwiftUI", level: 87 },
            { name: "Protocol-Oriented Programming", level: 88 },
            { name: "Concurrency & async/await", level: 82 },
            { name: "Combine Framework", level: 80 },
            { name: "Testing with XCTest", level: 85 }
        ],
        objc: [
            { name: "Objective-C Syntax", level: 85 },
            { name: "Memory Management", level: 90 },
            { name: "Runtime Programming", level: 80 },
            { name: "Foundation Framework", level: 88 },
            { name: "Legacy Code Maintenance", level: 92 },
            { name: "C/C++ Integration", level: 75 }
        ]
    };

    const currentFeatures = activeLanguage === "swift" ? swiftFeatures : objcFeatures;

    return (
        <div className="leftbrain-container apple-languages-theme">
            {/* Header Section */}
            <div className="simple-header">
                <h1>Apple Programming Languages</h1>
                <p>Master both Swift and Objective-C for comprehensive iOS/macOS development</p>
            </div>

            {/* Language Toggle */}
            <div className="language-toggle">
                <button 
                    className={`toggle-btn ${activeLanguage === "swift" ? "active" : ""}`}
                    onClick={() => setActiveLanguage("swift")}
                >
                    🦉 Swift
                </button>
                <button 
                    className={`toggle-btn ${activeLanguage === "objc" ? "active" : ""}`}
                    onClick={() => setActiveLanguage("objc")}
                >
                    🔷 Objective-C
                </button>
            </div>

            {/* Language Overview */}
            <div className="language-overview">
                <div className="overview-card">
                    <div className="language-header">
                        <span className="language-icon">{languageComparison[activeLanguage].icon}</span>
                        <div>
                            <h2>{languageComparison[activeLanguage].name}</h2>
                            <p className="language-year">Introduced: {languageComparison[activeLanguage].year}</p>
                        </div>
                    </div>
                    <p className="language-description">{languageComparison[activeLanguage].description}</p>
                    <p className="language-philosophy"><strong>Philosophy:</strong> {languageComparison[activeLanguage].philosophy}</p>
                </div>
            </div>

            {/* Language Features */}
            <div className="cards-container">
                {currentFeatures.map((feature, index) => (
                    <div key={index} className="theme-card">
                        <div className="tech-icon">{feature.icon}</div>
                        <h3>{feature.name}</h3>
                        <p>{feature.description}</p>
                        <div className="tech-stack">
                            {feature.features.map((item, idx) => (
                                <span key={idx} className="tech-tag">{item}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Syntax Comparison */}
            <div className="section">
                <h2>Swift vs Objective-C Syntax</h2>
                {syntaxComparison.map((comparison, index) => (
                    <div key={index} className="syntax-comparison-container">
                        <h4>{comparison.concept}</h4>
                        <div className="syntax-comparison">
                            <div className="syntax-block swift-syntax">
                                <h5>🦉 Swift</h5>
                                <pre><code>{comparison.swift}</code></pre>
                            </div>
                            <div className="syntax-block objc-syntax">
                                <h5>🔷 Objective-C</h5>
                                <pre><code>{comparison.objc}</code></pre>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modern vs Legacy Features */}
            <div className="section">
                <h2>Feature Evolution</h2>
                <div className="feature-evolution">
                    {modernFeatures.map((category, index) => (
                        <div key={index} className="evolution-card">
                            <h3>{category.title}</h3>
                            <div className="features-timeline">
                                {category.features.map((feature, idx) => (
                                    <div key={idx} className="feature-item">
                                        <div className="feature-year">{feature.year}</div>
                                        <div className="feature-details">
                                            <h4>{feature.name}</h4>
                                            <p>{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Migration Strategies */}
            <div className="section">
                <h2>Swift/Objective-C Interoperability</h2>
                <div className="migration-strategies">
                    {migrationStrategies.map((strategy, index) => (
                        <div key={index} className="strategy-card">
                            <h3>{strategy.title}</h3>
                            <p>{strategy.description}</p>
                            <ul className="strategy-steps">
                                {strategy.steps.map((step, idx) => (
                                    <li key={idx}>{step}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>{languageComparison[activeLanguage].name} Development Skills</h2>
                <div className="stats-grid">
                    {skills[activeLanguage].map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: `linear-gradient(90deg, ${languageComparison[activeLanguage].color}, ${languageComparison[activeLanguage].color}aa)`,
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

            {/* When to Use Which */}
            <div className="section">
                <h2>When to Use Each Language</h2>
                <div className="usage-comparison">
                    <div className="usage-card swift-usage">
                        <h3>🦉 Choose Swift For:</h3>
                        <ul>
                            <li>New iOS/macOS applications</li>
                            <li>Modern UI with SwiftUI</li>
                            <li>Type-safe, memory-safe code</li>
                            <li>Rapid prototyping and development</li>
                            <li>Cross-platform development (Swift on Server)</li>
                            <li>Teams new to Apple development</li>
                        </ul>
                    </div>
                    <div className="usage-card objc-usage">
                        <h3>🔷 Choose Objective-C For:</h3>
                        <ul>
                            <li>Maintaining legacy codebases</li>
                            <li>Heavy C/C++ library integration</li>
                            <li>Runtime manipulation requirements</li>
                            <li>Existing large Objective-C projects</li>
                            <li>Working with older iOS versions</li>
                            <li>Dynamic features and method swizzling</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppleLanguages;