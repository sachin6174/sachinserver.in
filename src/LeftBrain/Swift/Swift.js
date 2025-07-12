import React from "react";
import "../shared-styles.css";
import "./Swift.css";

const Swift = () => {
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
            name: "Interoperability",
            description: "Seamless integration with Objective-C and C libraries in existing projects.",
            icon: "🔗",
            features: ["Objective-C Bridge", "C Interop", "Mixed Language Projects", "Legacy Code Support"]
        }
    ];

    const codeExamples = [
        {
            title: "Optionals and Safety",
            code: `// Optional binding
var name: String? = "John"

// Safe unwrapping with if-let
if let unwrappedName = name {
    print("Hello, \\(unwrappedName)!")
}

// Guard statements for early exit
func processUser(_ user: User?) {
    guard let user = user else {
        print("No user provided")
        return
    }
    
    guard user.isActive else {
        print("User is not active")
        return
    }
    
    // Process active user
    print("Processing user: \\(user.name)")
}

// Nil coalescing operator
let displayName = user?.name ?? "Anonymous"

// Optional chaining
let streetName = user?.address?.street?.name`
        },
        {
            title: "Protocols and Extensions",
            code: `// Protocol definition
protocol Drawable {
    func draw()
    var area: Double { get }
}

// Protocol extension with default implementation
extension Drawable {
    func describe() {
        print("This shape has area: \\(area)")
    }
}

// Conforming to protocol
struct Circle: Drawable {
    let radius: Double
    
    func draw() {
        print("Drawing a circle with radius \\(radius)")
    }
    
    var area: Double {
        return Double.pi * radius * radius
    }
}

// Extension on existing types
extension String {
    var isPalindrome: Bool {
        let cleaned = self.lowercased().replacingOccurrences(of: " ", with: "")
        return cleaned == String(cleaned.reversed())
    }
    
    func titleCase() -> String {
        return self.capitalized
    }
}

// Usage
let circle = Circle(radius: 5.0)
circle.draw()
circle.describe()

print("hello".titleCase()) // "Hello"
print("racecar".isPalindrome) // true`
        },
        {
            title: "Generics and Associated Types",
            code: `// Generic function
func swap<T>(_ a: inout T, _ b: inout T) {
    let temp = a
    a = b
    b = temp
}

// Generic type with constraints
struct Stack<Element> {
    private var items: [Element] = []
    
    mutating func push(_ item: Element) {
        items.append(item)
    }
    
    mutating func pop() -> Element? {
        return items.popLast()
    }
    
    var isEmpty: Bool {
        return items.isEmpty
    }
}

// Protocol with associated type
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}

// Generic where clauses
func findIndex<T: Equatable>(of valueToFind: T, in array: [T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}

// Advanced generics with multiple constraints
func sorted<T: Sequence>(_ sequence: T) -> [T.Element] 
    where T.Element: Comparable {
    return sequence.sorted()
}`
        },
        {
            title: "Concurrency with async/await",
            code: `// Async function
func fetchUserData(id: String) async throws -> User {
    let url = URL(string: "https://api.example.com/users/\\(id)")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}

// Async sequence
func processUsers() async {
    let userIDs = ["1", "2", "3", "4", "5"]
    
    // Process sequentially
    for id in userIDs {
        do {
            let user = try await fetchUserData(id: id)
            print("Processed user: \\(user.name)")
        } catch {
            print("Failed to fetch user \\(id): \\(error)")
        }
    }
}

// Concurrent processing with TaskGroup
func fetchAllUsers(ids: [String]) async throws -> [User] {
    return try await withThrowingTaskGroup(of: User.self) { group in
        for id in ids {
            group.addTask {
                try await fetchUserData(id: id)
            }
        }
        
        var users: [User] = []
        for try await user in group {
            users.append(user)
        }
        return users
    }
}

// Actor for thread-safe state management
actor UserCache {
    private var cache: [String: User] = [:]
    
    func getUser(id: String) -> User? {
        return cache[id]
    }
    
    func setUser(_ user: User, for id: String) {
        cache[id] = user
    }
    
    func clearCache() {
        cache.removeAll()
    }
}`
        }
    ];

    const swiftEvolution = [
        { version: "Swift 1.0", year: "2014", features: ["Initial release", "Basic syntax", "Objective-C interop"] },
        { version: "Swift 2.0", year: "2015", features: ["Error handling", "Protocol extensions", "Guard statements"] },
        { version: "Swift 3.0", year: "2016", features: ["API design guidelines", "Package Manager", "Linux support"] },
        { version: "Swift 4.0", year: "2017", features: ["String improvements", "Codable protocol", "Key paths"] },
        { version: "Swift 5.0", year: "2019", features: ["ABI stability", "Result type", "Raw strings"] },
        { version: "Swift 5.5", year: "2021", features: ["Async/await", "Actors", "Structured concurrency"] },
        { version: "Swift 5.9", year: "2023", features: ["Macros", "Parameter packs", "If/switch expressions"] }
    ];

    const bestPractices = [
        "Use optionals to handle absence of values safely",
        "Prefer value types (structs) over reference types when possible",
        "Use protocols and protocol extensions for code reusability",
        "Leverage Swift's type inference but be explicit when it improves clarity",
        "Use guard statements for early exit and cleaner code",
        "Implement proper error handling with do-catch blocks",
        "Use lazy properties for expensive computations",
        "Follow Swift naming conventions and API design guidelines"
    ];

    const skills = [
        { name: "Syntax & Language Features", level: 95 },
        { name: "iOS/macOS Development", level: 90 },
        { name: "Protocol-Oriented Programming", level: 88 },
        { name: "Memory Management", level: 85 },
        { name: "Concurrency & async/await", level: 82 },
        { name: "SwiftUI", level: 87 },
        { name: "Combine Framework", level: 80 },
        { name: "Testing with XCTest", level: 85 }
    ];

    return (
        <div className="leftbrain-container swift-theme">
            {/* Header Section */}
            <div className="hero-section">
                <h1 className="section-title">Swift Programming</h1>
                <p>Modern, safe, and expressive programming language for iOS, macOS, watchOS, and tvOS development</p>
                <div className="tech-stack">
                    <span className="theme-badge">Swift 5.9</span>
                    <span className="theme-badge">iOS 17</span>
                    <span className="theme-badge">Xcode 15</span>
                    <span className="theme-badge">SwiftUI</span>
                </div>
            </div>

            {/* Swift Features */}
            <div className="cards-container">
                {swiftFeatures.map((feature, index) => (
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

            {/* Code Examples */}
            <div className="section">
                <h2>Swift Code Examples</h2>
                {codeExamples.map((example, index) => (
                    <div key={index} className="code-block">
                        <h4>{example.title}</h4>
                        <pre><code>{example.code}</code></pre>
                    </div>
                ))}
            </div>

            {/* Language Comparison */}
            <div className="section">
                <h2>Swift vs Other Languages</h2>
                <div className="grid-2">
                    <div className="content-card">
                        <h4>Swift vs Objective-C</h4>
                        <ul>
                            <li>✅ Cleaner, more readable syntax</li>
                            <li>✅ Type safety and optional handling</li>
                            <li>✅ Better performance</li>
                            <li>✅ Modern language features</li>
                            <li>⚠️ Learning curve for existing ObjC developers</li>
                        </ul>
                    </div>
                    <div className="content-card">
                        <h4>Swift vs Kotlin</h4>
                        <ul>
                            <li>✅ Similar modern syntax approach</li>
                            <li>✅ Both prioritize safety and expressiveness</li>
                            <li>✅ Strong type systems</li>
                            <li>🔄 Swift for Apple, Kotlin for Android/JVM</li>
                            <li>🔄 Different concurrency models</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Swift Evolution Timeline */}
            <div className="section">
                <h2>Swift Evolution</h2>
                <div className="highlight-section">
                    {swiftEvolution.map((version, index) => (
                        <div key={index} className="interactive-card">
                            <h4>{version.version} ({version.year})</h4>
                            <ul>
                                {version.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>Swift Development Skills</h2>
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

            {/* Best Practices */}
            <div className="section">
                <h2>Swift Best Practices</h2>
                <ul className="feature-list">
                    {bestPractices.map((practice, index) => (
                        <li key={index}>{practice}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Swift;