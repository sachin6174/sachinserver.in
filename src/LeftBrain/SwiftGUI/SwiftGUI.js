import React from "react";
import "../shared-styles.css";
import "./SwiftGUI.css";

const SwiftGUI = () => {
    const guiFrameworks = [
        {
            name: "SwiftUI",
            description: "Declarative UI framework for building modern, responsive interfaces across all Apple platforms.",
            icon: "🎨",
            features: ["Declarative Syntax", "Live Previews", "Cross-Platform", "State Management"]
        },
        {
            name: "UIKit",
            description: "Imperative UI framework with programmatic and Interface Builder approaches for iOS development.",
            icon: "📱",
            features: ["View Controllers", "Auto Layout", "Interface Builder", "Mature Ecosystem"]
        },
        {
            name: "AppKit",
            description: "Native macOS UI framework for building desktop applications with rich user interfaces.",
            icon: "🖥️",
            features: ["macOS Native", "Window Management", "Menu Systems", "Desktop Interactions"]
        },
        {
            name: "Core Animation",
            description: "High-performance animation framework for creating smooth, hardware-accelerated animations.",
            icon: "✨",
            features: ["Layer-Based", "Hardware Acceleration", "Implicit Animations", "Custom Timing"]
        }
    ];

    const uiComponents = [
        {
            name: "Navigation",
            icon: "🧭",
            swiftui: "NavigationView, NavigationStack",
            uikit: "UINavigationController, UINavigationBar",
            description: "Handle app navigation flow and hierarchy"
        },
        {
            name: "Lists & Tables",
            icon: "📋",
            swiftui: "List, ForEach, Section",
            uikit: "UITableView, UICollectionView",
            description: "Display scrollable data in organized formats"
        },
        {
            name: "Forms & Input",
            icon: "📝",
            swiftui: "Form, TextField, Picker",
            uikit: "UITextField, UITextView, UIPicker",
            description: "Collect and validate user input"
        },
        {
            name: "Media & Graphics",
            icon: "🖼️",
            swiftui: "Image, AsyncImage, Canvas",
            uikit: "UIImageView, AVPlayerViewController",
            description: "Display images, videos, and custom graphics"
        }
    ];

    const designPatterns = [
        {
            name: "MVC (Model-View-Controller)",
            description: "Separates data, presentation, and logic",
            use: "Traditional UIKit architecture"
        },
        {
            name: "MVVM (Model-View-ViewModel)",
            description: "Adds binding layer between View and Model",
            use: "SwiftUI with ObservableObject"
        },
        {
            name: "Coordinator Pattern",
            description: "Manages navigation flow and dependencies",
            use: "Complex navigation hierarchies"
        },
        {
            name: "Observer Pattern",
            description: "Reactive updates through notifications",
            use: "State changes and data binding"
        },
        {
            name: "Delegation Pattern",
            description: "Protocol-based communication between objects",
            use: "UIKit callbacks and customization"
        },
        {
            name: "Repository Pattern",
            description: "Abstracts data access layer",
            use: "Data management and testing"
        }
    ];

    const codeExamples = [
        {
            title: "SwiftUI - Modern Declarative UI",
            code: `import SwiftUI

struct ContentView: View {
    @State private var name = ""
    @State private var isPresented = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("Welcome to SwiftUI")
                    .font(.largeTitle)
                    .foregroundColor(.blue)
                
                TextField("Enter your name", text: $name)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding(.horizontal)
                
                Button("Show Greeting") {
                    isPresented = true
                }
                .buttonStyle(.borderedProminent)
                .disabled(name.isEmpty)
                
                Spacer()
            }
            .navigationTitle("SwiftUI Demo")
            .padding()
        }
        .sheet(isPresented: $isPresented) {
            GreetingView(name: name)
        }
    }
}

struct GreetingView: View {
    let name: String
    @Environment(\\.dismiss) private var dismiss
    
    var body: some View {
        VStack {
            Text("Hello, \\(name)!")
                .font(.title)
                .padding()
            
            Button("Dismiss") {
                dismiss()
            }
        }
    }
}

// MVVM with ObservableObject
class UserViewModel: ObservableObject {
    @Published var users: [User] = []
    @Published var isLoading = false
    
    func fetchUsers() async {
        isLoading = true
        defer { isLoading = false }
        
        do {
            let url = URL(string: "https://api.example.com/users")!
            let (data, _) = try await URLSession.shared.data(from: url)
            users = try JSONDecoder().decode([User].self, from: data)
        } catch {
            print("Error fetching users: \\(error)")
        }
    }
}`
        },
        {
            title: "UIKit - Programmatic UI Development",
            code: `import UIKit

class ViewController: UIViewController {
    private let stackView = UIStackView()
    private let titleLabel = UILabel()
    private let nameTextField = UITextField()
    private let submitButton = UIButton(type: .system)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        setupConstraints()
        setupActions()
    }
    
    private func setupUI() {
        view.backgroundColor = .systemBackground
        
        // Configure stack view
        stackView.axis = .vertical
        stackView.spacing = 20
        stackView.alignment = .fill
        stackView.translatesAutoresizingMaskIntoConstraints = false
        
        // Configure title label
        titleLabel.text = "UIKit Form"
        titleLabel.font = UIFont.preferredFont(forTextStyle: .largeTitle)
        titleLabel.textAlignment = .center
        
        // Configure text field
        nameTextField.placeholder = "Enter your name"
        nameTextField.borderStyle = .roundedRect
        nameTextField.delegate = self
        
        // Configure button
        submitButton.setTitle("Submit", for: .normal)
        submitButton.backgroundColor = .systemBlue
        submitButton.setTitleColor(.white, for: .normal)
        submitButton.layer.cornerRadius = 8
        submitButton.isEnabled = false
        
        // Add to stack view
        stackView.addArrangedSubview(titleLabel)
        stackView.addArrangedSubview(nameTextField)
        stackView.addArrangedSubview(submitButton)
        
        view.addSubview(stackView)
    }
    
    private func setupConstraints() {
        NSLayoutConstraint.activate([
            stackView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            stackView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            stackView.leadingAnchor.constraint(greaterThanOrEqualTo: view.leadingAnchor, constant: 20),
            stackView.trailingAnchor.constraint(lessThanOrEqualTo: view.trailingAnchor, constant: -20),
            
            submitButton.heightAnchor.constraint(equalToConstant: 44)
        ])
    }
    
    private func setupActions() {
        submitButton.addTarget(self, action: #selector(submitTapped), for: .touchUpInside)
        nameTextField.addTarget(self, action: #selector(textFieldChanged), for: .editingChanged)
    }
    
    @objc private func submitTapped() {
        guard let name = nameTextField.text, !name.isEmpty else { return }
        
        let alert = UIAlertController(title: "Hello", message: "Welcome, \\(name)!", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
    
    @objc private func textFieldChanged() {
        submitButton.isEnabled = !(nameTextField.text?.isEmpty ?? true)
    }
}

// MARK: - UITextFieldDelegate
extension ViewController: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        if submitButton.isEnabled {
            submitTapped()
        }
        return true
    }
}`
        },
        {
            title: "Core Animation - Custom Animations",
            code: `import UIKit

class AnimatedViewController: UIViewController {
    private let animatedView = UIView()
    private let pulseLayer = CAShapeLayer()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupAnimatedView()
        setupPulseAnimation()
    }
    
    private func setupAnimatedView() {
        animatedView.backgroundColor = .systemBlue
        animatedView.layer.cornerRadius = 50
        animatedView.frame = CGRect(x: 0, y: 0, width: 100, height: 100)
        animatedView.center = view.center
        view.addSubview(animatedView)
        
        // Add tap gesture
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(viewTapped))
        animatedView.addGestureRecognizer(tapGesture)
    }
    
    private func setupPulseAnimation() {
        pulseLayer.path = UIBezierPath(ovalIn: animatedView.bounds).cgPath
        pulseLayer.fillColor = UIColor.systemBlue.withAlphaComponent(0.3).cgColor
        pulseLayer.position = animatedView.center
        view.layer.insertSublayer(pulseLayer, below: animatedView.layer)
        
        startPulseAnimation()
    }
    
    private func startPulseAnimation() {
        let scaleAnimation = CABasicAnimation(keyPath: "transform.scale")
        scaleAnimation.fromValue = 1.0
        scaleAnimation.toValue = 2.0
        
        let opacityAnimation = CABasicAnimation(keyPath: "opacity")
        opacityAnimation.fromValue = 0.8
        opacityAnimation.toValue = 0.0
        
        let groupAnimation = CAAnimationGroup()
        groupAnimation.animations = [scaleAnimation, opacityAnimation]
        groupAnimation.duration = 2.0
        groupAnimation.repeatCount = .infinity
        groupAnimation.timingFunction = CAMediaTimingFunction(name: .easeOut)
        
        pulseLayer.add(groupAnimation, forKey: "pulse")
    }
    
    @objc private func viewTapped() {
        // Spring animation
        UIView.animate(withDuration: 0.6, 
                      delay: 0,
                      usingSpringWithDamping: 0.6,
                      initialSpringVelocity: 0.5,
                      options: [.curveEaseInOut]) {
            self.animatedView.transform = CGAffineTransform(scaleX: 1.2, y: 1.2)
        } completion: { _ in
            UIView.animate(withDuration: 0.3) {
                self.animatedView.transform = .identity
            }
        }
        
        // Color animation
        let colorAnimation = CABasicAnimation(keyPath: "backgroundColor")
        colorAnimation.fromValue = UIColor.systemBlue.cgColor
        colorAnimation.toValue = UIColor.systemPurple.cgColor
        colorAnimation.duration = 0.3
        colorAnimation.autoreverses = true
        animatedView.layer.add(colorAnimation, forKey: "colorChange")
    }
}

// Custom transition for view controllers
class SlideTransition: NSObject, UIViewControllerAnimatedTransitioning {
    func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
        return 0.3
    }
    
    func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {
        guard let toViewController = transitionContext.viewController(forKey: .to) else { return }
        
        let containerView = transitionContext.containerView
        toViewController.view.frame = containerView.bounds
        toViewController.view.transform = CGAffineTransform(translationX: containerView.bounds.width, y: 0)
        
        containerView.addSubview(toViewController.view)
        
        UIView.animate(withDuration: transitionDuration(using: transitionContext)) {
            toViewController.view.transform = .identity
        } completion: { finished in
            transitionContext.completeTransition(finished)
        }
    }
}`
        }
    ];

    const frameworkEvolution = [
        {
            version: "iOS 2.0 (2008)",
            features: ["UIKit introduction", "Interface Builder", "Core Animation", "Basic UI components"]
        },
        {
            version: "iOS 6.0 (2012)", 
            features: ["Auto Layout", "Collection Views", "State Restoration", "Appearance Proxy"]
        },
        {
            version: "iOS 9.0 (2015)",
            features: ["Stack Views", "3D Touch", "Search APIs", "Universal Links"]
        },
        {
            version: "iOS 13.0 (2019)",
            features: ["SwiftUI introduction", "Combine framework", "Dark Mode", "Context Menus"]
        },
        {
            version: "iOS 15.0 (2021)",
            features: ["AsyncImage", "Task modifiers", "Refreshable", "SwiftUI improvements"]
        },
        {
            version: "iOS 17.0 (2023)",
            features: ["Observation framework", "SwiftData", "Interactive widgets", "Animation improvements"]
        }
    ];

    const deviceTargets = [
        { name: "iPhone", icon: "📱", sizes: "Various screen sizes" },
        { name: "iPad", icon: "📟", sizes: "Multiple orientations" },
        { name: "Mac", icon: "💻", sizes: "Resizable windows" },
        { name: "Apple Watch", icon: "⌚", sizes: "Small screens" },
        { name: "Apple TV", icon: "📺", sizes: "Focus-based navigation" },
        { name: "CarPlay", icon: "🚗", sizes: "Automotive interface" }
    ];

    const animationTypes = [
        "Spring Animations", "Keyframe Animations", "Layer Animations", 
        "Property Animations", "Transition Animations", "Gesture Animations"
    ];

    const testingApproaches = [
        { name: "Unit Testing", icon: "🧪", description: "XCTest for logic testing" },
        { name: "UI Testing", icon: "🎯", description: "XCUITest for interface testing" },
        { name: "Snapshot Testing", icon: "📸", description: "Visual regression testing" },
        { name: "Performance Testing", icon: "⚡", description: "XCTMetric for performance" }
    ];

    const accessibilityFeatures = [
        "VoiceOver support with proper labels and hints",
        "Dynamic Type for scalable text sizing",
        "High Contrast mode compatibility",
        "Reduce Motion preferences handling",
        "Voice Control navigation support",
        "Switch Control accessibility",
        "Semantic content structure",
        "Color-independent design patterns"
    ];

    const performanceOptimizations = [
        "Lazy loading of expensive views and data",
        "Image caching and efficient memory management",
        "Background queue processing for heavy operations",
        "View recycling in lists and collections",
        "Efficient Auto Layout constraint management",
        "Core Data batch operations and fetch optimization",
        "Network request debouncing and caching",
        "GPU-optimized drawing and animation techniques"
    ];

    const bestPractices = [
        "Follow Apple's Human Interface Guidelines",
        "Implement proper accessibility features",
        "Use Auto Layout for responsive design",
        "Handle different device orientations gracefully",
        "Implement proper error handling and user feedback",
        "Optimize for performance and battery life",
        "Test on various devices and iOS versions",
        "Follow iOS design patterns and conventions"
    ];

    const skills = [
        { name: "SwiftUI", level: 88 },
        { name: "UIKit", level: 92 },
        { name: "Auto Layout", level: 90 },
        { name: "Core Animation", level: 85 },
        { name: "Interface Builder", level: 87 },
        { name: "Accessibility", level: 82 },
        { name: "Performance Optimization", level: 86 },
        { name: "UI Testing", level: 84 }
    ];

    return (
        <div className="leftbrain-container swift-gui-section">
            {/* Header Section */}
            <div className="hero-section">
                <h1 className="section-title">Swift GUI Development</h1>
                <p>Building beautiful, responsive user interfaces for Apple platforms using SwiftUI and UIKit</p>
                <div className="tech-stack">
                    <span className="gui-technology-badge">SwiftUI</span>
                    <span className="gui-technology-badge">UIKit</span>
                    <span className="gui-technology-badge">Core Animation</span>
                    <span className="gui-technology-badge">Auto Layout</span>
                </div>
            </div>

            {/* GUI Frameworks */}
            <div className="cards-container">
                {guiFrameworks.map((framework, index) => (
                    <div key={index} className="leftbrain-card gui-framework-card">
                        <div className="tech-icon">{framework.icon}</div>
                        <h3>{framework.name}</h3>
                        <p>{framework.description}</p>
                        <div className="tech-stack">
                            {framework.features.map((feature, idx) => (
                                <span key={idx} className="tech-tag">{feature}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* SwiftUI vs UIKit Comparison */}
            <div className="swiftui-vs-uikit">
                <h4>SwiftUI vs UIKit: Choosing the Right Framework</h4>
                <div className="layout-comparison">
                    <div className="layout-example">
                        <h4>✨ SwiftUI</h4>
                        <ul>
                            <li>✅ Declarative syntax</li>
                            <li>✅ Live previews</li>
                            <li>✅ Cross-platform</li>
                            <li>✅ State-driven UI</li>
                            <li>⚠️ iOS 13+ requirement</li>
                            <li>⚠️ Learning curve</li>
                        </ul>
                    </div>
                    <div className="layout-example">
                        <h4>📱 UIKit</h4>
                        <ul>
                            <li>✅ Mature and stable</li>
                            <li>✅ Fine-grained control</li>
                            <li>✅ Extensive documentation</li>
                            <li>✅ Backward compatibility</li>
                            <li>⚠️ Imperative approach</li>
                            <li>⚠️ More boilerplate code</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* UI Components Showcase */}
            <div className="section">
                <h2>Essential UI Components</h2>
                <div className="ui-component-showcase">
                    {uiComponents.map((component, index) => (
                        <div key={index} className="ui-component-card">
                            <h4>{component.icon} {component.name}</h4>
                            <p>{component.description}</p>
                            <div style={{ marginTop: '1rem' }}>
                                <div><strong>SwiftUI:</strong> {component.swiftui}</div>
                                <div><strong>UIKit:</strong> {component.uikit}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Code Examples */}
            <div className="section">
                <h2>GUI Implementation Examples</h2>
                {codeExamples.map((example, index) => (
                    <div key={index} className="swift-gui-code-block">
                        <h4>{example.title}</h4>
                        <pre><code>{example.code}</code></pre>
                    </div>
                ))}
            </div>

            {/* Design Patterns */}
            <div className="section">
                <h2>iOS Design Patterns</h2>
                <div className="design-patterns-grid">
                    {designPatterns.map((pattern, index) => (
                        <div key={index} className="design-pattern-card">
                            <h5>{pattern.name}</h5>
                            <p>{pattern.description}</p>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <strong>Use case:</strong> {pattern.use}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Animation Showcase */}
            <div className="animation-showcase">
                <h4>🎬 Core Animation & SwiftUI Animations</h4>
                <p>Create smooth, engaging user experiences with powerful animation frameworks</p>
                <div className="animation-types">
                    {animationTypes.map((type, index) => (
                        <div key={index} className="animation-type">
                            {type}
                        </div>
                    ))}
                </div>
            </div>

            {/* Device Targets */}
            <div className="section">
                <h2>Multi-Platform Development</h2>
                <div className="device-targets">
                    {deviceTargets.map((device, index) => (
                        <div key={index} className="device-card">
                            <span className="device-icon">{device.icon}</span>
                            <h4>{device.name}</h4>
                            <p>{device.sizes}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Framework Evolution */}
            <div className="section">
                <h2>iOS UI Framework Evolution</h2>
                <div className="framework-evolution">
                    {frameworkEvolution.map((milestone, index) => (
                        <div key={index} className="evolution-milestone">
                            <h4>{milestone.version}</h4>
                            <ul>
                                {milestone.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Accessibility Features */}
            <div className="accessibility-features">
                <h4>♿ Accessibility in iOS Development</h4>
                <p>Building inclusive apps that work for everyone:</p>
                <ul>
                    {accessibilityFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>

            {/* Performance Optimization */}
            <div className="performance-optimization">
                <h4>⚡ Performance Optimization Techniques</h4>
                <ul>
                    {performanceOptimizations.map((optimization, index) => (
                        <li key={index}>{optimization}</li>
                    ))}
                </ul>
            </div>

            {/* UI Testing */}
            <div className="section">
                <h2>UI Testing Strategies</h2>
                <div className="ui-testing-grid">
                    {testingApproaches.map((approach, index) => (
                        <div key={index} className="testing-approach-card">
                            <span className="testing-icon">{approach.icon}</span>
                            <h4>{approach.name}</h4>
                            <p>{approach.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Responsive Design Tips */}
            <div className="responsive-design-tips">
                <h4>📱 Responsive Design Best Practices</h4>
                <ul>
                    <li>Use Auto Layout constraints for flexible layouts</li>
                    <li>Implement size classes for different screen sizes</li>
                    <li>Test on various device orientations and screen sizes</li>
                    <li>Use SwiftUI's adaptive layouts and GeometryReader</li>
                    <li>Consider Safe Area and layout margins</li>
                    <li>Implement proper keyboard handling and scrolling</li>
                </ul>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>GUI Development Skills</h2>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: 'linear-gradient(90deg, #0066CC, #007AFF)',
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

            {/* Best Practices Checklist */}
            <div className="best-practices-checklist">
                <h4>✅ GUI Development Best Practices</h4>
                {bestPractices.map((practice, index) => (
                    <div key={index} className="checklist-item">
                        <span className="checklist-check">✓</span>
                        <span>{practice}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SwiftGUI;